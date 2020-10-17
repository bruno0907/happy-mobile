import React, { useEffect, useState } from 'react';
import { Image, View, ScrollView, Text, Linking  } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Feather, FontAwesome } from '@expo/vector-icons';

import mapMarkerImg from '../../images/map-marker.png';
import { RectButton } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native'

import api from '../../services/api'

import styles from './styles'

import Loading from '../../components/Loading';

interface OrphanageDetailsRouteParams {
  id: number;
}

interface OrphanageDetailsProps {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  whatsapp: number;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    id: number;
    url: string;
  }>
}

export default function OrphanageDetails() {
  const route = useRoute()

  const params = route.params as OrphanageDetailsRouteParams

  const { id } = params
  
  const [orphanage, setOrphanage] = useState<OrphanageDetailsProps>()

  useEffect(() => {
    api.get(`/orphanages/${id}`)
      .then(response => setOrphanage(response.data))
      .catch(error => console.warn(error.message))

  }, [id])

  
  function handleWhatsappButton() {
    Linking.canOpenURL(`whatsapp://send?text=""`)
    .then(supported => 
      !supported ? 
      Linking.openURL(`https://api.whatsapp.com/send?phone=55${orphanage?.whatsapp}&text=Olá ${orphanage?.name}. Quero visitar vocês!`)
      :
      Linking.openURL(`whatsapp://send?phone=55${orphanage?.whatsapp}&text=Olá ${orphanage?.name}. Quero visitar vocês!`)
      )
      .catch(error => console.log(error.message))
      
    }
    
    function handleShowOnGoogleMapsButton() {
      const googleMapsLink = 'https://www.google.com/maps/dir/?api=1&destination='

      Linking.openURL(`${googleMapsLink}${orphanage?.latitude}, ${orphanage?.longitude}`)      

    }

  if(!orphanage){
    return <Loading />
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imagesContainer}>
        <ScrollView horizontal pagingEnabled>      
          {
            orphanage.images.map(image => (
              <Image key={image.id} style={styles.image} source={{ uri: image.url }} />
            ))
          }    
        </ScrollView>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{orphanage.name}</Text>
        <Text style={styles.description}>{orphanage.about}</Text>
      
        <View style={styles.mapContainer}>
          <MapView 
            initialRegion={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }} 
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
            style={styles.mapStyle}
          >
            <Marker 
              icon={mapMarkerImg}
              coordinate={{ 
                latitude: orphanage.latitude,
                longitude: orphanage.longitude
              }}
            />
          </MapView>

          <RectButton 
            style={styles.routesContainer}
            onPress={handleShowOnGoogleMapsButton}            
          >
            <Text style={styles.routesText}>Ver rotas no Google Maps</Text>
          </RectButton>
        </View>
      
        <View style={styles.separator} />

        <Text style={styles.title}>Instruções para visita</Text>
        <Text style={styles.description}>{orphanage.instructions}</Text>

        <View style={styles.scheduleContainer}>
          <View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
            <Feather name="clock" size={40} color="#2AB5D1" />
            <Text style={[styles.scheduleText, styles.scheduleTextBlue]}>Segunda à Sexta {orphanage.opening_hours}</Text>
          </View>
          
          { 
            orphanage.open_on_weekends ?
              <View style={[styles.scheduleItem, styles.scheduleItemGreen]}>
                <Feather name="info" size={40} color="#39CC83" />
                <Text style={[styles.scheduleText, styles.scheduleTextGreen]}>Atendemos fim de semana</Text>
              </View>
            :
              <View style={[styles.scheduleItem, styles.scheduleItemRed]}>
                <Feather name="info" size={40} color="#FF669D" />
                <Text style={[styles.scheduleText, styles.scheduleTextRed]}>Não atendemos fim de semana</Text>
              </View>
          }
        </View>

        <RectButton style={styles.contactButton} onPress={handleWhatsappButton}>
          <FontAwesome name="whatsapp" size={24} color="#FFF" />
          <Text style={styles.contactButtonText}>Entrar em contato</Text>
        </RectButton>
      </View>
    </ScrollView>
  )
}
