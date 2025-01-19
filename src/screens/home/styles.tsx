import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatList: {
    flex: 1,
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    padding: 30,
    justifyContent: 'flex-start',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
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
    borderRadius: 20,
    maxWidth: width * 0.7,
    padding: 12,
  },
  userBubble: {
    backgroundColor: '#0084ff',
    alignSelf: 'flex-end',
  },
  adminBubble: {
    backgroundColor: '#E4E6EB',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  audioMessage: {
    backgroundColor: '#0084ff',
    borderRadius: 20,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.6,
  },
  audioWaveform: {
    height: 30,
    flex: 1,
    marginLeft: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 15,
  },
  inputContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: 'rgb(249,249,249)',
  },
  inputBox: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 100,
    borderRadius: 20,
  },
  sendButton: {
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 6,
    backgroundColor: 'rgb(117,174,183)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  stopRecording: {
    backgroundColor: '#FF4444',
  },
  recordingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordingIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF4444',
    marginRight: 10,
  },
  recordingTime: {
    color: '#666',
    fontSize: 16,
  },
  recordingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
  recordingIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF0000',
    marginRight: 10,
    opacity: 0.8,
  },
  recordingTime: {
    color: '#666666',
    fontSize: 14,
    fontWeight: '500',
  },
  audioMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4A90E2',
    padding: 12,
    borderRadius: 20,
    maxWidth: '70%',
    marginVertical: 2,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  audioWaveform: {
    width: 100,
    height: 30,
    backgroundColor: '#6AA9E9',
    marginHorizontal: 10,
    borderRadius: 15,
    opacity: 0.7,
  },
  audioDuration: {
    color: '#FFFFFF',
    marginLeft: 10,
    fontSize: 12,
    fontWeight: '500',
  },
  micButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  stopRecording: {
    backgroundColor: '#FF4444',
  },
  audioPlayerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 5,
  },
  playPauseButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  messageAudioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 16,
    backgroundColor: '#4A90E2',
    maxWidth: '80%',
  },
  audioProgressBar: {
    height: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    flex: 1,
    marginHorizontal: 10,
  },
  audioControlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});

export default styles;
