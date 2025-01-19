import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../constants/colors';

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
    paddingVertical: 4,
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 100,
    borderRadius: 20,
    color: colors.black,
  },
  sendButton: {
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 6,
    backgroundColor: colors.primary,
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
