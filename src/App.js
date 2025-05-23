import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
// import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import OpenRoute from "./components/core/Auth/OpenRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import Contact from "./pages/Contact";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Error from "./pages/Error";
import Settings from "./components/core/Dashboard/Settings";
import { useDispatch, useSelector } from "react-redux";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import AddCourse from "./components/core/Dashboard/AddCourse";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";
import TestPage from "./TestPage";
import SupportPage from "./components/Support/SupportPage";
import { useEffect } from "react";
import Home from "./components/core/Home_Page/Home";
import AdminStats from "./components/AdminPage/AdminStats";
import AdminDashboard from "./components/AdminPage/AdminStats";
import UserDashboard from "./components/AdminPage/UsersDashboard";
import CourseDashboard from "./components/AdminPage/CourseDashboard";
import EnrolledStudents from "./components/AdminPage/EnrolledStudents";
import CreateCategory from "./components/AdminPage/CreateCategory";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector((state) => state.profile);
  // tawk io integration
  const isSupportPage = location.pathname === '/support';
  useEffect(() => {
    if (isSupportPage) {
      if (document.getElementById('tawk-script')) return;

      const script = document.createElement('script');
      script.id = 'tawk-script';
      script.async = true;
      script.src = 'https://embed.tawk.to/6818e962ee59f1190ddb07c5/1iqgkvamf';
      script.charset = 'UTF-8';
      script.setAttribute('crossorigin', '*');
      document.body.appendChild(script);
    } else {
      // Remove script if user leaves support page
      const tawk = document.getElementById('tawk-script');
      if (tawk) {
        tawk.remove();
        const iframe = document.querySelector('iframe[src*="tawk.to"]');
        if (iframe) iframe.remove();
      }
    }
  }, [location]);


  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="catalog/:catalogName" element={<Catalog />} />
        <Route path="courses/:courseId" element={<CourseDetails />} />

        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />

        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        <Route
          path="update-password/:token"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />

        <Route path="/contact" element={<Contact />} />

        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >

          <Route path="dashboard/my-profile" element={<MyProfile />} />
          {user?.accountType === ACCOUNT_TYPE.ADMIN && (
            <>
              <Route path="/dashboard/stats" element={<AdminStats />} />
              <Route path="/dashboard/settings" element={<CreateCategory />} />
              <Route path="/dashboard/users" element={<UserDashboard />} />
              <Route path="/dashboard/admin/enrolled-students/:courseId" element={<EnrolledStudents />} />
              <Route path="dashboard/admin/courses" element={<CourseDashboard />} />

            </>
          )}

          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="dashboard/cart" element={<Cart />} />
              <Route
                path="dashboard/enrolled-courses"
                element={<EnrolledCourses />}
              />
            </>
          )}

          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/instructor" element={<Instructor />} />
              <Route path="dashboard/add-course" element={<AddCourse />} />
              <Route path="dashboard/my-courses" element={<MyCourses />} />
              <Route
                path="dashboard/edit-course/:courseId"
                element={<EditCourse />}
              />
            </>
          )}
        </Route>

        <Route
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
            </>
          )}
        </Route>

        <Route path="*" element={<Error />} />
        <Route path="/support" element={<SupportPage />} />

        <Route path="/test" element={<TestPage />} />
      </Routes>
    </div>
  );
}

export default App;
