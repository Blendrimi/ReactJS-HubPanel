import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePageLayout from "./components/layout/HomePageLayout";
import AudiencePage from "./pages/AudiencePage";
import InnerLayoutStyle2 from "./components/layout/InnerLayoutStyle2";
import { useAppSelector } from "./redux/hooks";
import InnerLayoutStyle1 from "./components/layout/InnerLayoutStyle1";
import InnerLayoutStyle3 from "./components/layout/InnerLayoutStyle3";
import CompanyPage from "./pages/CompanyPage";
import TaskPage from "./pages/TaskPage";
import LeadsPage from "./pages/LeadsPage";
import CustomerPage from "./pages/CustomerPage";
import EditCustomerPage from "./pages/EditCustomerPage";
import AddEmployeePage from "./pages/AddEmployeePage";
import AllEmployeePage from "./pages/AllEmployeePage";
import AttendancePage from "./pages/AttendancePage";
import AllCustomerPage from "./pages/AllCustomerPage";
import AddNewProductPage from "./pages/AddNewProductPage";
import AllProductPage from "./pages/AllProductPage";
import CategoryPage from "./pages/CategoryPage";
import OrderListPage from "./pages/OrderListPage";
import CalenderPage from "./pages/CalenderPage";
import ChatPage from "./pages/ChatPage";
import EmailPage from "./pages/EmailPage";
import CardDeclinedPage from "./pages/CardDeclinedPage";
import PromotionPage from "./pages/PromotionPage";
import SubscriptionConfirm from "./pages/SubscriptionConfirm";
import WelcomeMailPage from "./pages/WelcomeMailPage";
import ResetPasswordMailPage from "./pages/ResetPasswordMailPage";
import InvoicePage from "./pages/InvoicePage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import LoginPage2 from "./pages/LoginPage2";
import LoginPage3 from "./pages/LoginPage3";
import LoginStatusPage from "./pages/LoginStatusPage";
import RegistrationPage from "./pages/RegistrationPage";
import RegistrationPage2 from "./pages/RegistrationPage2";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import UpdatePasswordPage from "./pages/UpdatePasswordPage";
import AccountDeactivatedPage from "./pages/AccountDeactivatedPage";
import WelcomePage from "./pages/WelcomePage";
import EmailVerifyPage from "./pages/EmailVerifyPage";
import TwoFactorPage from "./pages/TwoFactorPage";
import MultiStepAuthPage from "./pages/MultiStepAuthPage";
import ErrorLayout from "./components/layout/ErrorLayout";
import Error400Page from "./pages/Error400Page";
import Error403Page from "./pages/Error403Page";
import Error404Page from "./pages/Error404Page";
import Error408Page from "./pages/Error408Page";
import Error500Page from "./pages/Error500Page";
import Error503Page from "./pages/Error503Page";
import Error504Page from "./pages/Error504Page";
import ViewProfilePage from "./pages/ViewProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import ComingSoonPage from "./pages/ComingSoonPage";
import ComingSoonPage2 from "./pages/ComingSoonPage2";
import PricingTablePage from "./pages/PricingTablePage";
import PricingTablePage2 from "./pages/PricingTablePage2";
import UnderConstructionPage from "./pages/UnderConstructionPage";
import UtilityPage from "./pages/UtilityPage";
import SweetAlertPage from "./pages/SweetAlertPage";
import NestableListPage from "./pages/NestableListPage";
import AnimationPage from "./pages/AnimationPage";
import SwiperSliderPage from "./pages/SwiperSliderPage";
import FormPage from "./pages/FormPage";
import TablePage from "./pages/TablePage";
import ChartPage from "./pages/ChartPage";
import IconPage from "./pages/IconPage";
import MapPage from "./pages/MapPage";
import FileManagerPage from "./pages/FileManagerPage";
import DeliveryPage from "./pages/DeliveryPage";
import IndexPage from "./pages/IndexPage";
import LogisticPage from "./pages/LogisticPage";
import CreateCustomerPage from "./pages/CreateCustomerPage";
import CreateOrderPage from "./pages/CreateOrderPage";
import EditOrderPage from "./pages/EditOrderPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import EditProductPage from "./pages/EditProductPage";
import CreateProductPage from "./pages/CreateProductPage";
import AllVehiclesPage from "./pages/AllVehiclesPage";
import CreateVehiclePage from "./pages/CreateVehiclePage";
import EditVehiclePage from "./pages/EditVehiclePage";

