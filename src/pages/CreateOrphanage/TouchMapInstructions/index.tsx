import React from 'react';
import { View, Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import hand from '../../../images/Hand.png';

import styles from './styles'

const TouchMapInstructions = () => {
  return (  
    <TouchableOpacity onPress={() => {}}>
      <View style={styles.modal}>
        <Image source={hand} />
        <Text style={styles.modalText}>Toque no mapa para adicionar um orfanato</Text>
      </View> 
    </TouchableOpacity>  
  );
}

export default TouchMapInstructions;
