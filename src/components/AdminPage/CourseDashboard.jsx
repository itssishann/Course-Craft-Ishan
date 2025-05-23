import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllCourses, updateCourse, deleteCourse } from "../../services/operations/adminAPI";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import Button from"../../components/common/IconBtn"
export default function CourseDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editCourseId, setEditCourseId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    setLoading(true);
    const data = await fetchAllCourses();
    if (data) setCourses(data);
    setLoading(false);
  };

  const handleEdit = (course) => {
    setEditCourseId(course._id);
    setEditName(course.courseName);
    setEditPrice(course.price);
  };

  const handleUpdate = async () => {
    const updated = await updateCourse(editCourseId, editName, editPrice);
    if (updated) {
      toast.success("Course updated!");
      setEditCourseId(null);
      loadCourses();
    }
  };

  const handleDelete = async (courseId) => {
    const confirmed = window.confirm("Are you sure you want to delete this course?");
    if (confirmed) {
      const success = await deleteCourse(courseId);
      if (success) {
        toast.success("Course deleted");
        loadCourses();
      }
    }
  };

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-4xl font-bold text-yellow-50 mb-10">Course Dashboard</h1>

      {loading ? (
        <p className="text-yellow-50 text-center">Loading courses...</p>
      ) : courses.length === 0 ? (
        <p className="text-red-500 text-center">No courses found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-richblack-900 text-yellow-50 text-sm rounded-xl overflow-hidden">
            <thead className="bg-richblack-800">
              <tr>
                <th className="px-4 py-3 text-left">Thumbnail</th>
                <th className="px-4 py-3 text-left">Course Name</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Instructor</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course._id} className="border-t border-richblack-700">
                  <td className="px-4 py-3">
                    {course.thumbnail ? (
                      <img
                        src={course.thumbnail}
                        alt="thumbnail"
                        className="w-20 h-12 object-cover rounded-md"
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {editCourseId === course._id ? (
                      <input
                        className="bg-richblack-700 px-2 py-1 rounded text-yellow-50"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                    ) : (
                      course.courseName
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {editCourseId === course._id ? (
                      <input
                        className="bg-richblack-700 px-2 py-1 rounded text-yellow-50"
                        type="number"
                        value={editPrice}
                        onChange={(e) => setEditPrice(e.target.value)}
                      />
                    ) : (
                      `₹ ${course.price}`
                    )}
                  </td>
                  <td className="px-4 py-3">{course.instructor?.firstName || "N/A"}</td>
                  <td className="px-4 py-3 flex gap-3 items-center flex-wrap">
                    {editCourseId === course._id ? (
                      <Button
                        onclick={handleUpdate}
                        className="bg-yellow-500 text-black px-3 py-1 rounded"
                      >
                        Save
                      </Button>
                    ) : (
                      <>
                        <FaEdit
                          size={18}
                          className="cursor-pointer text-blue-400"
                          onClick={() => handleEdit(course)}
                        />
                        <FaTrash
                          size={18}
                          className="cursor-pointer text-red-500"
                          onClick={() => handleDelete(course._id)}
                        />
                        <Button
                          onclick={() => navigate(`/dashboard/admin/enrolled-students/${course._id}`)}
                          className="text-sm bg-yellow-50 px-2 py-1 rounded text-black hover:bg-yellow-25"
                        >
                          View Students
                        </Button>
                        
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
