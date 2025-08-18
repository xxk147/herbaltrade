import TCM_PRODUCTS from '../pages/tcm-products.jsx';
import ADMIN_LOGIN from '../pages/admin-login.jsx';
import ADMIN_DASHBOARD from '../pages/admin-dashboard.jsx';
import ADMIN_PRODUCTS from '../pages/admin-products.jsx';
import INDEX from '../pages/index.jsx';
import TCM_ABOUT-US from '../pages/tcm-about-us.jsx';
import TCM_CONTACT-US from '../pages/tcm-contact-us.jsx';
import PRODUCT_INQUIRY from '../pages/product-inquiry.jsx';
import ADMIN_USERS from '../pages/admin-users.jsx';
import ADMIN_INQUIRIES from '../pages/admin-inquiries.jsx';
import ADMIN_SETTINGS from '../pages/admin-settings.jsx';
export const routers = [{
  id: "tcm-products",
  component: TCM_PRODUCTS
}, {
  id: "admin-login",
  component: ADMIN_LOGIN
}, {
  id: "admin-dashboard",
  component: ADMIN_DASHBOARD
}, {
  id: "admin-products",
  component: ADMIN_PRODUCTS
}, {
  id: "index",
  component: INDEX
}, {
  id: "tcm-about-us",
  component: TCM_ABOUT-US
}, {
  id: "tcm-contact-us",
  component: TCM_CONTACT-US
}, {
  id: "product-inquiry",
  component: PRODUCT_INQUIRY
}, {
  id: "admin-users",
  component: ADMIN_USERS
}, {
  id: "admin-inquiries",
  component: ADMIN_INQUIRIES
}, {
  id: "admin-settings",
  component: ADMIN_SETTINGS
}]