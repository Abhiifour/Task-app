import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {  HashRouter } from 'react-router-dom'

import {RecoilRoot} from 'recoil'

createRoot(document.getElementById('root')!).render(
  <HashRouter>
  <RecoilRoot>
  <App />
  </RecoilRoot>
  </HashRouter>
 
)
