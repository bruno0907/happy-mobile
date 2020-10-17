import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { MapEvent, Marker } from 'react-native-maps';

import hand from '../../../images/Hand.png';
import mapMarkerImg from '../../../images/map-marker.png';

import styles from './styles'

interface RouteLocationProps {
  location: {
    latitude: number;
    longitude: number
  }
}

export default function SelectMapPosition() {
  const navigation = useNavigation();
  const route = useRoute()
  const params = route.params as RouteLocationProps

  const [showModal, setShowModal] = useState(true)
  const [position, setPosition] = useState(
    { latitude: 0, longitude: 0}
  )

  function handleSelectMapPosition(event: MapEvent){
    setPosition(event.nativeEvent.coordinate)
  }

  function handleNextStep() {
    navigation.navigate('OrphanageData', { position });
  }

  return (     
    <View style={styles.container}>  
      { showModal && 
        <RectButton style={styles.modal} onPress={() => setShowModal(false)}>          
          <Image source={hand} />        
          <Text style={styles.modalText}>Toque no mapa para adicionar um orfanato</Text>
        </RectButton> 
      }   
      <MapView 
        initialRegion={{
          latitude: params.location.latitude,
          longitude: params.location.longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        style={styles.mapStyle}
        onPress={handleSelectMapPosition}
      >
        { position.latitude !== 0 &&
          <Marker 
            icon={mapMarkerImg}
            coordinate={{ 
              latitude: position.latitude, 
              longitude: position.longitude 
            }}            
          />
        }
      </MapView>

      { position.latitude !== 0 && 
        <RectButton style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>      
      }
    </View>
  )
}
