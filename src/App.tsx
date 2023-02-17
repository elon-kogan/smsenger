import { StyledEngineProvider } from '@mui/material'

import Header from '@pages/Header'
import MessagesPage from '@pages/Messages'

import './App.sass'

const App = () => (
  <div className="App">
    <StyledEngineProvider injectFirst>
      <Header />
      <MessagesPage />
    </StyledEngineProvider>
  </div>
)

export default App
