// @mui
import { useTheme } from "@mui/material/styles";
import { Container, Grid, Stack } from "@mui/material";
// hooks
import useAuth from "../../hooks/useAuth";
import useSettings from "../../hooks/useSettings";
// layouts
import Layout from "../../layouts";
// components
import Page from "../../components/Page";

//importing SyllabusCard
import SyllabusCard from "../../MyComponents/DashBoardCard Comp/SyllabusCard";
//importing AchievementCard
import AchievementCard from "../../MyComponents/DashBoardCard Comp/AchievementCard";

// ----------------------------------------------------------------------

GeneralApp.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { user } = useAuth();

  const theme = useTheme();

  const { themeStretch } = useSettings();

  return (
    <Page title="General: App">
      <Container maxWidth={themeStretch ? false : "xl"}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <SyllabusCard
              card={{
                title: `You have completed more than expected since March 2021. Awesome:)`,
                chartData: [75, 50],
                labels: ["Completed", "Benchmark"],
                Total: 100,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <AchievementCard
              card={{
                title:
                  "Last year, you have earned more coins than most students in your age group",
                dropdownOptions: ["Last Year", "Current Year", "2019-20"],
                chartData: [
                  {
                    name: "My Coins",
                    data: [19, 19, 20, 30, 45, 75, 75, 80, 85, 70, 65, 60],
                  },
                  {
                    name: "Average Coins earned in my age group",
                    data: [35, 35, 37, 39, 45, 50, 45, 46, 25, 20, 15, 15],
                  },
                ],
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
