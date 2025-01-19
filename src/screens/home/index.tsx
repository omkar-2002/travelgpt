import React, {useState, useRef, useEffect, useMemo, useCallback} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Platform,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFetchBlob from 'rn-fetch-blob';
import AutoTextBox from '../../components/AutoMessageBox';
import {useAppDispatch} from '../../hook/reduxHooks';
import {addMessage} from '../../store/home/slice';
import {useSelector} from 'react-redux';
import {messagesSelector} from '../../store/home/selector';
import CustomHeader from '../../components/Header';
import styles from './styles';
import {colors} from '../../constants/colors';
import LottieView from 'lottie-react-native';
import ChatComponent from '../../components/ChatComponent';
import {requestPermissions} from '../../hook/requestPermission';
const recordingLottie = require('../../assets/lottie/recorder.json');

const categories = [
  '🌴 Holiday',
  '✈️ Flight',
  '🚖 Transfer',
  '🎯 Activity',
  '🏨 Hotel',
];

interface Message {
  id: number;
  sender: 'user' | 'admin';
  type: 'text' | 'voice';
  content: string;
  timestamp: string;
  duration: string;
}

const Home: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [showRecordingControls, setShowRecordingControls] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState('00:00');
  const [currentAudioPath, setCurrentAudioPath] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState<{
    [key: string]: string;
  }>({});
  const [recordingDuration, setRecordingDuration] = useState('00:00');

  const dispatch = useAppDispatch();
  const inputRef = useRef<TextInput>(null);
  const messages = useSelector(messagesSelector);
  const flatListRef = useRef<FlatList>(null);
  const previousLength = useRef(messages.length);
  const audioRecorderPlayer = useRef(new AudioRecorderPlayer());
  const recordBackListener = useRef<any>(null);
  const playBackListener = useRef<any>(null);
  const lottieRefs = useRef<{[key: string]: any}>({});

  useEffect(() => {
    requestPermissions();
    return () => {
      cleanup();
    };
  }, []);

  const cleanup = async () => {
    try {
      if (isRecording) {
        await stopRecording();
      }
      if (isPlaying) {
        await audioRecorderPlayer.current.stopPlayer();
      }
      if (recordBackListener.current) {
        audioRecorderPlayer.current.removeRecordBackListener();
      }
      if (playBackListener.current) {
        audioRecorderPlayer.current.removePlayBackListener();
      }
    } catch (error) {
      console.error('Cleanup error:', error);
    }
  };

  useEffect(() => {
    if (flatListRef.current && messages.length > previousLength.current) {
      flatListRef.current.scrollToIndex({
        index: messages.length - 1,
        animated: true,
      });
    }
    previousLength.current = messages.length;
  }, [messages]);

  const getAudioFilePath = () => {
    const fileName = `audio_${Date.now()}.m4a`;
    if (Platform.OS === 'android') {
      return `${RNFetchBlob.fs.dirs.CacheDir}/${fileName}`;
    }
    return fileName;
  };

  const startRecording = async () => {
    try {
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        return;
      }

      setShowRecordingControls(true);
      setIsRecording(true);
      setRecordingTime('00:00');

      const audioPath = getAudioFilePath();

      await audioRecorderPlayer.current.startRecorder(audioPath);
      setCurrentAudioPath(audioPath);

      recordBackListener.current =
        audioRecorderPlayer.current.addRecordBackListener(e => {
          const seconds = Math.floor(e.currentPosition / 1000);
          const minutes = Math.floor(seconds / 60);
          const remainingSeconds = seconds % 60;
          const timeString = `${minutes
            .toString()
            .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
          setRecordingTime(timeString);
          setRecordingDuration(timeString); // Store the duration as it updates
        });
    } catch (error) {
      console.error('Start recording error:', error);
      setShowRecordingControls(false);
      setIsRecording(false);
      Alert.alert('Error', 'Failed to start recording. Please try again.');
    }
  };

  const stopRecording = async () => {
    if (!isRecording) return;

    try {
      const result = await audioRecorderPlayer.current.stopRecorder();
      console.log('Recording stopped:', result);

      if (recordBackListener.current) {
        audioRecorderPlayer.current.removeRecordBackListener();
        recordBackListener.current = null;
      }

      setShowRecordingControls(false);
      setIsRecording(false);

      if (currentAudioPath) {
        dispatch(
          addMessage({
            sender: 'user',
            type: 'voice',
            content: currentAudioPath,
            duration: recordingDuration, // Add the final duration
          }),
        );
      }

      setRecordingTime('00:00');
      setRecordingDuration('00:00');
      setCurrentAudioPath(null);
    } catch (error) {
      console.error('Stop recording error:', error);
      Alert.alert('Error', 'Failed to stop recording. Please try again.');
    }
  };

  const deleteRecording = async () => {
    try {
      // Stop recording first if it's ongoing
      if (isRecording) {
        await audioRecorderPlayer.current.stopRecorder();
        if (recordBackListener.current) {
          audioRecorderPlayer.current.removeRecordBackListener();
          recordBackListener.current = null;
        }
      }

      // Delete the file if it exists
      if (currentAudioPath) {
        try {
          await RNFetchBlob.fs.unlink(currentAudioPath);
        } catch (error) {
          console.log('File deletion error:', error);
        }
      }

      // Reset all recording states
      setShowRecordingControls(false);
      setIsRecording(false);
      setRecordingTime('00:00');
      setRecordingDuration('00:00');
      setCurrentAudioPath(null);
    } catch (error) {
      console.error('Delete recording error:', error);
      Alert.alert('Error', 'Failed to delete recording. Please try again.');
    }
  };

  const playAudio = async (audioPath: string) => {
    try {
      if (isPlaying === audioPath) {
        await audioRecorderPlayer.current.stopPlayer();
        setIsPlaying(null);
        if (lottieRefs.current[audioPath]) {
          lottieRefs.current[audioPath].pause();
        }
        return;
      }

      if (isPlaying) {
        await audioRecorderPlayer.current.stopPlayer();
        if (lottieRefs.current[isPlaying]) {
          lottieRefs.current[isPlaying].pause();
        }
      }

      await audioRecorderPlayer.current.startPlayer(audioPath);
      setIsPlaying(audioPath);

      if (lottieRefs.current[audioPath]) {
        lottieRefs.current[audioPath].play();
      }

      if (playBackListener.current) {
        audioRecorderPlayer.current.removePlayBackListener();
      }

      playBackListener.current =
        audioRecorderPlayer.current.addPlayBackListener(e => {
          const seconds = Math.floor(e.currentPosition / 1000);
          const minutes = Math.floor(seconds / 60);
          const remainingSeconds = seconds % 60;
          const timeString = `${minutes
            .toString()
            .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;

          setCurrentPlaybackTime(prev => ({
            ...prev,
            [audioPath]: timeString,
          }));

          if (e.currentPosition === e.duration) {
            audioRecorderPlayer.current.stopPlayer();
            if (playBackListener.current) {
              audioRecorderPlayer.current.removePlayBackListener();
              playBackListener.current = null;
            }
            setIsPlaying(null);
            if (lottieRefs.current[audioPath]) {
              lottieRefs.current[audioPath].pause();
            }
          }
        });
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlaying(null);
      Alert.alert('Error', 'Failed to play audio. Please try again.');
    }
  };

  const sendTextMessage = () => {
    if (!inputText.trim()) return;

    dispatch(
      addMessage({
        sender: 'user',
        type: 'text',
        content: inputText.trim(),
      }),
    );
    setInputText('');
  };

  const renderMessage = useCallback(
    ({item}: {item: Message}) => {
      return (
        <ChatComponent
          item={item}
          isPlaying={isPlaying}
          currentPlaybackTime={currentPlaybackTime}
          onPlayAudio={playAudio}
          lottieRefs={lottieRefs}
          recordingLottie={recordingLottie}
        />
      );
    },
    [isPlaying, currentPlaybackTime],
  );

  const emptyComponent = useMemo(() => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={{textAlign: 'center', color: colors.black}}>
          Hi There! 👋 My name is Tratoli. How can I assist you today?
        </Text>
        <View style={styles.categoryContainer}>
          {categories.map(item => (
            <AutoTextBox
              key={item}
              onClick={() => setActiveCategory(item)}
              text={item}
              isActive={activeCategory === item}
            />
          ))}
        </View>
      </View>
    );
  }, [activeCategory]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
      <CustomHeader title="🌎 Travel GPT" />
      <FlatList
        data={messages}
        ref={flatListRef}
        renderItem={renderMessage}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{paddingBottom: 20}}
        ListEmptyComponent={emptyComponent}
        getItemLayout={(_, index) => ({
          length: 70,
          offset: 70 * index,
          index,
        })}
        onScrollToIndexFailed={info => {
          if (flatListRef.current) {
            flatListRef.current.scrollToOffset({
              offset: info.averageItemLength * info.index,
              animated: true,
            });
          }
        }}
        style={styles.chatList}
      />

      <View style={styles.inputContainer}>
        <View style={styles.inputBox}>
          {!showRecordingControls ? (
            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholder="Ask Anything..."
              placeholderTextColor="#D3D3D3"
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
          ) : (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
                marginVertical: 4,
              }}>
              <TouchableOpacity onPress={deleteRecording}>
                <Feather name="trash" size={22} color={'#00000080'} />
              </TouchableOpacity>
              <View
                style={[
                  styles.recordingContainer,
                  {
                    backgroundColor: `${colors.primary}40`,
                    paddingVertical: 6,
                    borderRadius: 12,
                    marginHorizontal: 16,
                    marginRight: 12,
                  },
                ]}>
                {/* <Animated.View style={styles.recordingIndicator} /> */}

                <LottieView
                  autoPlay
                  source={recordingLottie}
                  style={{width: '80%', height: 30}}
                />
                <Text style={styles.recordingTime}>{recordingTime}</Text>
              </View>
            </View>
          )}

          <>
            {!showRecordingControls && (
              <TouchableOpacity onPress={startRecording}>
                <Icon name="mic" size={24} color="#666" />
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.sendButton}
              onPress={showRecordingControls ? stopRecording : sendTextMessage}>
              <AntDesign name="arrowup" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Home;
