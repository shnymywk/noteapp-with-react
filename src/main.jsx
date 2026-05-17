import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// ReactDOMのcreateRootのみを利用。
// index.htmlのrootというidがある要素に囲まれた部分をreact配下において操作を可能にする
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
