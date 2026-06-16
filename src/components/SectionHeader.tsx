import React from 'react';
import { View, Text } from 'react-native';

type Props = {
  label: string;
};

export default function SectionHeader({ label }: Props) {
  return (
    <View className="bg-amber-50 dark:bg-[#1A140A] border-l-4 border-green-800 dark:border-amber-500 pl-4 py-2">
      <Text className="text-green-800 dark:text-amber-400 font-bold text-xs tracking-widest uppercase">
        {label}
      </Text>
    </View>
  );
}
