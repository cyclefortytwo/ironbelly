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
import { View, Platform } from 'react-native'
import { Text } from 'src/components/CustomFont'
import { styleSheetFactory, useThemedStyles } from 'src/themes'

type Props = {
  title: string
}

function SectionTitle({ title }: Props) {
  const [styles] = useThemedStyles(themedStyles)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const themedStyles = styleSheetFactory((theme) => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  title: {
    fontWeight: Platform.select({ android: '700', ios: '700' }),
    fontSize: 16,
    color: theme.onBackground,
  },
}))

export default SectionTitle
