//1. getlessons
//2. open otp
//3. last active course
// all open otp blue, the very next to blue card should be grey but accessible



import { paramCase } from "change-case";
import { ReactChild, ReactFragment, ReactPortal, useEffect, useState } from "react";
// @mui
import { useTheme } from "@mui/material/styles";
// next
import NextLink from "next/link";
import { useRouter } from "next/router";
// @mui
import {
  Box,
  Tab,
  Tabs,
  Card,
  Table,
  Switch,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  FormControlLabel,
  Typography,
  Stack,
  TextField,
  Menu,
  MenuItem,
  Grid,
  Chip,
  Alert,
  AlertTitle,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
// routes
import { PATH_AUTH, PATH_DASHBOARD } from "../../../routes/paths";
// hooks
import useTabs from "../../../hooks/useTabs";
import useSettings from "../../../hooks/useSettings";
import useTable, { getComparator, emptyRows } from "../../../hooks/useTable";
// @types
import { UserManager } from "../../../@types/user";

import data from "../../../_mock/data";
// layouts
import Layout from "../../../layouts";
// components
import Page from "../../../components/Page";
import Iconify from "../../../components/Iconify";
import Scrollbar from "../../../components/Scrollbar";
import Label from "../../../components/Label";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import {
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedActions,
} from "../../../components/table";
// sections
import {
  StudentTableToolbar,
  StudentTableRow,
} from "../../../sections/@dashboard/saasstudent/list";

import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from "../../../components/hook-form";

import { LoadingButton } from "@mui/lab";

import pellete from "../../../theme/palette";
import Image from "../../../components/Image";
import axios from "axios";
import dummyIMG from "../../../public/imgs/rabbitImg.png"
import { ClassNames } from "@emotion/react";
import Link from "next/link";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

Curriculum.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

const CLASS_DATA = ["5", "6", "7", "8", "9"];
const DIVISION_DATA = ["A", "B", "C", "D"];
const CourseNames = ["Introduction To Coding", "Certificate in Python Programming", "Certificate in Data Science"];

export default function Curriculum() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const { push } = useRouter();

  const [isOpen, setOpen] = useState<null | HTMLElement>(null);
  const [isOpen2, setOpen2] = useState<null | HTMLElement>(null);
  const [OpenTitleDDL, setOpenTitleDDL] = useState<null | HTMLElement>(null);

  const [classValue, setClassValue] = useState("Class");
  const [divisionValue, setDivisionValue] = useState("Division");
  const [CourseName, setCourseName] = useState(CourseNames[0]);

  const [data, setData] = useState<any[]>([]);
  const [allLessons, setAllLessons] = useState([]);
  const [otp, setOtp] = useState<any>([]);
  // const [activeLesson, setActiveLesson] = useState({
  //   ActiveId: ["e0c38e50-cbb3-455f-ae16-d737fc624b24", "00351ca6-78bd-479a-94d6-e40a9cc86313", "5deef5f3-1412-4fbc-bc0c-12d0baa9184f", "7beec1a9-3a77-467a-8a12-7b1296746b9d"],
  //   validity: ["1654162910", "1654162610", "1654162510", "1654162510"],
  //   started: ["1654162910", "1654162610", "1654162510", "1654162510"]
  // });

  const [activeLesson, setActiveLesson] = useState<any>({
    ActiveId: [],
    validity: [],
    started: [],
    expired: ["e0c38e50-cbb3-455f-ae16-d737fc624b24"],
    nextLesson: ""
  });

  const [openOTP, setOpenOtp] = useState([]);

  const [closeAlert, setCloseAlert] = useState(true);
  const [closeAlertMsg, setCloseAlertMsg] = useState("");

  const getLessonData = async () => {
    // if (CLASS_DATA.includes(classValue) && DIVISION_DATA.includes(divisionValue))
    // {
    const formData = new FormData();
    formData.append('courseName', CourseName);

    await axios.post("https://appssl.educobot.com:8443/EduCobotWS/lessonsWS/getLessonsByCourse", formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(res => {
        if (res.data.STATUS === "SUCCESS") {
          setData(res.data.DATA)

          let allLessonsArr = [];
          res.data.DATA.map((obj, i) => obj.LESSONS.map(lesson => allLessonsArr.push(lesson)));
          setAllLessons([...allLessonsArr]);
        }
      })
      .catch(err => {
        console.log(err)
      })
    // }
  }

  const getOTP = async (id: any) => {
    if (CLASS_DATA.includes(classValue) && DIVISION_DATA.includes(divisionValue)) {
      const schoolID = localStorage.getItem("schoolID");
      const userID = localStorage.getItem("userID");
      let body = {
        "std": `${classValue}`,
        "div": `${divisionValue}`,
        "lessonID": `${id}`
      }

      await axios.post("https://api.educobot.com/sessionRoute/generateOTP", body,
        { headers: { 'Content-Type': 'application/json', 'authorization': `Bearer ${localStorage.getItem("accessToken")}`}}
      )
        .then(res => {
          if (res.data.STATUS == "SUCCESS") {
            // to avoid storing of multiple otp of same lesson in the state
            let newOtpArr = otp.filter(obj => obj?.id != id);
            setOtp([...newOtpArr, { id: id, otp: res.data.PIN }]);

            // push id and condition to identify that if otp was already created for this lesson
            if (!activeLesson.ActiveId.includes(id)) {
              setActiveLesson((prev: any) => {
                return {
                  ...prev,
                  ActiveId: [...prev.ActiveId, id]
                }
              })
            }
          }
        })
        .then(() => {
          CheckOpenPin(divisionValue);
          ExpirednLastActiveLesson(divisionValue);
        })
        .catch(err => {
          console.log(err)
        })
    }
    else {
      setCloseAlertMsg("Please select the class and division");
      setCloseAlert(false);
    }
  }


  const token = localStorage.getItem("accessToken");
  const CheckOpenPin = async (option: any) => {
    console.log("I ran first checkpin")

    if (classValue !== "Class" && option !== "Division") {
      try {
        const response = await axios.post("https://api.educobot.com/sessionRoute/getOpenPIN",
          { "std": classValue, "div": option },
          {
            headers: {
              "authorization": `Bearer ${token}`
            }
          });


        setActiveLesson((prev: any) => {
          return {
            ...prev,
            ActiveId: [],
            validity: [],
            started: []
          }
        })

        setOpenOtp((prev: any) => {
          return [];
        });

        setOtp((prev: any) => {
          return []
        })

        let ActiveIdArr: any[] = [];
        let validityArr: any[] = [];
        let startedArr: any[] = [];

        if (response.data.data.length > 0) {
          let data = response.data.data;
          //const otplessonIdArr = []; // this method not working as otp is not coming in sequence

          data.forEach((obj) => {

            ActiveIdArr.push(obj.spLessonID);
            validityArr.push(obj.spStartTime);
            startedArr.push(obj.spStartTime);

            type NewType = any;

            //!otplessonIdArr.includes(obj.spLessonID) &&
            setOpenOtp((prev: NewType) => {
              return [...prev, {
                id: obj.spLessonID,
                otp: obj.spPIN
              }];
            });

            //!otplessonIdArr.includes(obj.spLessonID) &&
            setOtp((prev: any) => {
              return [
                ...prev,
                { id: obj.spLessonID, otp: obj.spPIN }
              ]
            })

            //otplessonIdArr.push(obj.spLessonID);
          })

          setActiveLesson((prev: any) => {
            return {
              ...prev,
              ActiveId: [...prev.ActiveId, ...ActiveIdArr],
              validity: [...prev.validity, ...validityArr],
              started: [...prev.started, ...startedArr]
            }
          })
        }
      }
      catch (err) {
        console.log(err)
      }
    } else {
      console.log("not perform request");
    }
  }


  const ExpirednLastActiveLesson = async (division) => {
    console.log("I ran first expired")
    if (classValue !== "Class" && division !== "Division") {
      const token = localStorage.getItem("accessToken");
      try {
        token &&
          await axios.post("https://api.educobot.com/lessonsRoute/getMaxOTPLesson",
            {"std": classValue, "div": division },
            {
              headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
              },
            })
            .then(res => {
              const maxLesson = res.data.data[0].maxLessonNo;
              console.log(maxLesson)

              !activeLesson.expired.includes(allLessons[maxLesson].lsID) ?
                setActiveLesson(prev => {
                  return {
                    ...prev,
                    ActiveId: [...prev.ActiveId, allLessons[maxLesson].lsID],
                    nextLesson: allLessons[maxLesson + 1].lsID
                  }
                })
                :
                setActiveLesson(prev => {
                  return {
                    ...prev,
                    ActiveId: [...prev.ActiveId, allLessons[maxLesson + 1].lsID],
                    nextLesson: allLessons[maxLesson + 2].lsID
                  }
                })
            })
            .catch(err => {
              console.log(err)
            })

        // get the expired sessions
        // const ExpiredLessonsRes = token &&
        //   await axios.post("https://api.educobot.com/sessionRoute/getClosedPIN",
        //     { "std": classValue, "div": division },
        //     {
        //       headers: {
        //         "Content-Type": "application/json",
        //         "authorization": `Bearer ${token}`
        //       },
        //     });
        // console.log(ExpiredLessonsRes)
        // ExpiredLessonsRes.data.data.length > 0 &&
        //   ExpiredLessonsRes.data.data.map(obj => {
        //     // save in activeLesson's expired array
        //     setActiveLesson(prev => {
        //       return { ...prev, expired: [...prev.expired, obj.spLessonID] }
        //     })
        //   })
      }
      catch (error) {
        console.log(error)
      }
    }
  }

  // get the lessons and expired lessons
  useEffect(() => {
    getLessonData();
    openOTP.length > 0 && setOtp([...openOTP]);
  }, []);


  // on error occurred
  useEffect(() => {
    window.scrollTo(0, 0);
    let tm = setTimeout(() => {
      setCloseAlert(true);
    }, 4000);

    closeAlert && setCloseAlertMsg("");

    return () => clearTimeout(tm);
  }, [closeAlert])


  useEffect(() => {
    ExpirednLastActiveLesson(divisionValue)
  }, [])



  // opening of dropdown
  const handleOpenClass = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleOpenDivision = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen2(event.currentTarget);
  };

  const handleOpenTitle = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenTitleDDL(event.currentTarget);
  };

  // on closing the dropdowns
  const handleCloseClass = (event: any, option: string) => {
    option !== classValue ?
      (setClassValue(option), setDivisionValue("Division")) :
      ""
    setOpen(null);
  };

  const handleCloseDivision = (event: any, option: string) => {
    setDivisionValue(option)
    setOpen2(null);

    CheckOpenPin(option);
    ExpirednLastActiveLesson(option)
  };

  const handleCloseTitleDDL = (event: any, title: string) => {
    setCourseName(title)
    setOpenTitleDDL(null)
  };



  return (
    <Page title="Teacher: Curriculum">

      <Alert
        variant="filled"
        severity="error"
        sx={{ fontSize: "14px", fontWeight: 400, alignItems: "center", display: closeAlert == true ? "none" : "flex", mb: 1, zIndex: 1 }}
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
            onClick={() => { setCloseAlert(true); setCloseAlertMsg("") }}
          >
            Close
          </Button>
        }
      >
        <AlertTitle>{"Error"}</AlertTitle>
        {closeAlertMsg}
      </Alert>

      <Container maxWidth={themeStretch ? false : "xl"}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent={"space-between"}
          spacing={2}
          alignItems={{ xs: "start", md: "center" }}
        >

          {/* CourseName */}
          <Stack width={{ xs: "100%", sm: "auto" }}
            direction={{ xs: "column", sm: "row" }}
            spacing={2}>
            <Button color="inherit" onClick={handleOpenTitle}>
              {CourseName}
              <Iconify
                icon={
                  OpenTitleDDL
                    ? "eva:arrow-ios-upward-fill"
                    : "eva:arrow-ios-downward-fill"
                }
                sx={{ ml: 0.5, width: 16, height: 16 }}
              />
            </Button>
            <Menu
              keepMounted
              id="simple-menu"
              anchorEl={OpenTitleDDL}
              onClose={(e) => handleCloseTitleDDL(e, CourseNames[0])}
              open={Boolean(OpenTitleDDL)}
            >
              {CourseNames.map((title) => (
                <MenuItem key={title} onClick={(e) => handleCloseTitleDDL(e, title)}>
                  {title}
                </MenuItem>
              ))}
            </Menu>
          </Stack>

          {/* class and division */}
          <Stack
            width={{ xs: "100%", sm: "auto" }}
            direction={{ xs: "column", sm: "row" }}
            spacing={2}>
            <Button variant="outlined" color="inherit" onClick={handleOpenClass}>
              {classValue}
              <Iconify
                icon={
                  isOpen
                    ? "eva:arrow-ios-upward-fill"
                    : "eva:arrow-ios-downward-fill"
                }
                sx={{ ml: 0.5, width: 16, height: 16 }}
              />
            </Button>
            <Menu
              keepMounted
              id="simple-menu"
              anchorEl={isOpen}
              onClose={(e) => handleCloseClass(e, classValue)}
              open={Boolean(isOpen)}
            >
              {CLASS_DATA.map((option) => (
                <MenuItem key={option} onClick={(e) => handleCloseClass(e, option)}>
                  {option}
                </MenuItem>
              ))}
            </Menu>

            <Button variant="outlined" color="inherit" onClick={handleOpenDivision} >
              {divisionValue}
              <Iconify
                icon={
                  isOpen2
                    ? "eva:arrow-ios-upward-fill"
                    : "eva:arrow-ios-downward-fill"
                }
                sx={{ ml: 0.5, width: 16, height: 16 }}
              />
            </Button>
            <Menu
              keepMounted
              id="simple-menu"
              anchorEl={isOpen2}
              onClose={(e) => handleCloseDivision(e, divisionValue)}
              open={Boolean(isOpen2)}
            // onClick={CheckOpenPin}
            >
              {DIVISION_DATA.map((option) => (
                <MenuItem key={option} onClick={(e) => handleCloseDivision(e, option)}>
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </Stack>
        </Stack>

        {/* lesson cards */}
        {
          data.length > 0 &&
          data.map((courses, index: any) => {
            return (
              (classValue == "Class" || divisionValue == "Division") ?
                <LessonCard key={index} courses={courses} index={index} otp={otp} getOTP={getOTP} activeLesson={activeLesson} isDivSelected={false} />
                :
                <LessonCard key={index} courses={courses} index={index} otp={otp} getOTP={getOTP} activeLesson={activeLesson} isDivSelected={true} />
            )
          })
        }
      </Container>
    </Page>
  );
}




//************************* LESSON CARD ***************************
type LessonCardProps = {
  courses: any,
  index: Number,
  otp: any,
  getOTP: (id: string) => Promise<void>,
  activeLesson: any,
  isDivSelected: boolean
}

export const LessonCard = ({ courses, index, otp, getOTP, activeLesson, isDivSelected }: LessonCardProps) => {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";
  let tags = ["tag1", "tag2", "tag3", "tag4"];


  const openLesson = async (lsID: string) => {
    try {
      let blocklyLessons = ["4bda4814-a2b1-4c4f-b102-eda5181bd0f8", "1d749e84-1155-4269-93ab-550ee7aabd4a"];
      let lessonType = blocklyLessons.includes(lsID) ? "blockly" : "game";

      const userId = localStorage.getItem("userID");
      const link = userId &&
        `${process.env.webAppUrl}/${lessonType}/${lsID}?user_id=${userId}`;

      (link && typeof window != 'undefined') && window.open(link)
    }
    catch (error) {
      console.log(error)
    }
  }


  const ifThisCardHaveOTP = (lsID: string) => {
    if (otp.length > 0) {
      let arr = otp.map((obj: any) => obj.id == lsID ? obj : null).filter((ele: any) => ele !== null)
      return arr.length > 0 ? true : false
    }
    else return false
  }


  const getButtons = (lsID: string, course: any) => {
    const isOTP = ifThisCardHaveOTP(lsID);
    // active & has otp
    if ((course.isActive || activeLesson.ActiveId.includes(lsID)) && isOTP == true) {
      return <>
        <Button variant="contained" color="inherit" onClick={() => openLesson(lsID)}>
          Open
        </Button>
        <Button variant="contained" color="error" onClick={async () => await getOTP(course.lsID)}>
          Reset OTP
        </Button>
      </>
    }
    // active & don't have otp
    else if ((course.isActive || activeLesson.ActiveId.includes(lsID)) && isOTP == false) {
      return <>
        <Button variant="contained" color="inherit" onClick={() => openLesson(lsID)}>
          Open
        </Button>
        <Button variant="contained" color="error" onClick={async () => await getOTP(course.lsID)}>
          Get OTP
        </Button>
      </>
    }
    // expired lesson
    else if (activeLesson.expired.includes(course.lsID) && isDivSelected == true) {
      return <>
        <Button fullWidth variant="outlined" color="inherit" onClick={() => openLesson(lsID)}>
          Open
        </Button>
      </>
    }
    // next lesson to be able to get otp
    else if (course.lsID === activeLesson.nextLesson && isDivSelected == true) {
      return <>
        <Button variant="outlined" color="inherit" onClick={() => openLesson(lsID)}>
          Open
        </Button>
        <Button variant="outlined" color="inherit" onClick={async () => await getOTP(course.lsID)}>
          Get OTP
        </Button>
      </>
    }
    else {
      return <>
        <Button variant="outlined" color="inherit" disabled>
          Open
        </Button>
        <Button variant="outlined" disabled color="inherit" onClick={async () => await getOTP(course.lsID)}>
          Get OTP
        </Button>
      </>
    }
  }


  const validity = (milliseconds) => {
    const d = new Date(Date.now());
    const date = d.getDate();
    const m = d.getMonth();
    const year = d.getFullYear();
    let hours = d.getHours();
    const period = (hours >= 12 && hours <= 24) ? "PM" : "AM";
    const minutes = d.getMinutes();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let month = months[m];

    return `${date} ${month} ${year}, ${hours}:${minutes} ${period}`;
  }

  const getCurrentLessonOtp = (id) => {
    return otp.map(obj => obj.id == id && obj.otp).filter(otp => otp !== undefined)[0];
  }

  return (
    <div style={{ marginTop: "50px", padding: "0 10px" }}>
      <Typography variant="body2" component={"h1"}>
        Level {Number(index) + 1}
      </Typography>
      <Grid container>
        {
          courses.LESSONS.map((course: any, index: any) => {
            if (activeLesson.ActiveId.includes(course.lsID)) {
              let validityIndex = activeLesson.ActiveId.indexOf(course.lsID);
              course = { ...course, isCompleted: false, isActive: true, validity: activeLesson.validity[validityIndex], CurrOtp: getCurrentLessonOtp(course.lsID) }
            }
            return <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={course?.lsID}>
              <Card
                sx={{
                  py: 2.5,
                  px: 1,
                  my: 2,
                  mx: 1,
                  minHeight: "475px",
                  maxWidth: "350px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  ...((course.isActive) && { background: "linear-gradient(135deg, #84A9FF 0%, #1939B7 100%)" }),
                  ...(((activeLesson.expired.includes(course.lsID) || activeLesson.nextLesson == course.lsID) && isLight) && { backgroundColor: pellete.light.grey[0] }),
                  ...(((!course.isActive) && (isDivSelected == false) && (activeLesson.nextLesson !== course.lsID) && isLight) && { backgroundColor: pellete.light.grey[200] })
                }}>
                {/* TITLE & INDEX */}
                <Stack spacing={1.5} padding={1}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      sx={{
                        color: isLight
                          ? pellete.light.grey[100]
                          : pellete.light.grey[900],
                        backgroundColor: isLight
                          ? pellete.light.grey[900]
                          : pellete.light.grey[200],
                        padding: "0px 7px",
                        border: "1.2px solid #F9FAFB",
                        borderRadius:"50%"
                      }}
                    >
                      {course.lsLessonNo}
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: ".8rem",
                      }}
                    >
                      {course?.lsName}
                    </Typography>
                  </Stack>


                  {/* TAGS */}
                  <Grid container gap={1}>
                    {tags.map((tag, i) => (
                      <Grid item key={i}>
                        {course[`lsSkillTag${i + 1}`] &&
                          <Chip
                            key={i}
                            size="small"
                            label={course[`lsSkillTag${i + 1}`]}
                            sx={{
                              color: isLight
                                ? pellete.light.grey[600]
                                : pellete.light.grey[400],
                              backgroundColor: isLight
                                ? pellete.light.grey[500_16]
                                : pellete.light.grey[700],
                              borderRadius: "10px",
                              ...(activeLesson.ActiveId.includes(course.lsID) && {
                                backgroundColor: pellete.light.grey[300],
                                color: pellete.light.grey[800],
                              }),
                            }}
                          />
                        }
                      </Grid>
                    ))}
                  </Grid>

                  <Image alt="image" src={`https://app.educobot.com/liveLessons/thumbNails/${course.lsName}.png`} width="100" maxHeight={"150px"} borderRadius={1} />

                  {/* DESCRIPTION */}
                  <Typography sx={{ color: course.isActive ? "#fff" : pellete.light.grey[500] }}>
                    {course?.lsDesc}
                  </Typography>
                </Stack>

                <Stack gap={1} padding={1}>
                  {/* OTP CONTAINER */}

                  {/* if have otp and lesson is active */}
                  <Stack>
                    {ifThisCardHaveOTP(course.lsID) == true &&
                      <>
                        {
                          otp.map((obj: any, i: number) => {
                            return obj.id == course.lsID &&
                              <>
                                <Typography variant="h6" component={"h1"} textAlign="center" color={pellete.light.grey[200]}>
                                  OTP {obj.otp}
                                </Typography>
                              </>
                          })
                        }
                      </>
                    }
                  </Stack>


                  {/* VIEW REPORT / PROGRESS BUTTON */}
                  {(course.isActive) ?
                    otp &&
                    // active
                    <Stack direction={"column"}>
                      {ifThisCardHaveOTP(course.lsID) == true &&
                        <>
                          <Typography variant="body2" textAlign="center" color={pellete.light.grey[200]}>
                            Valid till {validity(course?.validity)}
                          </Typography>
                        </>
                      }
                      <Link href={PATH_DASHBOARD.teacher.viewProgress + `?lsID=${course?.lsID}&otp=${course?.CurrOtp}`}>
                        <Button variant="contained" color="error" fullWidth sx={{ my: 1, fontWeight: 900 }}>
                          View Progress</Button>
                      </Link>
                    </Stack>
                    :
                    // expired
                    (activeLesson.expired.includes(course.lsID) && isDivSelected == true) &&
                    <Link href={PATH_DASHBOARD.teacher.viewReport + `?lsID=${course?.lsID}`}>
                      <Button variant="contained" color="warning" fullWidth sx={{ my: 1, fontWeight: 900 }}>View report</Button>
                    </Link>
                  }

                  {/* bottom buttons */}
                  <Stack direction={"row"} justifyContent="space-around">
                    {getButtons(course.lsID, course)}
                  </Stack>

                </Stack>
              </Card>
            </Grid>
          })
        }
      </Grid>
    </div>
  )
}
