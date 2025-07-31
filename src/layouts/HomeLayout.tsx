import { Outlet, useParams } from 'react-router';
import HomePage from '../pages/home_page/HomePage';

const HomeLayout = () => {
  const { id } = useParams();

  return (
    <div className="flex">
      <div className="flex-1">
        <HomePage />
      </div>
      {id && (
        <div className="flex-1">
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default HomeLayout;
