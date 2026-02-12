/* ================================
   Utility Functions (JavaScript)
================================ */

/**
 * Apply one-time purchases to monthly cashflow
 */
export function applyOneTimePurchases(cashflow, purchases) {
  const updated = [...cashflow];

  purchases.forEach((p) => {
    if (updated[p.month] !== undefined) {
      updated[p.month] -= p.amount;
    }
  });

  return updated;
}

/**
 * Apply EMI deductions
 */
export function applyEMIs(cashflow, emis) {
  const updated = [...cashflow];

  emis.forEach((emi) => {
    for (
      let m = emi.startMonth;
      m < emi.startMonth + emi.durationMonths;
      m++
    ) {
      if (updated[m] !== undefined) {
        updated[m] -= emi.emi;
      }
    }
  });

  return updated;
}

/**
 * Apply income changes (increase or decrease)
 */
export function applyIncomeChanges(cashflow, changes) {
  const updated = [...cashflow];

  changes.forEach((change) => {
    for (let m = change.startMonth; m < updated.length; m++) {
      updated[m] += change.amount;
    }
  });

  return updated;
}

/**
 * Generates base monthly cashflow array
 */
export function generateBaseCashflow(
  months,
  monthlyIncome,
  monthlyExpenses
) {
  return Array(months).fill(monthlyIncome - monthlyExpenses);
}

/**
 * Full financial simulation
 */
export function simulateRunway(
  base,
  months,
  oneTime = [],
  emis = [],
  incomeChanges = []
) {
  let cashflow = generateBaseCashflow(
    months,
    base.monthlyIncome,
    base.monthlyExpenses
  );

  cashflow = applyIncomeChanges(cashflow, incomeChanges);
  cashflow = applyEMIs(cashflow, emis);
  cashflow = applyOneTimePurchases(cashflow, oneTime);

  let balance = base.savings;
  let runwayMonth = -1;

  const timeline = cashflow.map((monthFlow, index) => {
    balance += monthFlow;

    if (balance < 0 && runwayMonth === -1) {
      runwayMonth = index;
    }

    return {
      month: index,
      cashflow: monthFlow,
      balance,
      risk: balance < 0,
    };
  });

  return {
    runwayMonth, // -1 = safe for full duration
    timeline,
  };
}
