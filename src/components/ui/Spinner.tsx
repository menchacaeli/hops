import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { theme } from '../../styles/theme';

type Props = {
  size?: 'small' | 'large';
};

export default function Spinner({ size = 'large' }: Props) {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator color={theme.color.accent} size={size} />
    </View>
  );
}
