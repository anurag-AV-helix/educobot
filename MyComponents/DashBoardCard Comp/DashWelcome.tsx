import { useState } from "react";
import {
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Alert,
  AlertTitle,
  Button,
  Grid,
} from "@mui/material";
// @mui
import { useTheme, styled, alpha } from "@mui/material/styles";
import InvitationCard from "../DashBoardCard Comp/InvitationCard Comp/InvitationCard";

export default function DashWelcome() {
  const theme = useTheme();
  const [selectedCourse, setSelectedCourse] = useState("python");

  const changeCourse = (event: any) => {
    setSelectedCourse(event.target.value);
  };
  return (
    <>
      <Typography variant="h5" component="h1">
        Introduction To Coding
      </Typography>

      {/* <RadioGroup */}
      {/* <RadioGroup
        row
        defaultValue="python"
        name="course_name"
        onChange={changeCourse}
      >
        <FormControlLabel
          value="python"
          control={<Radio />}
          label={
            selectedCourse === "python" ? (
              <Typography variant="h6">
                Certificate in Python Programming
              </Typography>
            ) : (
              <Typography variant="h6" color={theme.palette.grey[500]}>
                Certificate in Python Programming
              </Typography>
            )
          }
        />
        <FormControlLabel
          value="data_science"
          control={<Radio />}
          label={
            selectedCourse === "data_science" ? (
              <Typography variant="h6">Certificate in Data Science</Typography>
            ) : (
              <Typography variant="h6" color={theme.palette.grey[500]}>
                Certificate in Data Science
              </Typography>
            )
          }
        />
      </RadioGroup>

      <Grid container spacing={3}>
        <Grid item xs={12}>
      </RadioGroup> */}

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <RadioGroup
            row
            defaultValue="python"
            name="course_name"
            onChange={changeCourse}
          >
            <FormControlLabel
              value="python"
              control={<Radio />}
              label={
                selectedCourse === "python" ? (
                  <Typography variant="h6">
                    Certificate in Python Programming
                  </Typography>
                ) : (
                  <Typography variant="h6" color={theme.palette.grey[500]}>
                    Certificate in Python Programming
                  </Typography>
                )
              }
            />
            <FormControlLabel
              value="data_science"
              control={<Radio />}
              label={
                selectedCourse === "data_science" ? (
                  <Typography variant="h6">
                    Certificate in Data Science
                  </Typography>
                ) : (
                  <Typography variant="h6" color={theme.palette.grey[500]}>
                    Certificate in Data Science
                  </Typography>
                )
              }
            />
          </RadioGroup>
        </Grid>
        <Grid item xs={12}>
          <Alert
            variant="filled"
            severity="info"
            sx={{ fontSize: "14px", fontWeight: 400, alignItems: "center" }}
            onClose={() => {}}
          >
            <AlertTitle>Milestone coming up</AlertTitle>
            This is an info alert — <strong>check it out!</strong>
          </Alert>
        </Grid>
        <Grid item xs={12}>
          <Alert
            variant="filled"
            severity="success"
            sx={{ fontSize: "14px", fontWeight: 400, alignItems: "center" }}
            onClose={() => {}}
          >
            <AlertTitle>
              {"Congratulations on winning the <badge name> badge"}
            </AlertTitle>
            This is an Success alert — <strong>check it out!</strong>
          </Alert>
        </Grid>
        <Grid item xs={12}>
          <Alert
            variant="filled"
            severity="warning"
            sx={{ fontSize: "14px", fontWeight: 400, alignItems: "center" }}
            action={
              <Button
                color="inherit"
                size="small"
                variant="outlined"
                sx={{
                  textTransform: "none",
                  border: (theme) =>
                    `1px solid ${alpha(theme.palette.common.black, 0.48)}`,
                }}
              >
                Renew now
              </Button>
            }
          >
            <AlertTitle>
              {"Your course <course name> will expire on 24 April 2024"}
            </AlertTitle>
            This is an Warning alert — <strong>check it out!</strong>
          </Alert>
        </Grid>
        <Grid item xs={12}>
          <Alert
            variant="filled"
            severity="error"
            sx={{ fontSize: "14px", fontWeight: 400, alignItems: "center" }}
            action={
              <Button
                color="inherit"
                size="small"
                variant="outlined"
                sx={{
                  textTransform: "none",
                  border: (theme) =>
                    `1px solid ${alpha(theme.palette.common.white, 0.48)}`,
                }}
              >
                Renew now
              </Button>
            }
          >
            <AlertTitle>{"Your course <course name> has expired"}</AlertTitle>
            Courses expire after 36 months. Renew for 36 months at a discounted
            price of INR 2500/-
          </Alert>
        </Grid>
        <Grid item xs={12}>
          <InvitationCard />
        </Grid>
      </Grid>
    </>
  );
}
