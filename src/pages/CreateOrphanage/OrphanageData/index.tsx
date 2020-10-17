import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { 
  ScrollView, 
  View,   
  Switch, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker'

import styles from './styles'

import api from '../../../services/api'

interface OrphanageRouteParams {
  position: {
    latitude: number;
    longitude: number
  }
}

export default function OrphanageData() {  
  const navigation = useNavigation()
  const route = useRoute()
  const params = route.params as OrphanageRouteParams

  const { latitude, longitude } = params.position

  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [images, setImages] = useState<string[]>([])
  const [instructions, setInstructions] = useState('')
  const [opening_hours, setOpeningHours] = useState('')  
  const [open_on_weekends, setOpenOnWeekends] = useState(false)  

  async function handleSelectImages(){
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync()
    
    if(status !== 'granted'){
      alert('Libera as fotinhas aí novaxxx')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    })

    if(result.cancelled){
      return
    }

    const { uri: image } = result
    setImages([...images, image])
  }

  function handleSubmit(){    

    const data = new FormData()

    data.append('name', name)
    data.append('latitude', String(latitude))
    data.append('longitude', String(longitude))
    data.append('about', about)
    data.append('whatsapp', String(whatsapp))
    data.append('instructions', instructions)
    data.append('opening_hours', opening_hours)
    data.append('open_on_weekends', String(open_on_weekends))

    images.forEach(image => data.append('images', {
      name: `$image_${Date.now()}${(Math.random() * 5)}.jpg`,
      type: 'image/jpg',
      uri: image
    } as any))  

    api.post('orphanages', data)
      .then(() => navigation.navigate('OrphanagesMap'))
      .catch(error => {
        console.log(error.message)
        alert('Houve um erro ao fazer seu cadastro.')
      })
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={about}
        onChangeText={setAbout}
      />

      <Text style={styles.label}>Whatsapp</Text>
      <TextInput
        style={styles.input}
        value={whatsapp}
        keyboardType={"phone-pad"}
        onChangeText={setWhatsapp}
      />

      <Text style={styles.label}>Fotos</Text>

      <View style={styles.uploadedImagesContainer}>
        { images.map(image => (
            <Image 
              key={image}
              source={{uri: image}}
              style={styles.uploadedImage}
            />
          ))}
        <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
          <Feather name="plus" size={24} color="#15B6D6" />
        </TouchableOpacity>
      </View>


      <Text style={styles.title}>Visitação</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={instructions}
        onChangeText={setInstructions}
      />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput
        style={styles.input}
        value={opening_hours}
        onChangeText={setOpeningHours}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <Switch 
          thumbColor="#fff" 
          trackColor={{ false: '#ccc', true: '#39CC83' }} 
          value={open_on_weekends}           
          onValueChange={ () => setOpenOnWeekends(prevState => !prevState)}                  
        />
      </View>

      <RectButton style={styles.nextButton} onPress={handleSubmit}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  )
}