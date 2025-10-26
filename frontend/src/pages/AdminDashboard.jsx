// src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminComplaints,
  adminUpdateComplaint,
  adminAddComment,
  fetchAdminStatistics
} from "../features/complaints/complaintsThunks";
import { motion, AnimatePresence } from "framer-motion";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((s) => s.complaints);
  const { token } = useSelector((s) => s.auth);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState("");
  const [adminComment, setAdminComment] = useState("");
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    // Ensure we have token from localStorage if not in state
    const currentToken = token || localStorage.getItem('token');
    console.log('AdminDashboard loading with token:', !!currentToken);
    if (currentToken) {
      console.log('Fetching admin complaints and statistics...');
      dispatch(fetchAdminComplaints(currentToken));
      dispatch(fetchAdminStatistics(currentToken)).then((result) => {
        if (!result.error) {
          setStatistics(result.payload);
        }
      });
    } else {
      console.log('No token found for admin dashboard');
    }
  }, [dispatch]); // Remove token dependency so it runs once on mount

  const open = (c) => {
    setSelected(c);
    setStatus(c.status);
    setAdminComment(""); // Clear for new comment
  };

  const submitUpdate = async () => {
    if (!selected) return;
    
    const currentToken = token || localStorage.getItem('token');
    if (!currentToken) {
      alert("❌ Authentication required!");
      return;
    }
    
    const updateData = { status };
    if (adminComment && adminComment.trim()) {
      updateData.comment = adminComment.trim();
    }
    
    const res = await dispatch(
      adminUpdateComplaint({
        id: selected._id,
        data: updateData,
        token: currentToken
      })
    );
    if (!res.error) {
      alert("✅ Complaint updated successfully!");
      setSelected(null);
      dispatch(fetchAdminComplaints(currentToken)); // Refresh the list
    } else {
      alert("❌ Something went wrong!");
    }
  };

  return (
    <div className="p-6 text-gray-900 dark:text-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-center">
        🛠️ Admin Dashboard
      </h2>
      
      {/* Statistics Cards */}
      {statistics && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-xl text-center">
            <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">{statistics.total}</h3>
            <p className="text-sm text-blue-800 dark:text-blue-300">Total Complaints</p>
          </div>
          <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-xl text-center">
            <h3 className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{statistics.pending}</h3>
            <p className="text-sm text-yellow-800 dark:text-yellow-300">Pending</p>
          </div>
          <div className="bg-orange-100 dark:bg-orange-900/30 p-4 rounded-xl text-center">
            <h3 className="text-2xl font-bold text-orange-600 dark:text-orange-400">{statistics.inProgress}</h3>
            <p className="text-sm text-orange-800 dark:text-orange-300">In Progress</p>
          </div>
          <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-xl text-center">
            <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">{statistics.resolved}</h3>
            <p className="text-sm text-green-800 dark:text-green-300">Resolved</p>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          Loading complaints...
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {list.map((c) => (
            <motion.div
              key={c._id}
              whileHover={{ scale: 1.02 }}
              className="rounded-2xl shadow-md p-5 transition-all duration-300 
                         bg-white/70 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700"
            >
              {c.imageUrl && (
                <img
                  src={c.imageUrl}
                  alt={c.title}
                  className="w-full h-24 object-cover rounded-xl mb-3"
                />
              )}
              <h3 className="font-semibold text-lg">{c.title}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 line-clamp-2">
                {c.description}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Reported by: {c.userId?.name || "Unknown"}
              </p>
              <p className="text-sm mt-2">
                <span className="font-medium text-indigo-500 dark:text-indigo-400">
                  Status:
                </span>{" "}
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  c.status === 'Resolved' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                  c.status === 'In Progress' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' :
                  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                }`}>
                  {c.status}
                </span>
              </p>

              {c.adminComments && c.adminComments.length > 0 && (
                <div className="mt-3 space-y-2">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Admin Comments:</p>
                  {c.adminComments.slice(-2).map((comment, idx) => (
                    <div key={idx} className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded">
                      <p className="text-gray-700 dark:text-gray-300">{comment.comment}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        {comment.adminName} • {new Date(comment.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                  {c.adminComments.length > 2 && (
                    <p className="text-xs text-gray-500">+{c.adminComments.length - 2} more comments</p>
                  )}
                </div>
              )}

              <button
                onClick={() => open(c)}
                className="mt-3 w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium py-2 rounded-xl shadow hover:shadow-lg transition"
              >
                Review / Update
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal for editing complaint */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-lg shadow-2xl border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-xl font-bold mb-2">{selected.title}</h3>
              {selected.imageUrl && (
                <img
                  src={selected.imageUrl}
                  alt={selected.title}
                  className="w-full h-32 object-cover rounded-xl mb-3"
                />
              )}
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                {selected.description}
              </p>
              
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Reported by: {selected.userId?.name || selected.userId?.email || "Unknown"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Location: {selected.location?.lat}, {selected.location?.lng}
                </p>
              </div>
              
              {/* Display existing admin comments */}
              {selected.adminComments && selected.adminComments.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Previous Admin Comments:</h4>
                  <div className="max-h-32 overflow-y-auto space-y-2">
                    {selected.adminComments.map((comment, idx) => (
                      <div key={idx} className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded">
                        <p className="text-gray-700 dark:text-gray-300">{comment.comment}</p>
                        <p className="text-gray-500 text-xs mt-1">
                          {comment.adminName} • {new Date(comment.timestamp).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <textarea
                className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 p-3 rounded-lg mt-2 focus:ring-2 focus:ring-indigo-500"
                rows="3"
                value={adminComment}
                onChange={(e) => setAdminComment(e.target.value)}
                placeholder="Add admin comment (optional)"
              />

              <select
                className="w-full mt-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>

              <div className="flex justify-end gap-3 mt-5">
                <button
                  onClick={() => setSelected(null)}
                  className="px-4 py-2 rounded-lg border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={submitUpdate}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow hover:shadow-lg transition"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
