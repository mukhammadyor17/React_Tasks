import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import type { RootState } from './store/store';
import type { User } from './store/features/user/userSlice';
import ControlledForm from './components/controlled_form/ControlledForm';
import UncontrolledForm from './components/uncontrolled_form/UncontrolledForm';
import UserCard from './components/user_card/UserCard';

const btnClass =
  'px-10 py-5 rounded-xl text-white shadow-sm cursor-pointer bg-indigo-500 transition-all transform active:scale-95 hover:shadow-2xl';

const App = () => {
  const [modalType, setModalType] = useState<
    null | 'controlled' | 'uncontrolled'
  >(null);
  const [newUsers, setNewUsers] = useState<Set<number>>(new Set());
  const modalElement = document.getElementById('modal') as HTMLElement;
  const users = useSelector((state: RootState) => state.user.users);

  useEffect(() => {
    const currentTime = Date.now();
    const threeSecondsAgo = currentTime - 3000;

    const recentUsers = users
      .filter((user) => user.timestamp > threeSecondsAgo)
      .map((user) => user.id);

    if (recentUsers.length > 0) {
      setNewUsers((prev) => new Set([...prev, ...recentUsers]));

      const timer = setTimeout(() => {
        setNewUsers((prev) => {
          const updated = new Set(prev);
          recentUsers.forEach((id) => updated.delete(id));
          return updated;
        });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [users]);

  return (
    <div className="h-screen w-full flex justify-center items-center flex-col gap-10">
      <div className="p-10 flex gap-10">
        <button className={btnClass} onClick={() => setModalType('controlled')}>
          Show controlled modal
        </button>
        <button
          className={btnClass}
          onClick={() => setModalType('uncontrolled')}
        >
          Show uncontrolled modal
        </button>
      </div>
      <div className="space-y-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-5">
        {users.map((user: User) => (
          <UserCard key={user.id} user={user} isNew={newUsers.has(user.id)} />
        ))}
      </div>

      {modalType === 'controlled' &&
        createPortal(
          <ControlledForm onClose={() => setModalType(null)} />,
          modalElement
        )}

      {modalType === 'uncontrolled' &&
        createPortal(
          <UncontrolledForm onClose={() => setModalType(null)} />,
          modalElement
        )}
    </div>
  );
};

export default App;
