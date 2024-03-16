import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

type PrivateRouteProps = {
  isAuth: AuthorizationStatus;
  children: JSX.Element;
}

export default function PrivateRoute({ isAuth, children }: PrivateRouteProps): JSX.Element {
  return (
    isAuth === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}
