// @flow
//
// Copyright 2019 Ivan Sorokin.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React, { Component } from 'react'
import { Linking, AppState } from 'react-native'
import Toaster from 'react-native-toaster'
import { Provider, connect } from 'react-redux'
import {
  isResponseSlate,
  checkSlatesDirectory,
  checkApplicationSupportDirectory,
  checkApiSecret,
  isWalletInitialized,
} from 'common'
import urlParser from 'url'
import Modal from 'react-native-modal'
import { decode as atob } from 'base-64'
import { PersistGate } from 'redux-persist/integration/react'

import { type Dispatch, type State as GlobalState, type Url } from 'common/types'
import { store, persistor } from 'common/redux'
import TxPostConfirmationModal from 'components/TxPostConfirmationModal'
import { AppContainer } from 'modules/navigation'
import { type NavigationState } from 'react-navigation'

// Filesystem
checkSlatesDirectory()
checkApplicationSupportDirectory()
checkApiSecret()

type Props = {
  toastMessage: {
    text: string,
    styles: any,
  },
  nav: NavigationState,
  showTxConfirmationModal: boolean,
  closeTxPostModal: () => void,
  dispatch: Dispatch,
}
type State = {}

class RealApp extends React.Component<Props, State> {
  navigation: any
  componentDidMount() {
    Linking.getInitialURL()
      .then(url => {
        if (url) {
          this._handleOpenURL({ url })
        }
      })
      .catch(err => console.error('An error occurred', err))
    Linking.addEventListener('url', this._handleOpenURL)
    AppState.addEventListener('change', this._handleAppStateChange)
  }
  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleOpenURL)
    AppState.removeEventListener('change', this._handleAppStateChange)
  }

  _handleOpenURL = event => {
    isWalletInitialized().then(exists => {
      if (exists) {
        // $FlowFixMe
        const link: Url = urlParser.parse(event.url, true)
        let nextScreen
        if (link.protocol === 'grin:') {
          if (link.host === 'send') {
            const amount = parseFloat(link.query.amount)
            const destination = link.query.destination
            const message = atob(link.query.message)
            if (!isNaN(amount) && destination) {
              nextScreen = {
                name: 'SendLink',
                params: { amount, url: destination, message },
              }
            }
          }
        } else if (link.protocol === 'file:') {
          nextScreen = isResponseSlate(link.path)
            ? {
                name: 'Overview',
                params: { responseSlatePath: link.path },
              }
            : {
                name: 'Receive',
                params: { slatePath: link.path },
              }
        }
        if (nextScreen) {
          if (!store.getState().wallet.password.value) {
            //Password is not set
            this.navigation.navigate('Password', { nextScreen })
          } else {
            this.navigation.navigate(nextScreen.name, nextScreen.params)
          }
        }
      }
    })
  }

  _handleAppStateChange = nextAppState => {
    if (nextAppState === 'background') {
      isWalletInitialized().then(exists => {
        if (exists) {
          this.navigation.navigate('Password', { nextScreen: { name: 'Main' } })
          store.dispatch({ type: 'CLEAR_PASSWORD' })
        }
      })
    }
  }
  render() {
    const { dispatch, closeTxPostModal } = this.props
    return (
      <React.Fragment>
        <Toaster message={this.props.toastMessage} />
        <Modal isVisible={this.props.showTxConfirmationModal} onBackdropPress={closeTxPostModal}>
          <TxPostConfirmationModal />
        </Modal>
        <AppContainer state={this.props.nav} dispatch={dispatch} />
      </React.Fragment>
    )
  }
}
const RealAppConnected = connect(
  (state: GlobalState) => ({
    nav: state.nav,
    toastMessage: state.toaster,
    showTxConfirmationModal: state.tx.txPost.showModal,
  }),
  (dispatch, ownProps) => ({
    closeTxPostModal: () => dispatch({ type: 'TX_POST_CLOSE' }),
    dispatch,
  })
)(RealApp)

export default class App extends Component<{}, {}> {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RealAppConnected />
        </PersistGate>
      </Provider>
    )
  }
}
