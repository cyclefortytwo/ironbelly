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
import { View, ActivityIndicator, Alert, Button as NativeButton } from 'react-native'
import FormTextInput from 'components/FormTextInput'
import { connect } from 'react-redux'
import styled from 'styled-components/native'

import { Spacer, KeyboardAvoidingWrapper, FlexGrow, LoaderView } from 'common'
import colors from 'common/colors'
import { Button } from 'components/CustomFont'
import { type State as ReduxState, type Navigation } from 'common/types'

type Props = {
  navigation: Navigation,
  setPassword: (password: string) => void,
  checkPassword: () => void,
  isPasswordValid: boolean,
  error: { message: string },
  password: string,
  inProgress: boolean,
  destroyWallet: () => void,
}
type State = {}

const Submit = styled(Button)``

const Forget = styled(View)`
  margin-top: -54px;
  align-items: flex-end;
`

class Password extends Component<Props, State> {
  static navigationOptions = {
    header: null,
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isPasswordValid !== this.props.isPasswordValid && this.props.isPasswordValid) {
      const { nextScreen } = this.props.navigation.state.params
      this.props.navigation.navigate(nextScreen.name, nextScreen.params)
    }
  }

  render() {
    const {
      password,
      navigation,
      setPassword,
      checkPassword,
      inProgress,
      destroyWallet,
    } = this.props

    return (
      <KeyboardAvoidingWrapper behavior="padding" enabled>
        {(inProgress && (
          <LoaderView>
            <ActivityIndicator size="large" color={colors.primary} />
          </LoaderView>
        )) || (
          <React.Fragment>
            <FlexGrow />
            <FormTextInput
              autoFocus={true}
              secureTextEntry={true}
              onChange={password => {
                setPassword(password)
              }}
              value={password}
              placeholder="Enter password"
            />
            <Forget>
              <NativeButton
                title="Forgot?"
                disabled={false}
                onPress={() => {
                  Alert.alert(
                    'Forgot password',
                    'There is no way to restore the password. You can destroy the wallet and restore it if you have recovery passphrase backed up. Then you can provide a new password.',
                    [
                      {
                        text: 'Back',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {
                        text: 'Destroy the wallet',
                        style: 'destructive',
                        onPress: () => {
                          Alert.alert(
                            'Destroy the wallet',
                            'This action would remove all of your data!',
                            [
                              {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                              },
                              {
                                text: 'Destroy',
                                style: 'destructive',
                                onPress: () => {
                                  destroyWallet()
                                },
                              },
                            ]
                          )
                        },
                      },
                    ]
                  )
                }}
              />
            </Forget>
            <FlexGrow />
            <Submit
              title="Unlock"
              disabled={false}
              onPress={() => {
                checkPassword()
              }}
            />
            <Spacer />
          </React.Fragment>
        )}
      </KeyboardAvoidingWrapper>
    )
  }
}

const mapStateToProps = (state: ReduxState) => ({
  isPasswordValid: state.wallet.password.valid,
  error: state.wallet.password.error,
  password: state.wallet.password.value,
  inProgress: state.wallet.password.inProgress,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  setPassword: password => {
    dispatch({ type: 'SET_PASSWORD', password })
  },
  checkPassword: () => {
    dispatch({ type: 'CHECK_PASSWORD' })
  },
  destroyWallet: () => {
    dispatch({ type: 'WALLET_DESTROY_REQUEST' })
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Password)
