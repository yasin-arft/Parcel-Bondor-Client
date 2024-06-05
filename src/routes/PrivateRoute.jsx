import useAuth from '@/hooks/useAuth';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return
  }

  if (user) {
    return children
  }

  return (<Navigate to={'/login'} state={{ from: location }} replace />);
};

PrivateRoute.propTypes = {
  children: PropTypes.node
};

export default PrivateRoute;