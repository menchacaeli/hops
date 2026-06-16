import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className }: Props) {
  return (
    <View className={['rounded-2xl overflow-hidden border border-atelier-border dark:border-atelier-border-dark bg-atelier-surface dark:bg-atelier-surface-dark p-4', className].filter(Boolean).join(' ')}>
      {Platform.OS === 'ios' ? (
        <BlurView
          pointerEvents="none"
          tint="light"
          intensity={26}
          style={StyleSheet.absoluteFill}
        />
      ) : null}
      {children}
    </View>
  );
}
