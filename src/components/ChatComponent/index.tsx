// components/ChatMessage/index.tsx
import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LottieView from 'lottie-react-native';
import {colors} from '../../constants/colors';
import {styles} from './styles';

interface ChatMessageProps {
  item: {
    sender: 'user' | 'admin';
    type: 'text' | 'voice';
    content: string;
    duration?: string;
  };
  isPlaying: string | null;
  currentPlaybackTime: {[key: string]: string};
  onPlayAudio: (path: string) => void;
  lottieRefs: React.MutableRefObject<{[key: string]: any}>;
  recordingLottie: any;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  item,
  isPlaying,
  currentPlaybackTime,
  onPlayAudio,
  lottieRefs,
  recordingLottie,
}) => {
  return (
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
          <Text style={[styles.messageText, {color: 'black'}]}>
            {item.content}
          </Text>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.audioMessage}
          onPress={() => onPlayAudio(item.content)}>
          <View style={styles.playButton}>
            <Icon
              name={isPlaying === item.content ? 'stop' : 'play-arrow'}
              size={16}
              color={colors.black}
            />
          </View>
          <LottieView
            ref={ref => {
              if (ref) {
                lottieRefs.current[item.content] = ref;
              }
            }}
            autoPlay={false}
            loop={true}
            source={recordingLottie}
            style={styles.lottieContainer}
          />
          <Text style={styles.recordingTime}>
            {isPlaying === item.content
              ? currentPlaybackTime[item.content]
              : item.duration || '00:00'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default React.memo(ChatMessage);
