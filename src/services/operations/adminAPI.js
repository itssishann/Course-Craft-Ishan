import axios from "axios";
import { toast } from "react-hot-toast";
import { adminEndPoints } from "../apis";

const {
  ADMIN_GET_INSTRUCTORS_API,
  ADMIN_GET_STUDENTS_API,
  ADMIN_GET_COURSES_API,
  ADMIN_GET_STATS_API,
  ADMIN_APPROVE_INSTRUCTOR_API,
  ADMIN_UPDATE_COURSE_API,
  ADMIN_DELETE_COURSE_API,
} = adminEndPoints;

const getAuthHeader = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Fetch all instructors
export async function fetchAllInstructors() {
  const toastId = toast.loading("Loading instructors...");
  try {
    const response = await axios.get(ADMIN_GET_INSTRUCTORS_API, getAuthHeader());
    toast.success("Instructors loaded");
    return response.data.instructors;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    return null;
  } finally {
    toast.dismiss(toastId);
  }
}

// Fetch all students
export async function fetchAllStudents() {
  const toastId = toast.loading("Loading students...");
  try {
    const response = await axios.get(ADMIN_GET_STUDENTS_API, getAuthHeader());
    toast.success("Students loaded");
    return response.data.students;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    return null;
  } finally {
    toast.dismiss(toastId);
  }
}

// Fetch all courses
export async function fetchAllCourses() {
  const toastId = toast.loading("Loading courses...");
  try {
    const response = await axios.get(ADMIN_GET_COURSES_API, getAuthHeader());
    toast.success("Courses loaded");
    return response.data.courses;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    return null;
  } finally {
    toast.dismiss(toastId);
  }
}

// Fetch platform stats
export async function fetchPlatformStats() {
  const toastId = toast.loading("Loading stats...");
  try {
    const response = await axios.get(ADMIN_GET_STATS_API, getAuthHeader());
    toast.success("Stats loaded");
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    return null;
  } finally {
    toast.dismiss(toastId);
  }
}

// Approve instructor
export async function approveInstructor(instructorId) {
  const toastId = toast.loading("Approving instructor...");
  try {
    const response = await axios.put(
      ADMIN_APPROVE_INSTRUCTOR_API.replace(":instructorId", instructorId),
      null,
      getAuthHeader()
    );
    toast.success("Instructor approved");
    return true;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    return false;
  } finally {
    toast.dismiss(toastId);
  }
}

// Update course
export async function updateCourse(courseId, name, price) {
  const toastId = toast.loading("Updating course...");
  try {
    const response = await axios.put(
      ADMIN_UPDATE_COURSE_API,
      { courseId, name, price },
      getAuthHeader()
    );
    toast.success("Course updated");
    return response.data.course;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    return null;
  } finally {
    toast.dismiss(toastId);
  }
}

// Delete course
export async function deleteCourse(courseId) {
  const toastId = toast.loading("Deleting course...");
  try {
    const response = await axios.delete(
      ADMIN_DELETE_COURSE_API.replace(":courseId", courseId),
      getAuthHeader()
    );
    toast.success("Course deleted");
    return true;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    return false;
  } finally {
    toast.dismiss(toastId);
  }
}
