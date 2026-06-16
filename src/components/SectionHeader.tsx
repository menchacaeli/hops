import React from 'react';
import { View, Text } from 'react-native';

type Props = {
  label: string;
};

export default function SectionHeader({ label }: Props) {
  return (
    <View className="mb-2 px-1">
      <Text className="text-atelier-text-muted dark:text-atelier-text-muted-dark font-bold text-xs tracking-widest uppercase mb-1">
        {label}
      </Text>
      <View className="h-px bg-atelier-separator dark:bg-atelier-separator-dark" />
    </View>
  );
}
