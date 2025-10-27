import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyComplaints } from "../features/complaints/complaintsThunks";
import ComplaintCard from "../components/ComplaintCard";

const MyComplaints = () => {
  const dispatch = useDispatch();
  const { myList, loading, error } = useSelector((s) => s.complaints);
  const { token } = useSelector((s) => s.auth);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const currentToken = token || localStorage.getItem('token');
    if (currentToken) {
      dispatch(fetchMyComplaints(currentToken));
    }
  }, [dispatch, token]);

  // Filter complaints by status and search query
  const filteredComplaints = myList.filter((complaint) => {
    const matchesStatus =
      statusFilter === "All" || complaint.status === statusFilter;
    const matchesSearch =
      searchQuery === "" ||
      complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.location?.address?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="py-8">
      <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100 rounded-2xl p-6">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-6">
            My Complaints
          </h1>

          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search your complaints..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-md px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 
                text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            {["All", "Pending", "In Progress", "Resolved"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  statusFilter === status
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/50"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="text-gray-400 mt-4">Loading your complaints...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-400 text-lg">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredComplaints.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              {searchQuery || statusFilter !== "All"
                ? "No complaints match your search."
                : "You haven't submitted any complaints yet."}
            </p>
          </div>
        )}

        {/* Complaints Grid */}
        {!loading && !error && filteredComplaints.length > 0 && (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-full">
            {filteredComplaints.map((c) => (
              <ComplaintCard key={c._id} c={c} showDelete={true} />
            ))}
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default MyComplaints;
