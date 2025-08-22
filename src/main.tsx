import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import '../public/styles/index.scss';
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import PrincingPage from './components/pricing/index.tsx'
import ContactPage from './components/contact/index.tsx'
import ArchivePage from './pages/ArchivesApp.tsx';

const router  = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>Oops! Something went wrong.</div>,
  },
  {
    path: "/pricing",
    element : <PrincingPage />,
    errorElement: <div>Oops! Something went wrong.</div>,
  },
  {
    path : "/contact",
    element : <ContactPage />,
    errorElement: <div>Oops! Something went wrong.</div>,
  },
  {
    path : "/archives",
    element : <ArchivePage />,
    errorElement: <div>Oops! Something went wrong.</div>,
  }
])

const root = document.getElementById('root') as HTMLElement;
ReactDOM.createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)