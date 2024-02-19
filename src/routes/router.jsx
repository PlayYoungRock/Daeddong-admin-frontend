import HomePage from './HomePage';
import ErrorPage from './ErrorPage';
import LocationDetailPage from './LocationDetailPage';
import LocationListPage from './LocationListPage';

export const HOME_PAGE = '/';
export const LOCATION_LIST_PAGE = 'location-list';
export const ADMIN_LIST_PAGE = 'admin-list';

export const router = [
  {
    path: HOME_PAGE,
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: LOCATION_LIST_PAGE,
        element: <LocationListPage />,
      },
      {
        path: `${LOCATION_LIST_PAGE}/:id`,
        element: <LocationDetailPage />,
      },
      {
        path: ADMIN_LIST_PAGE,
        // TODO admin 기획되면 추가할 것
        element: <LocationListPage />,
      },
    ],
  },
];
