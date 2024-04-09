import Main from '../../pages/main/main';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../../pages/404/not-found';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Offer from '../../pages/offer/offer';
import Layout from '../layout/layout';
import PrivateRoute from '../private-route/private-route';
import { useAppSelector } from '../../hooks';
import Loading from '../../services/loading/loading';
import HistoryRouter from '../history/history-route';
import browserHistory from '../history/browser-history';

export default function App(): JSX.Element {
  const authStatus = useAppSelector((initialState) => initialState.authStatus);
  const loadingData = useAppSelector((initialState) => initialState.loadingData);

  if(authStatus === AuthorizationStatus.Unknown || loadingData){
    return (
      <Loading />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Main />} />
          <Route path={`${AppRoute.Offer}/:id`} element={<Offer />} />
          <Route path={AppRoute.Favorites}
            element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path={AppRoute.Login} element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </HistoryRouter>
  );
}
