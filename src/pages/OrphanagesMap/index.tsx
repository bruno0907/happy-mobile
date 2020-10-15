import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import { Feather } from '@expo/vector-icons'

import mapMarker from '../../images/map-marker.png'

export default function OrphanagesMap() {
  const navigation = useNavigation()

  const handleNavigateToOrphanageDetails = () => {
    navigation.navigate('OrphanageDetails')
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
          <Marker 
            icon={mapMarker}
            calloutAnchor={{
              x: 2.7,
              y: 0.8
            }}
            coordinate={{
              latitude: -26.9905831,
              longitude: -48.6288651,
            }}
          >
            <Callout tooltip onPress={handleNavigateToOrphanageDetails}>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>Nome do Orfanato</Text>
              </View>
            </Callout>
          </Marker>
        </MapView>
        <View style={styles.footer}>
          <Text style={styles.footerText}>2 orfanatos encontrados</Text>
          <TouchableOpacity style={styles.createOrphanageButton} onPress={() => console.warn('Create Ophanage Pressed')}>
            <Feather name="plus" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  calloutContainer:{
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: 160,
    height: 46,
    borderRadius: 16,
    justifyContent: 'center',
    paddingHorizontal: 16,    
  },
  calloutText: {
    color: '#0089A5',
    fontSize: 14,
    fontFamily: 'Nunito700',
  },
  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
  },
  footerText: {
    color: '#8FA7B3',
    fontFamily: 'Nunito700',
  },
  createOrphanageButton: {
    width: 56,
    height: 56,
    borderRadius: 20,
    backgroundColor: '#15C3D6',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
