import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import * as Location from 'expo-location'

import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import { Feather } from '@expo/vector-icons'

import mapMarker from '../../images/map-marker.png'

import api from '../../services/api'

import styles from './styles'
import { AppLoading } from 'expo';

interface OrphanageProps {
  id: number;
  name: string;
  latitude: number;
  longitude: number;  
}

export default function OrphanagesMap() {
  const navigation = useNavigation()
  const [orphanages, setOrphanages] = useState<OrphanageProps[]>([])
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0
  }) 

  const orphanagesCount = orphanages.length

  useFocusEffect(() => {        
    api.get('/')
      .then(response => setOrphanages(response.data))
      .catch(error => console.warn(error.message))
  })

  useEffect(() => {
    (
      async () => {
        let { status } = await Location.requestPermissionsAsync()
        if(status !== 'granted'){
          alert('Para uma melhor experiência você precisa autorizar o App a acessar a sua localizção')
        }
    
        const { coords } = await Location.getCurrentPositionAsync({})
        const { latitude, longitude } = coords
  
        if(latitude !== 0 && longitude !== 0){          
          return setLocation({latitude, longitude})       
        }
      }
    )()   
  }, [])

  const handleNavigateToOrphanageDetails = (id: number) => {
    navigation.navigate('OrphanageDetails', { id })    
  }
  const handleNavigateToCreateOrphanage = (location: {}) => {
    navigation.navigate('SelectMapPosition', { location })    
  }
  
  return (                 
    <View style={styles.container}>
      { location.latitude !== 0 ? (
        <>
          <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map} 
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008
        }}>
          {
            orphanages.map(orphanage => (
              <Marker 
                key={orphanage.id}
                icon={mapMarker}
                calloutAnchor={{
                  x: 0.5,
                  y: -0.1
                }}
                coordinate={{
                  latitude: orphanage.latitude,
                  longitude: orphanage.longitude,
                }}
              >
                <Callout tooltip onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}>
                  <View style={styles.calloutContainer}>
                    <Text style={styles.calloutText}>{orphanage.name}</Text>
                  </View>
                </Callout>
              </Marker>
            ))
          }
        </MapView>
        <View style={styles.footer}>
          <Text style={styles.footerText}>{orphanagesCount} orfanatos encontrados</Text>
          <TouchableOpacity style={styles.createOrphanageButton} onPress={() => handleNavigateToCreateOrphanage(location)}>
            <Feather name="plus" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        </>
      ) : <AppLoading />
      }
      
    </View>
  
  );
}
