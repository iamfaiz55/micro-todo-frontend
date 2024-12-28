import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.scss'
import { Provider } from 'react-redux'
import reduxStore from './redux/store'
import Todo from './Todo'

const App = () => {
  return <>
  <Todo/>
  </>
}

export default App
const rootElement = document.getElementById('app')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(<Provider store={reduxStore}>
<App />
</Provider>)