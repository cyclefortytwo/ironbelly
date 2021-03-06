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
import CopyButton from 'src/components/CopyButton'
import { Text } from 'src/components/CustomFont'
import { styleSheetFactory, useThemedStyles } from 'src/themes'

type Props = {
  content?: string
  label: string
}

function CopyHeader({ content, label }: Props) {
  const [styles] = useThemedStyles(themedStyles)
  return (
    <View style={styles.copyPasteContent}>
      <Text style={styles.copyPasteContentTitle}>{label}</Text>
      {(content && <CopyButton content={content} subject={label} />) || null}
    </View>
  )
}

const themedStyles = styleSheetFactory((theme) => ({
  copyPasteContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  copyPasteContentTitle: {
    fontWeight: Platform.select({ android: '700', ios: '500' }),
    fontSize: 16,
    color: theme.onBackground,
  },
}))

export default CopyHeader
