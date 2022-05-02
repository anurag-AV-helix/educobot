import * as React from "react";
import { Box, BoxProps } from "@mui/material";
function GirlOnChairIllustration({ ...other }: BoxProps) {
  return (
    <Box {...other}>
      <svg width={140} height={203} fill="none">
        <path fill="url(#prefix__pattern0)" d="M0 .5h140v202H0z" />
        <defs>
          <pattern
            id="prefix__pattern0"
            patternContentUnits="objectBoundingBox"
            width={1}
            height={1}
          >
            <use
              xlinkHref="#prefix__image0_429_9353"
              transform="matrix(.00061 0 0 .00042 -.002 0)"
            />
          </pattern>
          <image
            id="prefix__image0_429_9353"
            width={1646}
            height={2367}
          />
        </defs>
      </svg>
    </Box>
  );
}
const MemoTesting11 = React.memo(GirlOnChairIllustration);
export default MemoTesting11;