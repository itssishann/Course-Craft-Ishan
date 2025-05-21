import React, { useEffect, useState } from "react";
import { fetchPlatformStats } from "../../services/operations/adminAPI";
import {
  FaUserTie,
  FaUserGraduate,
  FaBookOpen,
  FaRupeeSign,
} from "react-icons/fa";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentInstructors, setRecentInstructors] = useState([]);
  const [recentStudents, setRecentStudents] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } catch {
        setStats(null);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return <p className="text-yellow-50 text-center">Loading data...</p>;
  }

  if (!stats || Object.keys(stats).length === 0) {
    return <p className="text-red-500 text-center">Unable to load stats</p>;
  }

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-4xl font-bold text-yellow-50 mb-10">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<FaUserTie size={28} />} label="Instructors" value={stats.totalInstructors || 0} />
        <StatCard icon={<FaUserGraduate size={28} />} label="Students" value={stats.totalStudents || 0} />
        <StatCard icon={<FaBookOpen size={28} />} label="Courses" value={stats.totalCourses || 0} />
        <StatCard icon={<FaRupeeSign size={28} />} label="Revenue" value={`₹ ${stats.totalRevenue || 0}`} />
      </div>

      <Section title="Recent Instructors" users={recentInstructors} />
      <Section title="Recent Students" users={recentStudents} />
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

function Section({ title, users }) {
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
              <div className="flex-1 min-w-0">
                <p className="text-lg text-richblack-100 font-medium truncate">
                  {user.name || user.email || "Unnamed"}
                </p>
                <p className="text-sm text-richblack-300 truncate break-words max-w-full">
                  {user.email}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
