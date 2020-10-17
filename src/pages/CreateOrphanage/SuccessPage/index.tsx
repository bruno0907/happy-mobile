import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { View, Image, Text } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import successMarker from '../../../images/successMarker.png'

import styles from './styles'

const SuccessPage = () => {
  const navigation = useNavigation()
  const handleNavigateToOrphanagesMap = () => navigation.navigate('OrphanagesMap')

  return (
    <View style={styles.container}>
      <Image source={successMarker} />
      <Text style={styles.title}>Ebaaaa!</Text>
      <Text style={styles.text}>
        O cadastro deu certo e foi enviado ao administrador para ser aprovado. Agora é só esperar :)
      </Text>
      <RectButton style={styles.button} onPress={handleNavigateToOrphanagesMap}>
        <Text style={styles.buttonText}>OK</Text>
      </RectButton>
    </View>
  )
}

export default SuccessPage