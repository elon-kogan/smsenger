import { StyledEngineProvider } from '@mui/material'

import './App.sass'

const App = () => (
  <div className="App">
    <StyledEngineProvider injectFirst></StyledEngineProvider>
  </div>
)

export default App
