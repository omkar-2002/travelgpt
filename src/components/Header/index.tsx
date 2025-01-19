import React, {ReactElement, useCallback} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styles from './styles'; // Import styles from a separate file
import {colors} from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';

interface CustomHeaderProps {
  leftIcon?: ReactElement; // Left icon (default is hamburger icon)
  title: string; // Title in the middle
  rightIcon?: string | null; // Right icon (default is null)
  onLeftIconPress?: () => void; // Callback for left icon press
  onRightIconPress?: () => void; // Callback for right icon press
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  leftIcon = null, // Default left icon is hamburger
  title,
  rightIcon = null,
  onLeftIconPress = null,
  onRightIconPress,
}) => {
  const navigation = useNavigation();
  const toggleDrawer = useCallback(() => {
    navigation.openDrawer();
  }, []);
  return (
    <View style={styles.container}>
      {/* Left Icon */}
      {leftIcon ?? (
        <TouchableOpacity
          onPress={onLeftIconPress ?? toggleDrawer}
          style={styles.iconContainer}>
          <Icon name={'menu'} size={30} color={colors.primary} />
        </TouchableOpacity>
      )}

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Right Icon (if provided) */}
      {rightIcon ? (
        <TouchableOpacity
          onPress={onRightIconPress}
          style={styles.iconContainer}>
          <Icon name={rightIcon} size={30} color="#000" />
        </TouchableOpacity>
      ) : (
        <View style={{width: 40}}></View>
      )}
    </View>
  );
};

export default CustomHeader;
