import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import styled, { ThemeProvider } from 'styled-components'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './style-theme'
import App from './App'
import store from './redux/store'
import history from './history'

const Layout = styled.div`
  box-sizing: border-box;
  min-height: 100vh;
  background: ${(props) => props.theme.backgroundColor};
  padding: ${(props) => props.theme.p3};
`

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <Layout>
          <CssBaseline />
          <App />
        </Layout>
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
