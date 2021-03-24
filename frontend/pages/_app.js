import App, {Container} from 'next/app'
import React from 'react'
import smoothscroll from 'smoothscroll-polyfill'
import {ThemeProvider} from 'styled-components'
import NextNProgress from 'nextjs-progressbar'
import {compose} from 'recompose'
import config from 'config'

import '../styles/main.scss'
import 'react-datepicker/dist/react-datepicker.css'

import {Spinner} from 'react-bootstrap'

import {
  globalTheme
} from '../styles/global-theme'

import {Provider} from 'react-redux'
import withRedux from 'next-redux-wrapper'
import {makeStore} from '../modules/store'

const preloaderContainerStyles = {
  top: '0',
  left: '0',
  width: '100%',
  height: '100vh',
  position: 'fixed',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'black',
  zIndex: 9999
}

class ShopwindowApp extends App {
  constructor(props) {
    super(props)
    this.state = {
      isLoad: true
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({isLoad: false})
    }, 2000)
    smoothscroll.polyfill()
  }

  componentDidUpdate() {
    window.scrollTo(0, 0)
  }

  static async getInitialProps({Component, ctx}) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {pageProps}
  }

  render() {
    const {Component, pageProps, store} = this.props
    const {isLoad} = this.state

    return (
      <Container>
        <Provider store={store}>
          {isLoad &&
          <div style={preloaderContainerStyles}>
            <Spinner animation="grow" variant="primary" size="lg"/>
          </div>}
          <ThemeProvider theme={globalTheme}>
            <NextNProgress
              color={globalTheme.colors.mainColorPrimary}
              // startPosition="0.3"
              stopDelayMs={50}
              height="2"
            />

            <Component {...pageProps}/>
          </ThemeProvider>
        </Provider>
      </Container>
    )
  }
}

const enhance = compose(
  withRedux(makeStore, {debug: config.debug.includes('redux')})
)

export default enhance(ShopwindowApp)
