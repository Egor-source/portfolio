import { Outlet } from 'react-router'
import { useSetTitle } from '../hooks/useSetTitle.ts'
import LayoutHeader from '../components/layout/LayoutHeader.tsx'
import ScrollToTopButton from '../components/UI/ScrollToTopButton.tsx'
const MainLayout = () => {
  useSetTitle()

  return (
    <>
      <LayoutHeader />

      <main className="flex flex-col w-full h-full py-4 flex-1">
        <Outlet />
      </main>
      <ScrollToTopButton />
    </>
  )
}

export default MainLayout
