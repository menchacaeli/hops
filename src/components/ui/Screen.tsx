import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  children: React.ReactNode;
  className?: string;
  includeTopInset?: boolean;
};

export default function Screen({ children, className, includeTopInset = false }: Props) {
  const edges = includeTopInset ? ['top', 'left', 'right', 'bottom'] : ['left', 'right', 'bottom'];

  return (
    <SafeAreaView edges={edges} className={`flex-1 bg-atelier-bg dark:bg-atelier-bg-dark ${className ?? ''}`}>
      {children}
    </SafeAreaView>
  );
}
