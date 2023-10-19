import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.scss'
import { store } from './store'
import { CURRENT_BASE_URL } from './constants/enviroment'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={CURRENT_BASE_URL}>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
)
