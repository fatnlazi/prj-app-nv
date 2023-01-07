import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  flexColumnCenter: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  flexColumnStart: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  flexRowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  flexRowStart: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  flexRowEnd: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  borderRound: {
    borderRadius: 12,
  },

  borderRoundTop: {
    borderTopStartRadius: 12,
    borderTopEndRadius: 12,
  },

  borderRoundBottom: {
    borderBottomStartRadius: 12,
    borderBottomEndRadius: 12,
  },

  border: {
    borderWidth: 1,
  },

  borderTop: {
    borderTopWidth: 1,
  },
});
