import React, {useState, useRef, useEffect, useCallback, useMemo} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Platform,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import AutoTextBox from '../../components/AutoMessageBox';
import {useAppDispatch} from '../../hook/reduxHooks';
import {addMessage} from '../../store/home/slice';
import {useSelector} from 'react-redux';
import {messagesSelector} from '../../store/home/selector';
import CustomHeader from '../../components/Header';
import styles from './styles';

interface Message {
  id: string;
  sender: 'user' | 'admin';
  type: 'text' | 'audio';
  content: string;
  timestamp: number;
  duration?: string;
}

const categories = [
  '🌴 Holiday',
  '✈️ Flight',
  '🚖 Transfer',
  '🎯 Activity',
  '🏨 Hotel',
];

const Home: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [showRecordingControls, setShowRecordingControls] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState('00:00');
  const [currentAudioPath, setCurrentAudioPath] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const inputRef = useRef<TextInput>(null);
  const messages = useSelector(messagesSelector);
  const flatListRef = useRef<FlatList>(null);
  const previousLength = useRef(messages.length);
  const audioRecorderPlayer = useRef(new AudioRecorderPlayer());

  useEffect(() => {
    checkPermission();
    return () => {
      stopRecording();
      audioRecorderPlayer.current.removeRecordBackListener();
      audioRecorderPlayer.current.removePlayBackListener();
    };
  }, []);

  useEffect(() => {
    if (flatListRef.current && messages.length > previousLength.current) {
      flatListRef.current.scrollToIndex({
        index: messages.length - 1,
        animated: true,
      });
    }
    previousLength.current = messages.length;
  }, [messages]);

  const checkPermission = async () => {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.MICROPHONE
        : PERMISSIONS.ANDROID.RECORD_AUDIO;

    const result = await check(permission);
    if (result !== RESULTS.GRANTED) {
      const permissionResult = await request(permission);
      return permissionResult === RESULTS.GRANTED;
    }
    return true;
  };

  const startRecording = async () => {
    const hasPermission = await checkPermission();
    if (!hasPermission) return;

    setShowRecordingControls(true);
    setIsRecording(true);

    const fileName = `audio_${Date.now()}.m4a`;
    const path = Platform.OS === 'ios' ? `${fileName}` : `sdcard/${fileName}`;

    await audioRecorderPlayer.current.startRecorder(path);

    audioRecorderPlayer.current.addRecordBackListener(e => {
      const time = audioRecorderPlayer.current.mmssss(
        Math.floor(e.currentPosition),
      );
      setRecordingTime(time.slice(0, 5));
    });

    setCurrentAudioPath(path);
  };

  const stopRecording = async () => {
    if (!isRecording) return;

    const result = await audioRecorderPlayer.current.stopRecorder();
    audioRecorderPlayer.current.removeRecordBackListener();

    setShowRecordingControls(false);
    setIsRecording(false);

    if (currentAudioPath) {
      // Save audio path to AsyncStorage
      const audioMessages =
        (await AsyncStorage.getItem('audioMessages')) || '[]';
      const messages = JSON.parse(audioMessages);
      messages.push(currentAudioPath);
      await AsyncStorage.setItem('audioMessages', JSON.stringify(messages));

      // Dispatch audio message
      dispatch(
        addMessage({
          sender: 'user',
          type: 'audio',
          content: currentAudioPath,
          duration: recordingTime,
        }),
      );
    }

    setRecordingTime('00:00');
  };

  const playAudio = async (audioPath: string) => {
    try {
      if (isPlaying === audioPath) {
        await audioRecorderPlayer.current.stopPlayer();
        setIsPlaying(null);
        return;
      }

      if (isPlaying) {
        await audioRecorderPlayer.current.stopPlayer();
      }

      await audioRecorderPlayer.current.startPlayer(audioPath);
      setIsPlaying(audioPath);

      audioRecorderPlayer.current.addPlayBackListener(e => {
        if (e.currentPosition === e.duration) {
          audioRecorderPlayer.current.stopPlayer();
          audioRecorderPlayer.current.removePlayBackListener();
          setIsPlaying(null);
        }
      });
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlaying(null);
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

  const renderMessage = ({item}: {item: Message}) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === 'user'
          ? styles.userMessageContainer
          : styles.adminMessageContainer,
      ]}>
      {item.type === 'text' ? (
        <View
          style={[
            styles.textMessage,
            item.sender === 'user' ? styles.userBubble : styles.adminBubble,
          ]}>
          <Text
            style={[
              styles.messageText,
              {color: item.sender === 'user' ? 'white' : 'black'},
            ]}>
            {item.content}
          </Text>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.audioMessage}
          onPress={() => playAudio(item.content)}>
          <Icon
            name={isPlaying === item.content ? 'stop' : 'play-arrow'}
            size={24}
            color="#FFF"
          />
          <View style={styles.audioWaveform} />
          {item.duration && (
            <Text style={styles.audioDuration}>{item.duration}</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );

  const emptyComponent = useMemo(() => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={{textAlign: 'center'}}>
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
        keyExtractor={item => item.id}
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
            <View style={styles.recordingContainer}>
              <Animated.View style={styles.recordingIndicator} />
              <Text style={styles.recordingTime}>{recordingTime}</Text>
            </View>
          )}

          {!showRecordingControls ? (
            <>
              <TouchableOpacity onPress={startRecording}>
                <Icon name="mic" size={24} color="#666" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.sendButton}
                onPress={sendTextMessage}>
                <AntDesign name="arrowup" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={[styles.micButton, styles.stopRecording]}
              onPress={stopRecording}>
              <Icon name="stop" size={24} color="#FFF" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Home;
