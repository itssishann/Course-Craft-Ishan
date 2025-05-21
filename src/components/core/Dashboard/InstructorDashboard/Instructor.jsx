import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import { getInstructorData } from "../../../../services/operations/profileAPI";
import InstructorChart from "../InstructorDashboard/InstructorChart";

// Import icons from react-icons
import { FaChalkboardTeacher, FaUsers, FaRupeeSign } from "react-icons/fa";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { ImStatsBars } from "react-icons/im";

export default function Instructor() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const [instructorData, setInstructorData] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const instructorApiData = await getInstructorData(token);
      const result = await fetchInstructorCourses(token);
      if (instructorApiData.length) setInstructorData(instructorApiData);
      if (result) setCourses(result);
      setLoading(false);
    })();
  }, [token]);

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  );

  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  );

  return (
    <div className="px-4 py-6 md:px-8 lg:px-16">
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl font-bold text-richblack-50 flex items-center gap-2">
          <FaChalkboardTeacher />
          Welcome, {user?.firstName} 👋
        </h1>
        <p className="text-richblack-25">Ready to inspire the next generation?</p>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader"></div>
        </div>
      ) : courses.length > 0 ? (
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="bg-white shadow-lg rounded-lg p-6">
            {totalAmount > 0 || totalStudents > 0 ? (
              <InstructorChart courses={instructorData} />
            ) : (
              <div className="flex flex-col items-center">
                <ImStatsBars className="text-4xl text-gray-600" />
                <p className="text-lg font-bold text-gray-800">Visualize</p>
                <p className="mt-4 text-gray-500">Not Enough Data To Visualize</p>
              </div>
            )}
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <ImStatsBars /> Statistics
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaChalkboardTeacher className="text-xl text-gray-600" />
                <div>
                  <p className="text-gray-600">Total Courses</p>
                  <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaUsers className="text-xl text-gray-600" />
                <div>
                  <p className="text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaRupeeSign className="text-xl text-gray-600" />
                <div>
                  <p className="text-gray-600">Total Income</p>
                  <p className="text-2xl font-bold text-gray-900">Rs. {totalAmount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center py-20 bg-white shadow-lg rounded-lg">
          <MdOutlineCreateNewFolder className="text-4xl text-gray-600" />
          <p className="text-2xl font-bold text-gray-900">
            You have not created any courses yet
          </p>
          <Link
            to="/dashboard/add-course"
            className="mt-4 text-blue-600 font-semibold flex items-center gap-2"
          >
            <MdOutlineCreateNewFolder />
            Create a Course
          </Link>
        </div>
      )}
    </div>
  );
}
