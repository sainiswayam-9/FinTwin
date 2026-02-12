import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { colors } from "../../theme";

const screenWidth = Dimensions.get("window").width;

const demoBalances = [
  12000, 11200, 10550, 9800, 9050, 8400, 7600, 6900, 6100, 5400, 4700, 3900,
];

export default function Dashboard() {
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [{
      data: demoBalances,
      color: () => colors.accent,
      strokeWidth: 3,
    }],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Overview</Text>
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Savings</Text>
          <Text style={styles.statValue}>₹12,000</Text>
          <Text style={styles.statDelta}>+4.2% vs last month</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Monthly Net</Text>
          <Text style={styles.statValue}>-₹800</Text>
          <Text style={styles.statDelta}>Burning cash</Text>
        </View>
      </View>

      <View style={styles.statCardWide}>
        <Text style={styles.statLabel}>Runway</Text>
        <Text style={styles.statValue}>14 months</Text>
        <Text style={styles.statDelta}>Based on current burn</Text>
      </View>

      <Text style={[styles.sectionTitle, styles.sectionSpacing]}>Cashflow Trend</Text>
      <View style={styles.chartCard}>
        <LineChart
          data={chartData}
          width={Math.min(screenWidth - 48, 380)}
          height={220}
          withDots={false}
          withInnerLines={false}
          withOuterLines={false}
          yAxisSuffix=""
          chartConfig={{
            backgroundGradientFrom: colors.light,
            backgroundGradientTo: colors.light,
            decimalPlaces: 0,
            color: () => colors.accent,
            labelColor: () => colors.slate,
            propsForBackgroundLines: {
              stroke: colors.slate,
            },
          }}
          style={styles.chart}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.dark,
  },
  sectionSpacing: {
    marginTop: 4,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.light,
    borderRadius: 16,
    padding: 16,
    shadowColor: colors.dark,
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  statCardWide: {
    backgroundColor: colors.light,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.slate,
  },
  statLabel: {
    fontSize: 12,
    color: colors.slate,
    marginBottom: 6,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.dark,
  },
  statDelta: {
    marginTop: 6,
    fontSize: 12,
    color: colors.slate,
  },
  chartCard: {
    backgroundColor: colors.light,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: "center",
    shadowColor: colors.dark,
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  chart: {
    borderRadius: 12,
  },
});
