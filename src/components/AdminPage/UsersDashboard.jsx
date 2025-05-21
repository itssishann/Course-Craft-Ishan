import React, { useEffect, useState } from "react";
import { fetchPlatformStats, fetchAllInstructors, fetchAllStudents } from "../../services/operations/adminAPI";
import {
  FaUserTie,
  FaUserGraduate,
  FaBookOpen,
  FaRupeeSign,
} from "react-icons/fa";

export default function UserDashboard() {
  const [stats, setStats] = useState([]);
  const [recentInstructors, setRecentInstructors] = useState([]);
  const [recentStudents, setRecentStudents] = useState([]);
  const [allInstructors, setAllInstructors] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("dashboard");

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
      const [students, instructors] = await Promise.all([
        fetchAllStudents(),
        fetchAllInstructors(),
      ]);
      setAllStudents(students?.students || []);
      setAllInstructors(instructors?.instructors || []);
    } catch (err) {
      console.error("Failed to load users", err);
    }
  };

  useEffect(() => {
    if (tab === "users") {
      loadAllUsers();
    }
  }, [tab]);

  if (loading) {
    return <p className="text-yellow-50 text-center">Loading data...</p>;
  }

  if (!stats || Object.keys(stats).length === 0) {
    return <p className="text-red-500 text-center">Unable to load stats</p>;
  }

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-4xl font-bold text-yellow-50 mb-10">Admin Dashboard</h1>

      {/* Tab Toggle */}
      <div className="mb-6 flex gap-4 text-yellow-50 font-semibold">
        <button
          onClick={() => setTab("dashboard")}
          className={`px-4 py-2 rounded-xl ${tab === "dashboard" ? "bg-yellow-500 text-black" : "bg-richblack-800"}`}
        >
          Overview
        </button>
        <button
          onClick={() => setTab("users")}
          className={`px-4 py-2 rounded-xl ${tab === "users" ? "bg-yellow-500 text-black" : "bg-richblack-800"}`}
        >
          All Users
        </button>
      </div>

      {/* Dashboard Tab */}
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

      {/* All Users Tab */}
      {tab === "users" && (
        <>
          <UserTable title="All Instructors" users={allInstructors} />
          <UserTable title="All Students" users={allStudents} />
        </>
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
      <h2 className="text-2xl font-semibold text-yellow-50 mb-4">{title}</h2>
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

function UserTable({ title, users }) {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold text-yellow-50 mb-4">{title}</h2>
      {users.length === 0 ? (
        <p className="text-richblack-300">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-richblack-900 rounded-xl overflow-hidden text-yellow-50 text-sm">
            <thead className="bg-richblack-800">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Account Type</th>
                <th className="px-4 py-3 text-left">Joined On</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-t border-richblack-700">
                  <td className="px-4 py-2">{u.firstName} {u.lastName}</td>
                  <td className="px-4 py-2">{u.email}</td>
                  <td className="px-4 py-2">{u.accountType}</td>
                  <td className="px-4 py-2">{new Date(u.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
