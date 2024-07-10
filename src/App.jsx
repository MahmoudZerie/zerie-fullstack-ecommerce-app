import {Routes,Route} from "react-router-dom"
import HomePage from "./pages"
import ProductsPage from "./pages/Products"
import AboutPage from "./pages/About"
import ProductPage from "./pages/Product"
import Navbar from "./layout/Navbar"
import LoginPage from "./pages/LogIn"
import AppLayout from "./layout/AppLayout"
import CookieService from "./services/CookieService"
import CartDrawer from "./components/CartDrawer"
import DashboardLayout from "./pages/dashboard/DashboardLayout"
import DashboardAdmin from "./pages/dashboard/DashboardAdmin"
import DashboardProducts from "./pages/dashboard/DashboardProducts"
const App=()=>{
  const token=CookieService.get("jwt");
  return(
    <>
    <CartDrawer/>
    <Routes>
      <Route path="/" element={<AppLayout/>}>
      <Route index element={<HomePage/>}/>
      <Route path="/products" element={<ProductsPage/>}/>
      <Route path="/about" element={<AboutPage/>}/>
      <Route path="/products/:id" element={<ProductPage/>}/>
      </Route>

      <Route path="/dashboard" element={<DashboardLayout/>}>
      <Route index element={<DashboardAdmin/>}/>
      <Route path="products" element={<DashboardProducts/>}/>
      <Route path="categories" element={<h2>categories Dashboard</h2>}/>

      </Route>
      <Route path="/login" element={<LoginPage isAuthenticated={token}/>}/>
    </Routes>
    </>
  )
}
export default App;