import React from 'react'
import { View, Text } from 'react-native'

import styles from './styles'

export default function Loading() {
  return (
    <View style={styles.loading}>
      <Text style={styles.text}>Loading...</Text>
    </View>
  )  
}