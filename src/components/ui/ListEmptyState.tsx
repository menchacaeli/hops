import React from 'react';
import { Text, View } from 'react-native';

type Props = {
  label: string;
};

export default function ListEmptyState({ label }: Props) {
  return (
    <View className="items-center justify-center py-8 px-4">
      <Text className="text-atelier-text-muted dark:text-atelier-text-muted-dark text-sm text-center">
        {label}
      </Text>
    </View>
  );
}
