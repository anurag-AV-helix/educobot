// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Stack } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
import CourseCards from '../../MyComponents/Dashboard/CourseCards';
import RewardsComponent from '../../MyComponents/Dashboard/RewardsComponent';


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
                <CourseCards/>
                <RewardsComponent/>
        </Page>
    );
}
