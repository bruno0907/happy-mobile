import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#39CC83',
    alignItems: 'center',
    justifyContent: 'center'
  },

  title: {
    fontFamily: 'Nunito800',
    color: '#FFFFFF',
    fontSize: 40,
    marginBottom: 20
  },

  text: {
    fontFamily: 'Nunito600',
    color: '#FFFFFF',
    fontSize: 20,
    width: 300,
    marginBottom: 20
  },

  button: {
    width: 120,
    height: 56,
    borderRadius: 20,   
    backgroundColor: '#19C06D',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  }, 

  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'Nunito800',
    fontSize: 15,    
  }
})

export default styles