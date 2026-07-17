import { ToastContainer } from 'react-toastify'
import { useTheme } from '@/context/ThemeContext'

export default function ThemedToastContainer() {
  const { theme } = useTheme()

  return (
    <ToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
      theme={theme}
    />
  )
}
