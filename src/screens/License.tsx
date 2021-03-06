/**
 * Copyright 2020 Ironbelly Devs
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react'
import { ScrollView } from 'react-native'
import { Text } from 'src/components/CustomFont'
import { NavigationProps } from 'src/common/types'
import { styleSheetFactory, useThemedStyles } from 'src/themes'

type Props = NavigationProps<'License'>

const License = ({ route }: Props) => {
  const [styles] = useThemedStyles(themedStyles)
  const { licenseText } = route?.params
  return (
    <ScrollView
      style={styles.scrollView}
      testID="ShowPaperKeyScrollView"
      showsVerticalScrollIndicator={true}>
      <Text style={styles.licence}>{licenseText}</Text>
    </ScrollView>
  )
}

const themedStyles = styleSheetFactory((theme) => ({
  scrollView: {
    flexGrow: 1,
    padding: 16,
  },
  licence: {
    paddingBottom: 32,
    color: theme.onBackground,
  },
}))

export default License