function App() {
  const activeLayout = useAppSelector((state) => state.layout.isLayout);
  return (
    <Router>
      <Routes>
        <Route element={<HomePageLayout />}>
          <Route
            element={
              activeLayout === "style-1" ? (
                <InnerLayoutStyle1 />
              ) : activeLayout === "style-2" ? (
                <InnerLayoutStyle2 />
              ) : activeLayout === "style-3" ? (
                <InnerLayoutStyle3 />
              ) : (
                <></>
              )
            }
          >
            <Route path="/" element={<IndexPage />} />
            <Route path="/delivery" element={<DeliveryPage />} />
            <Route path="/logistics" element={<LogisticPage />} />

            <Route path="/audience" element={<AudiencePage />} />
            <Route path="/company" element={<CompanyPage />} />
            <Route path="/task" element={<TaskPage />} />
            <Route path="/leads" element={<LeadsPage />} />
            <Route path="/customer" element={<CustomerPage />} />
            <Route path="/create-customer" element={<CreateCustomerPage />} />

            <Route path="/edit-customer/:id" element={<EditCustomerPage />} />
            <Route path="/add-employee" element={<AddEmployeePage />} />
            <Route path="/all-employee" element={<AllEmployeePage />} />
            <Route path="/attendance" element={<AttendancePage />} />
            <Route path="/all-customer" element={<AllCustomerPage />} />
            <Route path="/vehicle" element={<AllVehiclesPage />} />
            <Route path="/create-vehicle" element={<CreateVehiclePage />} />
            <Route path="/edit-vehicle/:id" element={<EditVehiclePage />} />
            <Route path="/add-product" element={<AddNewProductPage />} />
            <Route path="/edit-product/:id" element={<EditProductPage />} />
            <Route path="/create-product" element={<CreateProductPage />} />

            <Route path="/all-product" element={<AllProductPage />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/order" element={<OrderListPage />} />
            <Route path="/create-order" element={<CreateOrderPage />} />
            <Route path="/edit-order/:id" element={<EditOrderPage />} />
            <Route path="/order-details/:id" element={<OrderDetailsPage />} />

            <Route path="/calendar" element={<CalenderPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/email" element={<EmailPage />} />
            <Route path="/invoices" element={<InvoicePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/view-profile" element={<ViewProfilePage />} />
            <Route path="/edit-profile" element={<EditProfilePage />} />
            <Route path="/utility" element={<UtilityPage />} />
            <Route path="/sweet-alert" element={<SweetAlertPage />} />
            <Route path="/nestable-list" element={<NestableListPage />} />
            <Route path="/animation" element={<AnimationPage />} />
            <Route path="/swiper-slider" element={<SwiperSliderPage />} />
            <Route path="/form" element={<FormPage />} />
            <Route path="/table" element={<TablePage />} />
            <Route path="/charts" element={<ChartPage />} />
            <Route path="/icon" element={<IconPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/file-manager" element={<FileManagerPage />} />
          </Route>
        </Route>
        <Route path="/card-declined" element={<CardDeclinedPage />} />
        <Route path="/promotion" element={<PromotionPage />} />
        <Route path="/subscription-confirm" element={<SubscriptionConfirm />} />
        <Route path="/welcome-mail" element={<WelcomeMailPage />} />
        <Route
          path="/reset-password-mail"
          element={<ResetPasswordMailPage />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login-2" element={<LoginPage2 />} />
        <Route path="/login-3" element={<LoginPage3 />} />
        <Route path="/login-status" element={<LoginStatusPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/registration-2" element={<RegistrationPage2 />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/update-password" element={<UpdatePasswordPage />} />
        <Route
          path="/account-deactivated"
          element={<AccountDeactivatedPage />}
        />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/email-verify" element={<EmailVerifyPage />} />
        <Route path="/two-factor" element={<TwoFactorPage />} />
        <Route path="/multi-step-signup" element={<MultiStepAuthPage />} />
        <Route element={<ErrorLayout />}>
          <Route path="/error-400" element={<Error400Page />} />
          <Route path="/error-403" element={<Error403Page />} />
          <Route path="/error-404" element={<Error404Page />} />
          <Route path="/error-408" element={<Error408Page />} />
          <Route path="/error-500" element={<Error500Page />} />
          <Route path="/error-503" element={<Error503Page />} />
          <Route path="/error-504" element={<Error504Page />} />
        </Route>
        <Route path="/coming-soon" element={<ComingSoonPage />} />
        <Route path="/coming-soon-2" element={<ComingSoonPage2 />} />
        <Route path="/pricing-table" element={<PricingTablePage />} />
        <Route path="/pricing-table-2" element={<PricingTablePage2 />} />
        <Route path="/under-construction" element={<UnderConstructionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
