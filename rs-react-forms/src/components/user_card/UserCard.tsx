import type { User } from '../../store/features/user/userSlice';

interface UserCardProps {
  user: User;
  isNew: boolean;
}

const UserCard = ({ user, isNew }: UserCardProps) => {
  return (
    <div
      className={`p-3 rounded-lg border transition-all duration-500 ${
        isNew
          ? 'bg-green-100 border-green-400 shadow-lg scale-105'
          : 'bg-white border-gray-200'
      }`}
    >
      <div className="font-medium">{user.name}</div>
      <div className="text-sm text-gray-600">{user.email}</div>
      <div className="text-sm text-gray-600">{user.country}</div>
    </div>
  );
};

export default UserCard;
