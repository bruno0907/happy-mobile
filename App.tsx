import React, { useRef, useState } from 'react';
import { RectButton } from 'react-native-gesture-handler';
import { AppLoading } from 'expo';

import { Image, StyleSheet, Dimensions } from 'react-native'
import { Feather } from '@expo/vector-icons'

import Onboarding from 'react-native-onboarding-swiper'

import { useFonts } from 'expo-font'
import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito'

// import PostSplash from './src/components/PostSplash'

import Routes from './src/routes'
import OnboardingImagePage1 from './src/images/onboardingPage1.png'
import OnboardingImagePage2 from './src/images/onboardingPage2.png'

export default function App() {  
  const [showApp, setShowApp] = useState(false)
  const onboardingRef = useRef<any>(null)

  const goNext = () => onboardingRef.current.goNext()
  const Done = () => setShowApp(true)

  const [ fontsLoaded ] = useFonts({
    Nunito600: Nunito_600SemiBold, 
    Nunito700: Nunito_700Bold, 
    Nunito800: Nunito_800ExtraBold
  })  

  if(!fontsLoaded){
    return(
      // <PostSplash />   
      <AppLoading /> 
    )
  }

  return (
    <>
    { !showApp ?
      <Onboarding         
        showSkip={false}        
        bottomBarColor="#F2F3F5"

        NextButtonComponent={() => 
          <RectButton style={styles.nextButton} onPress={goNext}>
            <Feather name="arrow-right" size={30} color="#15B6D6"/>
          </RectButton>
        }
        
        DoneButtonComponent={() =>
          <RectButton style={styles.nextButton} onPress={Done}>
            <Feather name="arrow-right" size={30} color="#15B6D6"/>
          </RectButton>
        }

        containerStyles={{    
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',          
        }} 
        
        titleStyles={{
          color: '#0089A5',
          fontFamily: 'Nunito800',          
        }}   

        ref={onboardingRef}

        pages={[
          {
            backgroundColor: '#F2F3F5',            
            image: <Image source={OnboardingImagePage1} style={{ marginTop: 40, marginBottom: -20}} />,
            title: 'Leve \nfelicidade \npara o \nmundo',            
            subtitle: 'Visite orfanatos e mude o \ndia de muitas crianças.',
            titleStyles: {
              fontSize: 48,
              lineHeight: 48,     
              width: (Dimensions.get('window').width - 80),
              textAlign: 'left',              
            },
            subTitleStyles: {
              color: '#5C8599',
              fontFamily: 'Nunito600',
              fontSize: 20,                          
              lineHeight: 30,            
              textAlign: 'left',
              width: (Dimensions.get('window').width - 80),
            }
          },
          {
            backgroundColor: '#F2F3F5',
            image: <Image source={OnboardingImagePage2} style={{ marginTop: 40, marginBottom: -20}} />,
            title: 'Escolha um\n orfanato no mapa\n e faça uma visita',
            subtitle: '',
            titleStyles: {
              fontSize: 30,
              lineHeight: 36,
              width: (Dimensions.get('window').width - 80),
              textAlign: 'right',              
            },
          },   
        ]}
      />
      :      
      <Routes />
    }
    </>
  );
}

const styles = StyleSheet.create({
  nextButton: { 
    width: 56, 
    height: 56, 
    borderRadius: 20, 
    backgroundColor: '#D1EDF2', 
    marginRight: 40,     
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textPage1: {

  }
})