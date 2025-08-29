import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import PricingPage from './components/pricing/index.tsx'
import ContactPage from './components/contact/index.tsx'
import AppFooter from './components/main/footer/footer.tsx'
import { AppHeader } from './components/main/header/index.tsx'
import ShowCase from './components/showcase/showcase.tsx'
import About from './components/about/about.tsx'
import LegalInformations from './components/legal/index.tsx'


const router  = createBrowserRouter([
  {
    path: '/',
    element: <>
    <AppHeader />
      <App />
      <AppFooter />
    </>,
    errorElement: <div>Oops! Something went wrong.</div>,
  },
  {
    path: "/pricing",
    element : <>
    <AppHeader />
      <PricingPage />
      <AppFooter />
    </>,
    errorElement: <div>Oops! Something went wrong.</div>,
  },
  {
    path : "/contact",
    element : <>
    <AppHeader />
      <ContactPage />
      <AppFooter />
    </>,
    errorElement: <div>Oops! Something went wrong.</div>,
  },
  {
    path : "/showcase",
    element: <>
      <AppHeader />
        <ShowCase />
        <AppFooter />
    </>
  },
  {
    path : "/about",
    element : <>
      <AppHeader />
      <About />
      <AppFooter />
    </>
  },
  {
    path : "/legal",
    element : <>
      <AppHeader />
      <LegalInformations />
      <AppFooter />
    </>
  }

])

const root = document.getElementById('root') as HTMLElement;
ReactDOM.createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
    
  </StrictMode>,
)