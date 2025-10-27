import { Link } from "react-router-dom";
import { MapPin, User } from "lucide-react";

const ComplaintCard = ({ c }) => {
  // Get the latest admin comment if exists
  const latestAdminComment = c.adminComments && c.adminComments.length > 0 
    ? c.adminComments[c.adminComments.length - 1] 
    : null;

  return (
    <Link to={`/complaints/${c._id}`} className="block h-full">
      <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-xl hover:shadow-gray-900/50 cursor-pointer group h-full flex flex-col min-h-[400px]">
        {/* Image Section - Large and prominent */}
        <div className="relative h-56 bg-gray-900 overflow-hidden">
          {c.imageUrl ? (
            <img
              src={c.imageUrl}
              alt={c.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
              <span className="text-6xl opacity-30">📷</span>
            </div>
          )}
          {/* Status Badge Overlay */}
          <div className="absolute top-3 right-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                c.status === "Resolved"
                  ? "bg-green-500/90 text-white"
                  : c.status === "Pending"
                  ? "bg-yellow-500/90 text-gray-900"
                  : "bg-blue-500/90 text-white"
              }`}
            >
              {c.status}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 flex-1 flex flex-col">
          {/* Title */}
          <h3 className="font-bold text-lg text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
            {c.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-400 mb-3 line-clamp-3 flex-1">
            {c.description}
          </p>

          {/* Location */}
          <div className="flex items-start gap-2 mb-3 text-xs text-gray-400">
            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-2">
              {c.location?.address ||
                `${c.location?.lat?.toFixed(4)}, ${c.location?.lng?.toFixed(4)}`}
            </span>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
            <User className="w-4 h-4" />
            <span>User{c.userId ? `#${String(c.userId).slice(-4)}` : ""}</span>
          </div>

          {/* Admin Message Preview */}
          {latestAdminComment && (
            <div className="mt-auto pt-3 border-t border-gray-700">
              <div className="bg-gray-900/50 rounded p-2">
                <p className="text-xs text-gray-400 italic">
                  💬 <span className="font-semibold">Admin Message:</span>{" "}
                  <span className="text-gray-300">
                    {latestAdminComment.comment.length > 60
                      ? `${latestAdminComment.comment.substring(0, 60)}...`
                      : latestAdminComment.comment}
                  </span>
                </p>
                {c.adminComments.length > 1 && (
                  <p className="text-xs text-gray-500 mt-1">
                    +{c.adminComments.length - 1} more comment{c.adminComments.length > 2 ? 's' : ''}
                  </p>
                )}
              </div>
            </div>
          )}

          {latestAdminComment && (
            <p className="text-xs text-gray-500 mt-2 italic">
              Awaiting admin review...
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ComplaintCard;
