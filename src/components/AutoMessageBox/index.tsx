import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

type AutoTextBoxProps = {
  text: string;
  isActive: boolean;
  onClick: () => {};
};

const AutoTextBox: React.FC<AutoTextBoxProps> = ({isActive, text, onClick}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        paddingHorizontal: 6,
        paddingVertical: 4,
        borderWidth: 1,
        borderColor: isActive ? 'black' : '#D3D3D3',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginHorizontal: 6,
        marginVertical: 6,
      }}>
      <Text style={{fontWeight: 'bold', color: isActive ? 'black' : '#D3D3D3'}}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default AutoTextBox;
