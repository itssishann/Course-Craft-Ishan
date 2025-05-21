import { ACCOUNT_TYPE } from "../utils/constants";

export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
  },
  {
    id: 2,
    name: "Dashboard",
    path: "/dashboard/instructor",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscDashboard",
  },
  {
    id: 3,
    name: "My Courses",
    path: "/dashboard/my-courses",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscVm",
  },
  {
    id: 4,
    name: "Add Course",
    path: "/dashboard/add-course",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscAdd",
  },
  {
    id: 5,
    name: "Enrolled Courses",
    path: "/dashboard/enrolled-courses",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "VscMortarBoard",
  },
  {
    id: 6,
    name: "Your Cart",
    path: "/dashboard/cart",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "VscHistory",
  },

  // Admin tabs
  {
    id: 7,
    name: "Admin Stats",
    path: "/dashboard/stats",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscGraph", // for stats or overview
  },
  {
    id: 8,
    name: "Users",
    path: "/dashboard/admin/users",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscBroadcast", // for users (students & instructors)
  },
  {
    id: 9,
    name: "Courses",
    path: "/dashboard/admin/courses",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscLibrary", // for course management
  },
];
