import React from 'react';
import { ActivityIndicator, View } from 'react-native';

type Props = {
  size?: 'small' | 'large';
};

export default function Spinner({ size = 'large' }: Props) {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator color="#FBBF24" size={size} />
    </View>
  );
}
