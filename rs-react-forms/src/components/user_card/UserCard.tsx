import type { User } from '../../store/features/user/userSlice';

interface UserCardProps {
  user: User;
  isNew: boolean;
}

const UserCard = ({ user, isNew }: UserCardProps) => {
  return (
    <div
      className={`p-4 rounded-xl border transition-all duration-500 hover:shadow-md ${
        isNew
          ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-lg scale-105 ring-2 ring-green-200'
          : 'bg-white border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-start gap-4">
        {user.file && (
          <div className="flex-shrink-0">
            <img
              src={user.file}
              alt={`${user.name}'s profile`}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {user.name}
            </h3>
            {isNew && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                New
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">📧</span>
              <span className="text-gray-700 truncate">{user.email}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-gray-500">🌍</span>
              <span className="text-gray-700">{user.country}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-gray-500">🎂</span>
              <span className="text-gray-700">{user.age} years old</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-gray-500">👤</span>
              <span className="text-gray-700 capitalize">{user.gender}</span>
            </div>
          </div>

          {user.accept && (
            <div className="mt-3 flex items-center gap-2 text-xs text-green-600">
              <span>✓</span>
              <span>Terms & Conditions accepted</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
