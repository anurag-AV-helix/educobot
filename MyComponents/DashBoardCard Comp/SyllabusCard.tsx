import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import { Card, Typography, Box } from "@mui/material";

//importing SyllabusRadialBar
import SyllabusRadialBar from "./SyllabusRadialBar";

const RootStyle = styled(Card)(({ theme }) => ({
  // maxWidth: 400,
  width: "100%",
  height: "100%",
  margin: "auto",
  display: "flex",
  position: "relative",
  alignItems: "start",
  flexDirection: "column",
  padding: theme.spacing(3),
  [theme.breakpoints.up(414)]: {
    padding: theme.spacing(5),
  },
}));

type Props = {
  card: {
    title: String;
    chartData: any;
    labels: any;
    Total: Number;
  };
};

export default function SyllabusCard({ card }: Props) {
  const { title, chartData, labels, Total } = card;
  return (
    <RootStyle>
      <Typography my={1} variant="h5" fontWeight={700} maxWidth={"16rem"}>
        Syllabus Completed
      </Typography>

      <Typography my={1} sx={{ color: "text.secondary" }}>
        {title}
      </Typography>

      <Box sx={{ width: "100%" }}>
        <SyllabusRadialBar
          chartData={chartData}
          labels={labels}
          Total={Total}
        />
      </Box>
    </RootStyle>
  );
}
