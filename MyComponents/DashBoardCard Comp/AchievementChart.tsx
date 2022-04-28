import merge from "lodash/merge";
// @mui
import { useTheme } from "@mui/material/styles";
// components
import ReactApexChart, { BaseOptionChart } from "../../components/chart";
import { boolean } from "yup";

// ----------------------------------------------------------------------

interface ChartAreaProps {
  // legendAlign: any;
  chartData: any;
}

export default function ChartArea(props: ChartAreaProps) {
  const theme = useTheme();
  const CHART_DATA = props.chartData;
  const chartOptions = merge(BaseOptionChart(), {
    colors: [theme.palette.success.dark, theme.palette.warning.main],
    legend: {
      fontWeight: 600,
      fontSize: String(16),
      // horizontalAlign: "left",
      itemMargin: { right: 12, vertical: 4 },
    },
    xaxis: {
      type: "string",
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  });

  return (
    <ReactApexChart
      type="area"
      series={CHART_DATA}
      options={chartOptions}
      height={320}
    />
  );
}
