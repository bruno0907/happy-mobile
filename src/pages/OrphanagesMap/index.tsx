import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import { Feather } from '@expo/vector-icons'

import mapMarker from '../../images/map-marker.png'

import api from '../../services/api'

import styles from './styles'

interface OrphanageProps {
  id: number;
  name: string;
  latitude: number;
  longitude: number;  
}

export default function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<OrphanageProps[]>([])

  const orphanagesCount = orphanages.length

  useFocusEffect(() => {
    api.get('/')
      .then(response => setOrphanages(response.data))
      .catch(error => console.warn(error.message))

  })

  const navigation = useNavigation()

  const handleNavigateToOrphanageDetails = (id: number) => {
    navigation.navigate('OrphanageDetails', { id })
  }
  const handleNavigateToCreateOrphanage = () => {
    navigation.navigate('SelectMapPosition')
  }
  
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map} 
        initialRegion={{
          latitude: -26.9905831,
          longitude: -48.6288651,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008
        }}>
          {
            orphanages.map(orphanage => (
              <Marker 
                key={orphanage.id}
                icon={mapMarker}
                calloutAnchor={{
                  x: 2.7,
                  y: 0.8
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
          <TouchableOpacity style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage}>
            <Feather name="plus" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
    </View>
  );
}
