import React from 'react';
import { View } from 'react-native';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className }: Props) {
  return (
    <View className={['bg-white dark:bg-[#1A140A] rounded-2xl border border-amber-200 dark:border-[#2E2010] p-4', className].filter(Boolean).join(' ')}>
      {children}
    </View>
  );
}
