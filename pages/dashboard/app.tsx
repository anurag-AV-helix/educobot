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
import CourseCards from "../../MyComponents/Dashboard/CourseCards";
import RewardsComponent from "../../MyComponents/Dashboard/RewardsComponent";

import DashWelcome from "../../MyComponents/DashBoardCard Comp/DashWelcome";
//importing SyllabusCard
import SyllabusCard from "../../MyComponents/DashBoardCard Comp/SyllabusCard Comp/SyllabusCard";
//importing AchievementCard
import AchievementCard from "../../MyComponents/DashBoardCard Comp/AchievementCard Comp/AchievementCard";

// ----------------------------------------------------------------------

GeneralApp.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { user } = useAuth();

  const theme = useTheme();

  const { themeStretch } = useSettings();

  // return (
  //     <Page title="General: App">
  //             <CourseCards/>
  //             <RewardsComponent/>
  //     </Page>
  // );
  // return (
  //     <Page title="General: App">
  //         <Container maxWidth={themeStretch ? false : 'xl'}>
  //             <CourseCards/>
  //         </Container>
  //     </Page>
  // );
  return (
    <Page title="General: App">
      <Container maxWidth={themeStretch ? false : "xl"}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <DashWelcome />
          </Grid>
          <Grid item xs={12}>
            <CourseCards />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <SyllabusCard
              card={{
                title:
                  "You have completed more than expexted since March 2021. Awesome : )",
                chartData: [75, 50],
                labels: ["Completed", "Benchmark"],
                total: 100,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AchievementCard
              card={{
                title:
                  "Last year, you have earned more coins than most students in your age group ",
                CHART_DATA: [
                  {
                    year: "Current Year",
                    data: [
                      {
                        name: "My Coins",
                        data: [10, 41, 35, 45],
                      },
                      {
                        name: "Average Coins earned in my age group",
                        data: [10, 34, 13, 56],
                      },
                    ],
                  },
                  {
                    year: "Last Year",
                    data: [
                      {
                        name: "My Coins",
                        data: [148, 91, 69, 62, 49, 51, 35, 41, 10, 49, 51, 35],
                      },
                      {
                        name: "Average Coins earned in my age group",
                        data: [45, 77, 99, 88, 77, 56, 13, 34, 10, 49, 51, 35],
                      },
                    ],
                  },
                  {
                    year: "2019-20",
                    data: [
                      {
                        name: "My Coins",
                        data: [148, 91, 69, 62, 49, 49, 51, 35, 51, 35, 41, 10],
                      },
                      {
                        name: "Average Coins earned in my age group",
                        data: [45, 77, 99, 49, 51, 35, 88, 77, 56, 13, 34, 10],
                      },
                    ],
                  },
                ],
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <RewardsComponent />
          </Grid>
        </Grid>
      </Container>
    </Page>
    // <Page title="General: App">
    //   <Container maxWidth={themeStretch ? false : "xl"}>
    //     <Grid container spacing={1}>
    //       <Grid sx={{ marginBottom: "1rem" }}>
    //         <CourseCards />
    //       </Grid>
    //       <Grid container spacing={3}>
    //         <Grid item xs={12} md={12} lg={12}>
    //           <InvitationCard />
    //         </Grid>
    //         <Grid item xs={12} md={6} lg={4}>
    //           <SyllabusCard
    //             card={{
    //               title: `You have completed more than expected since March 2021. Awesome:)`,
    //               chartData: [75, 50],
    //               labels: ["Completed", "Benchmark"],
    //               total: 100,
    //             }}
    //           />
    //         </Grid>

    //         <Grid item xs={12} md={6} lg={8}>
    //           <AchievementCard
    //             card={{
    //               title:
    //                 "Last year, you have earned more coins than most students in your age group",
    //               CHART_DATA: [
    //                 {
    //                   year: "Current Year",
    //                   data: [
    //                     {
    //                       name: "My Coins",
    //                       data: [19, 40, 20, 30],
    //                     },
    //                     {
    //                       name: "Average Coins earned in my age group",
    //                       data: [35, 20, 37, 15],
    //                     },
    //                   ],
    //                 },
    //                 {
    //                   year: "Last Year",
    //                   data: [
    //                     {
    //                       name: "My Coins",
    //                       data: [
    //                         148, 91, 69, 62, 49, 51, 35, 41, 10, 35, 41, 1,
    //                       ],
    //                     },
    //                     {
    //                       name: "Average Coins earned in my age group",
    //                       data: [
    //                         45, 77, 99, 88, 77, 56, 13, 34, 10, 13, 34, 10,
    //                       ],
    //                     },
    //                   ],
    //                 },
    //                 {
    //                   year: "2019-20",
    //                   data: [
    //                     {
    //                       name: "My Coins",
    //                       data: [1, 35, 41, 10, 35, 41, 11, 48, 91, 69, 62, 49],
    //                     },
    //                     {
    //                       name: "Average Coins earned in my age group",
    //                       data: [
    //                         13, 34, 10, 45, 77, 99, 88, 77, 56, 10, 13, 34,
    //                       ],
    //                     },
    //                   ],
    //                 },
    //               ],
    //             }}
    //           />
    //         </Grid>
    //       </Grid>
    //     </Grid>
    //   </Container>
    // </Page>
  );
  //   return (
  //     <Page title="General: App">
  //       <Container maxWidth={themeStretch ? false : "xl"}>
  //         <CourseCards />
  //       </Container>
  //     </Page>
  //   );
}
