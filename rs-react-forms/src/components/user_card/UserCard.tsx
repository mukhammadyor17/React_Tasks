import type { User } from '../../store/features/user/userSlice';

interface UserCardProps {
  user: User;
  isNew: boolean;
}

const UserCard = ({ user, isNew }: UserCardProps) => {
  return (
    <div
      className={`p-4 rounded-lg border transition-all duration-500 ${
        isNew
          ? 'bg-green-100 border-green-400 shadow-lg scale-105'
          : 'bg-white border-gray-200 hover:shadow-md'
      }`}
    >
      <div className="flex items-start gap-3 mb-3">
        {user.file && (
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
            <img
              src={user.file}
              alt={`${user.name}'s avatar`}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div className="font-semibold text-lg text-gray-800 truncate">
              {user.name}
            </div>
            <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded flex-shrink-0">
              ID: {user.id}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-center text-sm text-gray-700">
          <span className="font-medium w-16">Email:</span>
          <span className="text-gray-600 truncate">{user.email}</span>
        </div>

        <div className="flex items-center text-sm text-gray-700">
          <span className="font-medium w-16">Age:</span>
          <span className="text-gray-600">{user.age} years</span>
        </div>

        <div className="flex items-center text-sm text-gray-700">
          <span className="font-medium w-16">Gender:</span>
          <span className="text-gray-600 capitalize">{user.gender}</span>
        </div>

        <div className="flex items-center text-sm text-gray-700">
          <span className="font-medium w-16">Country:</span>
          <span className="text-gray-600">{user.country}</span>
        </div>
      </div>

      <div className="border-t pt-3">
        <div className="flex items-center text-sm text-gray-700">
          <span className="font-medium w-16">Terms:</span>
          <span
            className={`px-2 py-1 rounded text-xs ${
              user.accept
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {user.accept ? 'Accepted' : 'Not Accepted'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
