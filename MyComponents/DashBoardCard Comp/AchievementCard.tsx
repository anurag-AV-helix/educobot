import { useState } from "react";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import {
  Card,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
  Chip,
  Grid,
} from "@mui/material";

//hooks
import useResponsive from "../../hooks/useResponsive";

// components
import Iconify from "../../components/Iconify";
import { IconButton } from "@mui/material";

//importing AchievementChart
import AchievementChart from "./AchievementChart";

//shadow import
import DropdownShadow from "../DashBoardCard Comp/Shadow";
// import StarFull from "../../assets/icon_starFull";
// import StarHalf from "../../assets/icon_starHalf";

const RootStyle = styled(Card)(({ theme }) => ({
  maxWidth: 900,
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
    dropdownOptions: any;
    chartData: any;
  };
};

export default function AchievementCard({ card }: Props) {
  const { title, dropdownOptions, chartData } = card;
  const theme = useTheme();
  // const [legendAlign, setLegendAlign] = useState("right");
  // let legendAlign = "right";
  // const dropdownOptions = dropdownOptions;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setOpen] = useState<null | HTMLElement>(null);
  const mdUp = useResponsive("up", "md");
  const mdDown = useResponsive("down", "md");

  // mdUp ? setLegendAlign("rigth") : setLegendAlign("left");
  // mdUp ? (legendAlign = "rigth") : (legendAlign = "left");
  // console.log(mdUp);
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setSelectedIndex(index);
    setOpen(null);
    // setOpenList(null);
  };

  return (
    <RootStyle>
      {mdUp && (
        <Grid container spacing={1}>
          <Grid item xs={9}>
            <Typography my={1} variant="h5" fontWeight={700}>
              {`Achievement (coins earned)`}
            </Typography>

            <Typography my={1} sx={{ color: "text.secondary" }}>
              {title}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <DropdownShadow
              key="error"
              title={
                <>
                  <Button
                    style={{
                      backgroundColor: "#F4F6F8",
                      color: "#000",
                      minWidth: "110px",
                      padding: "6px 0px",
                    }}
                    onClick={handleOpen}
                  >
                    {dropdownOptions[selectedIndex]}
                    <Iconify
                      icon={
                        isOpen
                          ? "eva:arrow-ios-upward-fill"
                          : "eva:arrow-ios-downward-fill"
                      }
                      sx={{ ml: 0.5, width: 16, height: 16 }}
                    />
                  </Button>
                  <IconButton
                    color="inherit"
                    onClick={() => {
                      alert("Download Started");
                    }}
                  >
                    <Iconify icon="eva:download-fill" />
                  </IconButton>
                </>
              }
              sx={{
                width: "inlineBlock",
                px: 1,
                py: 0.5,
                mx: 0,
                my: 1,
                // color: theme.palette.grey,
                bgcolor: theme.palette.grey[200],
              }}
            ></DropdownShadow>

            <Menu
              keepMounted
              id="simple-menu"
              anchorEl={isOpen}
              onClose={handleClose}
              open={Boolean(isOpen)}
            >
              {dropdownOptions.map((option, index) => (
                <MenuItem
                  key={option}
                  selected={index === selectedIndex}
                  onClick={(event) => handleMenuItemClick(event, index)}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </Grid>
        </Grid>
      )}

      {mdDown && (
        <>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography my={1} variant="h5" fontWeight={700}>
                {`Achievement (coins earned)`}
              </Typography>

              <Typography my={1} sx={{ color: "text.secondary" }}>
                {title}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <DropdownShadow
                key="error"
                title={
                  <>
                    <Button
                      style={{
                        backgroundColor: "#F4F6F8",
                        color: "#000",
                        minWidth: "110px",
                        padding: "6px 0px",
                      }}
                      onClick={handleOpen}
                    >
                      {dropdownOptions[selectedIndex]}
                      <Iconify
                        icon={
                          isOpen
                            ? "eva:arrow-ios-upward-fill"
                            : "eva:arrow-ios-downward-fill"
                        }
                        sx={{ ml: 0.5, width: 16, height: 16 }}
                      />
                    </Button>
                    <IconButton
                      color="inherit"
                      onClick={() => {
                        alert("Download Started");
                      }}
                    >
                      <Iconify icon="eva:download-fill" />
                    </IconButton>
                  </>
                }
                sx={{
                  width: "200px",
                  px: 1,
                  py: 0.5,
                  mx: 0,
                  my: 1,
                  // color: theme.palette.grey,
                  bgcolor: theme.palette.grey[200],
                }}
              ></DropdownShadow>

              <Menu
                keepMounted
                id="simple-menu"
                anchorEl={isOpen}
                onClose={handleClose}
                open={Boolean(isOpen)}
              >
                {dropdownOptions.map((option, index) => (
                  <MenuItem
                    key={option}
                    selected={index === selectedIndex}
                    onClick={(event) => handleMenuItemClick(event, index)}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </Grid>
          </Grid>
        </>
      )}

      <Box sx={{ width: "100%" }}>
        <AchievementChart chartData={chartData} />
      </Box>
      {/* <StarHalf />
      <StarFull />
      <StarHalf /> */}
    </RootStyle>
  );
}
