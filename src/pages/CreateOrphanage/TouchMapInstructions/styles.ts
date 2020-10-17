import { Dimensions, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  modal: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,    
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(21, 182, 214)',
  },
  modalText: {
    fontFamily: 'Nunito600',
    fontSize: 24,
    lineHeight: 35,
    color: '#FFFFFF',
    textAlign: 'center',
    width: 203
  }
})

export default styles