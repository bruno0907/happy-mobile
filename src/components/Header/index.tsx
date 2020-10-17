import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Text, View } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'

import styles from './styles'

interface HeaderProps{
  title: string;
  hideCancelButton?: boolean;
}
// export default function Header({title}: HeaderProps) --> Forma desestruturada
export default function Header(props: HeaderProps) {
  const navigation = useNavigation()

  function handleGoBackToHomePage() {
    navigation.navigate('OrphanagesMap')
  }

  return (
    <View style={styles.container}>
      <BorderlessButton onPress={navigation.goBack}>
        <Feather name="arrow-left" size={24} color="#15B5D6" />        
      </BorderlessButton>

      <Text style={styles.title}>{props.title}</Text>

      { 
        !props.hideCancelButton ? (
          <BorderlessButton onPress={handleGoBackToHomePage}>
            <Feather name="x" size={24} color="#FF669D" />
          </BorderlessButton>
        ) : <View />
      }
    </View>
  )
}