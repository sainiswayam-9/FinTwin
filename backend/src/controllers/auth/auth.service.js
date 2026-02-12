
export class AuthService {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  _stripSensitiveFields(user) {
    if (!user) return null;
    const safeUser = { ...user };
    delete safeUser.passwordHash;
    return safeUser;
  }

  async login(identifier, password) {
    const userByEmail = await this.userRepo.findUserByEmail(identifier);
    const userByUsername = await this.userRepo.findUserByUsername(identifier);
    const user = userByEmail || userByUsername;
    if (!user) throw new Error("USER_NOT_FOUND");

    const valid = await this.userRepo.comparePassword(password, user.passwordHash);
    if (!valid) throw new Error("INVALID_CREDENTIALS");

    const accessToken = await this.userRepo.createAccessToken(user.id);
    const refreshToken = await this.userRepo.createRefeshToken(user.id);

    const token = {
      accessToken,
      refreshToken,
    };
    return { token, userId: user.id, user: this._stripSensitiveFields(user) };
  };

  async checkIfUserNameExists(username) {
    const user = await this.userRepo.findUsername(username);
    if (user) {
      throw new Error("USERNAME_EXISTS");
    }
    return false;
  };

  async register(data) {
    const exists = await this.userRepo.findUserByEmail(data.email);
    if (exists) throw new Error("EMAIL_EXISTS");
    const usernameExists = await this.userRepo.findUsername(data.username);
    if (usernameExists) throw new Error("USERNAME_EXISTS");
    const hashedPassword = await this.userRepo.hashedPassword(data.password);

    const newCreatedUser = await this.userRepo.createUser({
      username: data.username,
      email: data.email,
      passwordHash: hashedPassword,
      fullName: data.fullName,
      phone: data.phone ?? null,
    });
    const accessToken = await this.userRepo.createAccessToken(newCreatedUser.id);
    const refreshToken = await this.userRepo.createRefeshToken(newCreatedUser.id);
    const userWithoutPassword = this._stripSensitiveFields(newCreatedUser);

    return {
      token: {
        accessToken,
        refreshToken,
      },
      userId: newCreatedUser.id,
      user: userWithoutPassword,
    };



  };

  async refresh(refreshToken) {
    if (!refreshToken) throw new Error("MISSING_REFRESH_TOKEN");
    let decoded;
    try {
      decoded = await this.userRepo.verifyRefreshToken(refreshToken);
    } catch (e) {
      throw new Error("INVALID_REFRESH_TOKEN");
    }

    const userId = decoded?.id;
    if (!userId) throw new Error("INVALID_REFRESH_TOKEN");

    const user = await this.userRepo.findById(userId);
    if (!user) throw new Error("USER_NOT_FOUND");

    const accessToken = await this.userRepo.createAccessToken(userId);
    const newRefreshToken = await this.userRepo.createRefeshToken(userId);

    return {
      token: {
        accessToken,
        refreshToken: newRefreshToken,
      },
      userId,
      user: this._stripSensitiveFields(user),
    };
  }

  async me(userId) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new Error("USER_NOT_FOUND");
    return this._stripSensitiveFields(user);
  }


}
