import { useState, useEffect } from 'react';
import Main from '../../pages/main/main';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import NotFound from '../../pages/404/not-found';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Offer from '../../pages/offer/offer';
import Layout from '../Layout/layout';
import PrivateRoute from '../private-route/private-route';
import { offers } from '../../mocks/offers';

export default function App(): JSX.Element {
  const [isAuth, setIsAuth] = useState(AuthorizationStatus.Auth);
  // Для теста
  const [isFavorite, setIsFavorite] = useState<string[]>(['1q', '2q', '3q']);
  // const [isFavorite, setIsFavorite] = useState<string[]>([]);

  // Заглушка для линтера, удалить
  useEffect(() => {
    setIsAuth((prevState) => prevState);
  }, [isAuth]);


  const updateFavorites = (id: string | null) => {
    setIsFavorite((prevFavorites) => {
      if (id !== null) {
        if (prevFavorites.includes(id)) {
          return prevFavorites.filter((favoriteId) => favoriteId !== id);
        }
        return [...prevFavorites, id];
      }
      return prevFavorites;
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Main updateFavorites={updateFavorites} />} />
          <Route path={`${AppRoute.Offer}/:id`} element={<Offer offers={offers} updateFavorites={updateFavorites} isAuth={isAuth} />} />
          <Route path={AppRoute.Favorites}
            element={
              <PrivateRoute isAuth={isAuth}>
                <Favorites offers={offers} updateFavorites={updateFavorites} isFavorite={isFavorite} />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path={AppRoute.Login} element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
