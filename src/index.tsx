import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import { CURRENT_BASE_URL } from './app/constants/environment'
import './index.scss'
import { store } from './store'

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
