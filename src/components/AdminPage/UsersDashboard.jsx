import React, { useEffect, useState } from "react";
import {
  fetchPlatformStats,
  fetchAllInstructors,
  fetchAllStudents,
  approveInstructor,
} from "../../services/operations/adminAPI";
import {
  FaUserTie,
  FaUserGraduate,
  FaBookOpen,
  FaRupeeSign,
  FaTachometerAlt,
  FaUsers,
  FaChalkboardTeacher,
  FaUserClock,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { IoMdCheckboxOutline } from "react-icons/io";
export default function UserDashboard() {
  const [stats, setStats] = useState([]);
  const [recentInstructors, setRecentInstructors] = useState([]);
  const [recentStudents, setRecentStudents] = useState([]);
  const [approvedInstructors, setApprovedInstructors] = useState([]);
  const [pendingInstructors, setPendingInstructors] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("dashboard");
  const [showApprovalPopup, setShowApprovalPopup] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [approving, setApproving] = useState(false);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const response = await fetchPlatformStats();
        if (response?.success && response.data?.stats) {
          setStats(response.data.stats);
          setRecentInstructors(response.data.recentInstructors || []);
          setRecentStudents(response.data.recentStudents || []);
        } else {
          setStats(null);
        }
      } catch (err) {
        console.error("Stats fetch failed", err);
        setStats(null);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const loadAllUsers = async () => {
    try {
      const [students, instructorsRes] = await Promise.all([
        fetchAllStudents(),
        fetchAllInstructors(),
      ]);
      setAllStudents(students || []);
      setApprovedInstructors(instructorsRes.approvedInstructors || []);
      setPendingInstructors(instructorsRes.pendingInstructors || []);
    } catch (err) {
      console.error("Failed to load users", err);
    }
  };

  useEffect(() => {
    if (tab === "users") {
      loadAllUsers();
    }
  }, [tab]);

  const handleApproveInstructor = async () => {
    if (!selectedInstructor) return;

    try {
      setApproving(true);
      const res = await approveInstructor(selectedInstructor._id);
      if (res?.success) {
        toast.success("Instructor approved successfully!");
        setPendingInstructors((prev) =>
          prev.filter((i) => i._id !== selectedInstructor._id)
        );
        setApprovedInstructors((prev) => [...prev, selectedInstructor]);
      } else {
        toast.error("Failed to approve instructor.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error approving instructor.");
    } finally {
      setApproving(false);
      setShowApprovalPopup(false);
      setSelectedInstructor(null);
    }
  };

  if (loading) {
    return <p className="text-yellow-50 text-center">Loading data...</p>;
  }

  if (!stats || Object.keys(stats).length === 0) {
    return <p className="text-red-500 text-center">Unable to load stats</p>;
  }

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-4xl font-bold text-yellow-50 mb-10">Admin Dashboard</h1>

      <div className="mb-6 flex gap-4 text-yellow-50 font-semibold">
        <button
          onClick={() => setTab("dashboard")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
            tab === "dashboard" ? "bg-yellow-500 text-black" : "bg-richblack-800"
          }`}
        >
          <FaTachometerAlt />
          Overview
        </button>
        <button
          onClick={() => setTab("users")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
            tab === "users" ? "bg-yellow-500 text-black" : "bg-richblack-800"
          }`}
        >
          <FaUsers />
          All Users
        </button>
      </div>

      {tab === "dashboard" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={<FaUserTie size={28} />} label="Instructors" value={stats.totalInstructors || 0} />
            <StatCard icon={<FaUserGraduate size={28} />} label="Students" value={stats.totalStudents || 0} />
            <StatCard icon={<FaBookOpen size={28} />} label="Courses" value={stats.totalCourses || 0} />
            <StatCard icon={<FaRupeeSign size={28} />} label="Revenue" value={`₹ ${stats.totalRevenue || 0}`} />
          </div>

          <Section title="Recent Instructors" users={recentInstructors} showProgress={false} />
          <Section title="Recent Students" users={recentStudents} showProgress={true} />
        </>
      )}

      {tab === "users" && (
        <>
          <UserTable title="Approved Instructors" users={approvedInstructors} showApproveButton={false} />
          <UserTable
            title="Pending Instructors"
            users={pendingInstructors}
            showApproveButton={true}
            onApproveClick={(user) => {
              setSelectedInstructor(user);
              setShowApprovalPopup(true);
            }}
          />
          <UserTable title="All Students" users={allStudents} showApproveButton={false} />
        </>
      )}

      {showApprovalPopup && selectedInstructor && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-richblack-900 p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-semibold text-yellow-50 mb-4">Approve Instructor</h2>
            <p className="text-richblack-200 mb-4">
              Are you sure you want to approve {" "}
              <span className="font-bold">{selectedInstructor.firstName}</span>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowApprovalPopup(false);
                  setSelectedInstructor(null);
                }}
                className="bg-richblack-700 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleApproveInstructor}
                disabled={approving}
                className="bg-yellow-500 px-4 py-2 rounded text-black font-semibold"
              >
                {approving ? "Approving..." : "Approve"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-richblack-900 text-yellow-50 p-5 rounded-2xl shadow-lg flex items-center gap-4">
      <div className="bg-richblack-800 p-3 rounded-full">{icon}</div>
      <div>
        <h3 className="text-sm font-medium text-richblack-200">{label}</h3>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
    </div>
  );
}

function Section({ title, users, showProgress }) {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold text-yellow-50 mb-4 flex items-center gap-2">
        {title.includes("Instructor") ? <FaChalkboardTeacher /> : <FaUserClock />}
        {title}
      </h2>
      {users.length === 0 ? (
        <p className="text-richblack-300">No data available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div key={user._id} className="bg-richblack-800 p-4 rounded-lg flex items-center gap-4 shadow-md">
              <img
                src={user.image || "/default-avatar.png"}
                alt="profile"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="text-lg text-richblack-100 font-medium">
                  {user.firstName || user.email || "Unnamed"}
                </p>
                <p className="text-sm text-richblack-300">{user.email}</p>
                {showProgress && user.progress !== undefined && (
                  <p className="text-sm text-blue-300 mt-1">
                    Progress: {user.progress.toFixed(0)}%
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function UserTable({ title, users, showApproveButton = false, onApproveClick }) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl text-yellow-50 font-semibold mb-4">{title}</h2>
      {users.length === 0 ? (
        <p className="text-richblack-300">No users available for approval</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-richblack-900 text-yellow-50 border border-richblack-700">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b border-richblack-700">Name</th>
                <th className="px-4 py-2 border-b border-richblack-700">Email</th>
                {showApproveButton && <th className="px-4 py-2 border-b border-richblack-700">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-4 py-2 border-b border-richblack-700 flex items-center gap-2">
                    {user.firstName} {user.lastName}
                    {!showApproveButton && <IoMdCheckboxOutline className="text-caribbeangreen-100" />}
                  </td>
                  <td className="px-4 py-2 border-b border-richblack-700">{user.email}</td>
                  {showApproveButton && (
                    <td className="px-4 py-2 border-b border-richblack-700">
                      <button
                        onClick={() => onApproveClick(user)}
                        className="bg-yellow-500 text-black px-3 py-1 rounded font-medium"
                      >
                        Approve
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
