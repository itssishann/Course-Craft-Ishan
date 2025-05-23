// EnrolledStudents.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAllCourses } from "../../services/operations/adminAPI";

export default function EnrolledStudents() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourse = async () => {
      const allCourses = await fetchAllCourses();
      const course = allCourses.find((c) => c._id === courseId);
      if (course) {
        setCourseName(course.courseName);
        setStudents(course.studentsEnrolled || []);
      }
      setLoading(false);
    };

    loadCourse();
  }, [courseId]);

  return (
    <div className="p-6 md:p-10 text-yellow-50">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Students Enrolled in:</h1>
          <h2 className="text-2xl font-semibold mb-6">{courseName}</h2>
        </div>
        <button
          className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400"
          onClick={() => navigate(-1)}
        >
          Back to Dashboard
        </button>
      </div>

      {loading ? (
        <p>Loading students...</p>
      ) : students.length === 0 ? (
        <p>No students enrolled.</p>
      ) : (
        <table className="min-w-full bg-richblack-900 text-yellow-50 rounded">
          <thead className="bg-richblack-800">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id} className="border-t border-richblack-700">
                <td className="px-4 py-2">
                  {student.firstName} {student.lastName}
                </td>
                <td className="px-4 py-2">{student.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}