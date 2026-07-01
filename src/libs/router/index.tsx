import { createBrowserRouter } from 'react-router'
import HomePage from '../../pages/HomePage.tsx'
import ProjectsPage from '../../pages/ProjectsPage.tsx'
import MainLayout from '../../layouts/MainLayout.tsx'
import ExperiencePage from '../../pages/ExperiencePage.tsx'
import CasesPage from '../../pages/CasesPage.tsx'
import StackPage from '../../pages/StackPage.tsx'
import AboutPage from '../../pages/AboutPage.tsx'
import NotFoundPage from '../../pages/NotFoundPage.tsx'

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
        handle: {
          title: 'home',
        },
      },
      {
        path: '/projects',
        element: <ProjectsPage />,
        handle: {
          title: 'projects',
        },
      },
      {
        path: '/experience',
        element: <ExperiencePage />,
        handle: {
          title: 'experience',
        },
      },
      {
        path: '/case-studies',
        element: <CasesPage />,
        handle: {
          title: 'cases',
        },
      },
      {
        path: '/tech-stack',
        element: <StackPage />,
        handle: {
          title: 'stack',
        },
      },
      {
        path: '/about',
        element: <AboutPage />,
        handle: {
          title: 'about',
        },
      },
      {
        path: '*',
        element: <NotFoundPage />,
        handle: {
          title: '404',
        },
      },
    ],
  },
])
