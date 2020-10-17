import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontFamily: 'Nunito800',
    fontSize: 16,
    color: '#FFF',
  },

  modal: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,        
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(21, 182, 214, 0.8)',
    position: 'absolute',
    zIndex: 1,
  },

  modalText: {
    fontFamily: 'Nunito700',
    fontSize: 24,
    lineHeight: 35,
    color: '#FFFFFF',
    textAlign: 'center',
    width: 203,
    marginTop: 12,
    marginBottom: 42
  }
})

export default styles