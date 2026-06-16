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
  const filled = 'bg-atelier-accent active:bg-atelier-accent-pressed';
  const outline = 'border-2 border-atelier-success';
  const containerClass = [base, variant === 'outline' ? outline : filled, disabled ? 'opacity-50' : '', className].filter(Boolean).join(' ');

  const labelFilled = 'text-atelier-text-inverse font-bold text-base tracking-wide';
  const labelOutline = 'text-atelier-success font-bold text-base';

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
