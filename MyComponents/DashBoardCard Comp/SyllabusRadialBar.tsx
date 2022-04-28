import merge from "lodash/merge";
// @mui
import { useTheme } from "@mui/material/styles";
// utils
import { fNumber } from "../../utils/formatNumber";
// components
import ReactApexChart, { BaseOptionChart } from "../../components/chart";

// ----------------------------------------------------------------------

interface SyllabusRadialBarProps {
  // legendAlign: any;
  chartData: any;
  labels: any;
  Total: any;
}
export default function SyllabusRadialBar(props: SyllabusRadialBarProps) {
  const CHART_DATA = [
    (props.chartData[0] * 100) / props.Total,
    (props.chartData[1] * 100) / props.Total,
  ];
  // console.log(props.chartData);

  const theme = useTheme();

  const chartOptions = merge(BaseOptionChart(), {
    labels: props.labels,
    fill: {
      type: "gradient",
      gradient: {
        colorStops: [
          [
            { offset: 0, color: theme.palette.success.main },
            { offset: 100, color: theme.palette.success.dark },
          ],
          [
            { offset: 0, color: theme.palette.warning.main },
            { offset: 100, color: theme.palette.warning.dark },
          ],
        ],
      },
    },
    legend: {
      position: "bottom",
      fontSize: String(16),
      horizontalAlign: "center",
      fontWeight: 600,
      itemMargin: { right: 12, vertical: 8 },
    },
    colors: [theme.palette.success.dark, theme.palette.warning.main],
    plotOptions: {
      radialBar: {
        hollow: { size: "64%" },
        dataLabels: {
          value: {
            offsetY: 16,
            color: theme.palette.text.secondary,
            fontSize: theme.typography.h3.fontSize as string,
            fontWeight: theme.typography.h3.fontWeight,
            lineHeight: theme.typography.h3.lineHeight,
          },
          total: {
            // formatter: () => fNumber(2324),
            formatter: () => `:)`,
            label: (props.chartData[0] * 100) / props.chartData[1] + "%",
            offsetY: 8,
            color: theme.palette.text.primary,
            fontSize: theme.typography.h3.fontSize as string,
            fontWeight: theme.typography.h3.fontWeight,
            lineHeight: theme.typography.h3.lineHeight,
          },
        },
      },
    },
  });

  return (
    <ReactApexChart
      type="radialBar"
      series={CHART_DATA}
      options={chartOptions}
      height={400}
    />
  );
}
