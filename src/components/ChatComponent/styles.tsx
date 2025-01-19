// components/ChatMessage/styles.ts
import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../constants/colors';
const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  messageContainer: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  adminMessageContainer: {
    justifyContent: 'flex-start',
  },
  textMessage: {
    borderRadius: 12,
    maxWidth: width * 0.7,
    padding: 12,
  },
  userBubble: {
    backgroundColor: `${colors.grey.primary}70`,
    alignSelf: 'flex-end',
    borderTopEndRadius: 0,
  },
  adminBubble: {
    backgroundColor: colors.grey.light,
    alignSelf: 'flex-start',
    borderTopLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
  },
  audioMessage: {
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.6,
    borderTopEndRadius: 0,
    justifyContent: 'space-between',
    backgroundColor: `${colors.grey.primary}70`,
  },
  audioWaveform: {
    height: 30,
    flex: 1,
    marginLeft: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 15,
  },

  playButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  lottieContainer: {
    width: '65%',
    height: 30,
  },
  recordingTime: {
    marginLeft: 8,
    color: colors.black,
    fontSize: 12,
  },
});
