import TCM_PRODUCTS from '../pages/tcm-products.jsx';
import ADMIN_LOGIN from '../pages/admin-login.jsx';
import ADMIN_DASHBOARD from '../pages/admin-dashboard.jsx';
import ADMIN_PRODUCTS from '../pages/admin-products.jsx';
import INDEX from '../pages/index.jsx';
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
}]