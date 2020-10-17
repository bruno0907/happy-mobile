import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  calloutContainer:{
    backgroundColor: '#FFFFFF',
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

export default styles