import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import App from './App'
import { CURRENT_BASE_URL } from './app/constants/environment'
import './index.scss'
import { store } from './store/store'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <Provider store={store}>
    <BrowserRouter basename={CURRENT_BASE_URL}>
      <ToastContainer theme='dark' autoClose={2000} />
      <App />
    </BrowserRouter>
  </Provider>
)
