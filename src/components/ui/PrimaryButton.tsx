import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

type Props = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'filled' | 'outline';
  className?: string;
};

export default function PrimaryButton({
  label,
  onPress,
  disabled = false,
  variant = 'filled',
  className,
}: Props) {
  const base = 'rounded-full py-4 px-6 items-center';
  const filled = 'bg-amber-600 dark:bg-amber-500';
  const outline = 'border-2 border-green-800 dark:border-green-400';
  const containerClass = `${base} ${variant === 'outline' ? outline : filled} ${disabled ? 'opacity-50' : ''} ${className ?? ''}`;

  const labelFilled = 'text-white font-bold text-base tracking-wide';
  const labelOutline = 'text-green-800 dark:text-green-400 font-bold text-base';

  return (
    <TouchableOpacity
      className={containerClass}
      onPress={disabled ? undefined : onPress}
      activeOpacity={0.8}
    >
      <Text className={variant === 'outline' ? labelOutline : labelFilled}>{label}</Text>
    </TouchableOpacity>
  );
}
