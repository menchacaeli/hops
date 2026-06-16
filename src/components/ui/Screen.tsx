import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Screen({ children, className }: Props) {
  return (
    <SafeAreaView className={`flex-1 bg-amber-50 dark:bg-[#0C0A06] ${className ?? ''}`}>
      {children}
    </SafeAreaView>
  );
}
