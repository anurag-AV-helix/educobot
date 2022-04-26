import { forwardRef } from 'react';
import NextLink from 'next/link';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  disabledLink?: boolean;
}

const Logo = forwardRef<any, Props>(({ disabledLink = false, sx }, ref) => {
  const theme = useTheme();
  // const PRIMARY_LIGHT = theme.palette.primary.light;
  // const PRIMARY_MAIN = theme.palette.primary.main;
  // const PRIMARY_DARK = theme.palette.primary.dark;

  const logo = (
    <Box ref={ref} sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}>
      {/* <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 512 512">
        <defs>
          <linearGradient id="BG1" x1="100%" x2="50%" y1="9.946%" y2="50%">
            <stop offset="0%" stopColor={PRIMARY_DARK} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id="BG2" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id="BG3" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
        </defs>
        <g fill={PRIMARY_MAIN} fillRule="evenodd" stroke="none" strokeWidth="1">
          <path
            fill="url(#BG1)"
            d="M183.168 285.573l-2.918 5.298-2.973 5.363-2.846 5.095-2.274 4.043-2.186 3.857-2.506 4.383-1.6 2.774-2.294 3.939-1.099 1.869-1.416 2.388-1.025 1.713-1.317 2.18-.95 1.558-1.514 2.447-.866 1.38-.833 1.312-.802 1.246-.77 1.18-.739 1.111-.935 1.38-.664.956-.425.6-.41.572-.59.8-.376.497-.537.69-.171.214c-10.76 13.37-22.496 23.493-36.93 29.334-30.346 14.262-68.07 14.929-97.202-2.704l72.347-124.682 2.8-1.72c49.257-29.326 73.08 1.117 94.02 40.927z"
          />
          <path
            fill="url(#BG2)"
            d="M444.31 229.726c-46.27-80.956-94.1-157.228-149.043-45.344-7.516 14.384-12.995 42.337-25.267 42.337v-.142c-12.272 0-17.75-27.953-25.265-42.337C189.79 72.356 141.96 148.628 95.69 229.584c-3.483 6.106-6.828 11.932-9.69 16.996 106.038-67.127 97.11 135.667 184 137.278V384c86.891-1.611 77.962-204.405 184-137.28-2.86-5.062-6.206-10.888-9.69-16.994"
          />
          <path
            fill="url(#BG3)"
            d="M450 384c26.509 0 48-21.491 48-48s-21.491-48-48-48-48 21.491-48 48 21.491 48 48 48"
          />
        </g>
      </svg> */}
      <svg width="129" height="19" viewBox="0 0 129 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill={theme.palette.mode === 'light' ? "black" : "white"} //fill="#454F5B" 
          d="M2.948 12.468C2.94 13.172 3.052 13.796 3.284 14.34C3.516 14.884 3.86 15.312 4.316 15.624C4.772 15.928 5.336 16.08 6.008 16.08C6.696 16.08 7.292 15.928 7.796 15.624C8.308 15.312 8.648 14.84 8.816 14.208H11.492C11.348 15.072 11.004 15.804 10.46 16.404C9.916 17.004 9.256 17.46 8.48 17.772C7.712 18.084 6.912 18.24 6.08 18.24C4.88 18.24 3.824 17.988 2.912 17.484C2.008 16.972 1.3 16.244 0.788 15.3C0.284 14.356 0.032 13.232 0.032 11.928C0.032 10.656 0.264 9.528 0.728 8.544C1.192 7.552 1.86 6.772 2.732 6.204C3.612 5.636 4.668 5.352 5.9 5.352C7.124 5.352 8.152 5.612 8.984 6.132C9.824 6.652 10.456 7.38 10.88 8.316C11.312 9.244 11.528 10.332 11.528 11.58V12.468H2.948ZM2.948 10.656H8.768C8.768 10.056 8.664 9.516 8.456 9.036C8.248 8.548 7.928 8.164 7.496 7.884C7.072 7.596 6.536 7.452 5.888 7.452C5.248 7.452 4.708 7.608 4.268 7.92C3.828 8.232 3.496 8.636 3.272 9.132C3.048 9.62 2.94 10.128 2.948 10.656ZM18.7978 18.24C17.1578 18.24 15.8698 17.676 14.9338 16.548C13.9978 15.42 13.5298 13.816 13.5298 11.736C13.5298 10.44 13.7178 9.316 14.0938 8.364C14.4778 7.404 15.0378 6.664 15.7738 6.144C16.5178 5.616 17.4378 5.352 18.5338 5.352C19.0458 5.352 19.5098 5.416 19.9258 5.544C20.3498 5.664 20.7258 5.824 21.0538 6.024C21.3818 6.224 21.6578 6.444 21.8818 6.684C22.1138 6.924 22.2938 7.164 22.4218 7.404V0.167999H25.3498V18H23.1898L22.8658 15.456C22.7698 15.752 22.6258 16.064 22.4338 16.392C22.2498 16.712 21.9978 17.012 21.6778 17.292C21.3658 17.572 20.9738 17.8 20.5018 17.976C20.0298 18.152 19.4618 18.24 18.7978 18.24ZM19.3978 16.092C20.4458 16.092 21.2098 15.752 21.6898 15.072C22.1778 14.384 22.4218 13.248 22.4218 11.664C22.4138 10.76 22.3018 10 22.0858 9.384C21.8778 8.768 21.5538 8.304 21.1138 7.992C20.6818 7.68 20.1218 7.524 19.4338 7.524C18.5538 7.524 17.8298 7.848 17.2618 8.496C16.6938 9.144 16.4098 10.2 16.4098 11.664C16.4098 13.12 16.6698 14.224 17.1898 14.976C17.7098 15.72 18.4458 16.092 19.3978 16.092ZM33.2238 18.24C32.6158 18.24 32.0278 18.152 31.4598 17.976C30.8998 17.792 30.3958 17.528 29.9478 17.184C29.4998 16.832 29.1438 16.4 28.8798 15.888C28.6158 15.376 28.4838 14.78 28.4838 14.1V5.592H31.4118V13.764C31.4118 14.436 31.6238 14.988 32.0478 15.42C32.4798 15.852 33.1278 16.068 33.9918 16.068C34.7758 16.068 35.4038 15.864 35.8758 15.456C36.3478 15.04 36.5838 14.444 36.5838 13.668V5.592H39.4878V18H37.2438L36.9198 15.576C36.7678 16.256 36.4998 16.792 36.1158 17.184C35.7398 17.568 35.2958 17.84 34.7838 18C34.2798 18.16 33.7598 18.24 33.2238 18.24Z" />
        <path d="M50.2771 0.407999C51.6531 0.407999 52.8851 0.679999 53.9731 1.224C55.0611 1.76 55.9411 2.508 56.6131 3.468C57.2851 4.42 57.6851 5.52 57.8131 6.768H52.9411C52.8531 6.232 52.6891 5.768 52.4491 5.376C52.2091 4.984 51.8931 4.684 51.5011 4.476C51.1171 4.26 50.6571 4.152 50.1211 4.152C49.5371 4.152 49.0171 4.304 48.5611 4.608C48.1051 4.912 47.7451 5.432 47.4811 6.168C47.2251 6.896 47.0971 7.896 47.0971 9.168C47.0971 11.096 47.3811 12.468 47.9491 13.284C48.5171 14.092 49.2411 14.496 50.1211 14.496C50.6571 14.496 51.1171 14.36 51.5011 14.088C51.8931 13.816 52.2091 13.456 52.4491 13.008C52.6891 12.552 52.8531 12.056 52.9411 11.52H57.8131C57.6931 12.416 57.4891 13.268 57.2011 14.076C56.9211 14.884 56.5011 15.604 55.9411 16.236C55.3891 16.86 54.6531 17.352 53.7331 17.712C52.8131 18.064 51.6611 18.24 50.2771 18.24C48.6051 18.24 47.1451 17.844 45.8971 17.052C44.6571 16.26 43.6931 15.176 43.0051 13.8C42.3171 12.424 41.9731 10.856 41.9731 9.096C41.9731 7.336 42.3131 5.808 42.9931 4.512C43.6731 3.208 44.6331 2.2 45.8731 1.488C47.1211 0.767999 48.5891 0.407999 50.2771 0.407999ZM68.2799 18.24C66.5599 18.24 65.0679 17.876 63.8039 17.148C62.5479 16.412 61.5759 15.38 60.8879 14.052C60.1999 12.724 59.8559 11.16 59.8559 9.36C59.8559 7.552 60.2039 5.98 60.8999 4.644C61.6039 3.3 62.5879 2.26 63.8519 1.524C65.1159 0.779999 66.5919 0.407999 68.2799 0.407999C69.9599 0.407999 71.4279 0.779999 72.6839 1.524C73.9399 2.26 74.9159 3.3 75.6119 4.644C76.3079 5.98 76.6559 7.552 76.6559 9.36C76.6559 11.152 76.3119 12.716 75.6239 14.052C74.9439 15.38 73.9759 16.412 72.7199 17.148C71.4639 17.876 69.9839 18.24 68.2799 18.24ZM68.2799 14.496C68.9199 14.496 69.4879 14.336 69.9839 14.016C70.4879 13.688 70.8799 13.156 71.1599 12.42C71.4479 11.676 71.5919 10.68 71.5919 9.432C71.5919 8.144 71.4479 7.116 71.1599 6.348C70.8799 5.572 70.4879 5.012 69.9839 4.668C69.4879 4.324 68.9199 4.152 68.2799 4.152C67.6399 4.152 67.0679 4.324 66.5639 4.668C66.0679 5.012 65.6759 5.572 65.3879 6.348C65.0999 7.116 64.9559 8.144 64.9559 9.432C64.9559 10.68 65.0999 11.676 65.3879 12.42C65.6759 13.156 66.0679 13.688 66.5639 14.016C67.0679 14.336 67.6399 14.496 68.2799 14.496Z" fill="#FF4842" />
        <path d="M79.2997 18V0.647999H86.2357C88.6597 0.647999 90.4237 1.044 91.5277 1.836C92.6397 2.62 93.1957 3.752 93.1957 5.232C93.1957 6.032 92.9957 6.74 92.5957 7.356C92.1957 7.972 91.4597 8.544 90.3877 9.072C91.1477 9.296 91.7437 9.58 92.1757 9.924C92.6157 10.268 92.9357 10.636 93.1357 11.028C93.3357 11.42 93.4637 11.812 93.5197 12.204C93.5757 12.588 93.6037 12.944 93.6037 13.272C93.6037 14.888 93.0677 16.08 91.9957 16.848C90.9317 17.616 89.1397 18 86.6197 18H79.2997ZM83.9677 14.496H86.7877C87.4757 14.496 87.9917 14.312 88.3357 13.944C88.6797 13.568 88.8517 13.152 88.8517 12.696C88.8517 12.376 88.7717 12.092 88.6117 11.844C88.4517 11.588 88.2237 11.388 87.9277 11.244C87.6397 11.092 87.2997 11.016 86.9077 11.016H83.9677V14.496ZM83.9677 7.416H86.9077C87.1877 7.416 87.4357 7.376 87.6517 7.296C87.8757 7.216 88.0637 7.108 88.2157 6.972C88.3757 6.828 88.4957 6.66 88.5757 6.468C88.6637 6.268 88.7077 6.056 88.7077 5.832C88.7077 5.312 88.5157 4.904 88.1317 4.608C87.7557 4.304 87.2917 4.152 86.7397 4.152H83.9677V7.416ZM103.858 18.24C102.138 18.24 100.646 17.876 99.3821 17.148C98.1261 16.412 97.1541 15.38 96.4661 14.052C95.7781 12.724 95.4341 11.16 95.4341 9.36C95.4341 7.552 95.7821 5.98 96.4781 4.644C97.1821 3.3 98.1661 2.26 99.4301 1.524C100.694 0.779999 102.17 0.407999 103.858 0.407999C105.538 0.407999 107.006 0.779999 108.262 1.524C109.518 2.26 110.494 3.3 111.19 4.644C111.886 5.98 112.234 7.552 112.234 9.36C112.234 11.152 111.89 12.716 111.202 14.052C110.522 15.38 109.554 16.412 108.298 17.148C107.042 17.876 105.562 18.24 103.858 18.24ZM103.858 14.496C104.498 14.496 105.066 14.336 105.562 14.016C106.066 13.688 106.458 13.156 106.738 12.42C107.026 11.676 107.17 10.68 107.17 9.432C107.17 8.144 107.026 7.116 106.738 6.348C106.458 5.572 106.066 5.012 105.562 4.668C105.066 4.324 104.498 4.152 103.858 4.152C103.218 4.152 102.646 4.324 102.142 4.668C101.646 5.012 101.254 5.572 100.966 6.348C100.678 7.116 100.534 8.144 100.534 9.432C100.534 10.68 100.678 11.676 100.966 12.42C101.254 13.156 101.646 13.688 102.142 14.016C102.646 14.336 103.218 14.496 103.858 14.496ZM113.618 4.752V0.647999H128.186V4.752H123.218V18H118.538V4.752H113.618Z" fill="#1890FF" />
      </svg>
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <NextLink href="/">{logo}</NextLink>;
});

export default Logo;
