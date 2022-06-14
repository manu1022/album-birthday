import { Dialog } from '@headlessui/react';
import { lazy, Suspense, useState } from 'react';
import { Outlet, RouteObject, useRoutes, BrowserRouter } from 'react-router-dom';

const Loading = () => <p className="p-4 w-full h-full text-center">Loading...</p>;

const IndexScreen = lazy(() => import('~/components/screens/Index'));
const Page404Screen = lazy(() => import('~/components/screens/404'));

function Layout() {
  return (
    <div>
      <nav className="p-4 flex items-center justify-between">
        <span>Header</span>
      </nav>
      <Outlet />
    </div>
  );
}

export const Router = () => {
  return (
    <BrowserRouter>
      <InnerRouter />
    </BrowserRouter>
  );
};

const InnerRouter = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <IndexScreen />,
        },
        {
          path: '*',
          element: <Page404Screen />,
        },
      ],
    },
  ];
  const element = useRoutes(routes);
  return (
    <div>
      <Suspense fallback={<Loading />}>{element}</Suspense>
    </div>
  );
};


function albumToCalendar(album: Album) {
  // const date = '2019' + album.release_date.substring(4).replace(/-/g, '');
  const [year, _, day] = album.release_date.split('-');

  return `BEGIN:VEVENT
CREATED:${album.release_date.replace(/-/g, '')}
UID:${album.id}
RRULE:FREQ=YEARLY;BYMONTHDAY=${day}
DTEND;VALUE=DATE:${album.release_date.replace(/-/g, '')}
TRANSP:OPAQUE
SUMMARY:${album.name} - ${album.artists.map(artist => artist.name).join(', ')} (${year})
DESCRIPTION:spotify://album/${album.uri.split(':').pop()}
LAST-MODIFIED:${album.release_date.replace(/-/g, '')}
DTSTAMP:${album.release_date.replace(/-/g, '')}
DTSTART;VALUE=DATE:${album.release_date.replace(/-/g, '')}
SEQUENCE:0
END:VEVENT
`
}
