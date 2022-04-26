// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
};

const navConfig = [
  // Main
  // ----------------------------------------------------------------------
  {
    subheader: 'main',
    items: [
      { title: 'Dashboard', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
      { title: 'Reports', path: PATH_DASHBOARD.general.reports, icon: ICONS.analytics },
      { title: 'Library', path: PATH_DASHBOARD.general.library, icon: ICONS.banking },
    ],
  },

  // Account
  // ----------------------------------------------------------------------
  {
    subheader: 'account',
    items: [
      // USER
      { title: 'Profile', path: PATH_DASHBOARD.general.profile, icon: ICONS.user, },

      // SUBSCRIPTION
      { title: 'subscription', path: PATH_DASHBOARD.general.subscription, icon: ICONS.cart, },

      // INVOICE
      { title: 'invoice', path: PATH_DASHBOARD.general.invoice, icon: ICONS.invoice, },
    ],
  },

];

export default navConfig;
