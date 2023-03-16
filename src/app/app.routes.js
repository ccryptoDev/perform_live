/** All routes of the app are imported here, routes are defined in their respective folders */

/** Primary Routes */
import LoginRoutes from 'app/screens/login/login.routes';
import SignupRoutes from 'app/screens/signup/signup.routes';
import ForgotRoutes from 'app/screens/forgotPasswordForms/forgotPasswordForms.routes';
import ConfirmPassword from 'app/screens/confirmPassword/confirmPassword.routes';
import Home from 'app/screens/home/home.routes';
import PerformAgora from 'app/screens/performAgora/performAgora.routes';
// import PerformerLive from 'app/screens/performAgora/screens/performerLive/performerLive.routes';
import PerformanceScheduler from './screens/performanceScheduler/performanceScheduler.routes';
import ProductManagement from './screens/productManagement/productManagement.routes';
import Sales from './screens/sales/sales.routes';
import Profile from './screens/profile/profile.routes';
import ProfilePerformances from './screens/profile/profilePerformances.routes';
import OtherProfile from './screens/otherProfile/otherProfile.routes';
import Privacy from './screens/privacy/privacy.routes';
import Faq from './screens/faq/faq.routes';
import Verificataion from './screens/verification/verification.routes';
import Products from './screens/products/products.routes';
import PayoutAccount from './screens/payoutAccount/payoutAccount.routes';
import Settings from './screens/settings/settings.routes';
import PaymentShipping from './screens/paymentShipping/paymentShipping.routes';
import FinishPerformance from './screens/finishPerformance/finishPerformance.routes';
import Analytics from './screens/analytics/analytics.routes';
import ShipingFrom from './screens/shippingFrom/shippingFrom.routes';
import UserAgreement from './screens/userAgreement/userAgreement.routes';
import PerformerInfo from './screens/performerInfo/performerInfo.routes';
import AgoraRecording from './screens/agoraRecording/agoraRecording.routes';
import MyEarnings from './screens/myEarnings/myEarnings.routes';
import Purchase from './screens/purchase/purchase.routes';
import PurchaseDetails from './screens/purchaseDetails/purchaseDetails.routes';
import SalesDetails from './screens/salesDetails/salesDetails.routes';
import Favorites from './screens/favorites/favorites.routes';

export const routeMap = [
  ...SignupRoutes,
  ...ForgotRoutes,
  ...ConfirmPassword,
  ...LoginRoutes,
  ...Home,
  ...PerformAgora,
  ...PerformanceScheduler,
  ...ProductManagement,
  ...Sales,
  ...Profile,
  ...ProfilePerformances,
  ...OtherProfile,
  ...Privacy,
  ...Faq,
  ...Products,
  ...PayoutAccount,
  ...Settings,
  ...PerformerInfo,
  ...PaymentShipping,
  ...FinishPerformance,
  ...Analytics,
  ...ShipingFrom,
  ...UserAgreement,
  ...AgoraRecording,
  ...MyEarnings,
  ...Purchase,
  ...PurchaseDetails,
  ...SalesDetails,
  ...Favorites,
  ...Verificataion,
  // ...PerformerLive,
];
