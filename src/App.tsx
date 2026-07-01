import { RouterProvider } from 'react-router'
import { router } from './libs/router/index.tsx'

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
