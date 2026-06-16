import React from 'react';
import { TouchableOpacity, View, Text, useColorScheme } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';

type Props = {
  text: string;
  icon: string;
  stack: string;
  navigation: NavigationProp<Record<string, undefined>>;
};

const ListIcon = ({ text, icon, stack, navigation }: Props) => {
  const scheme = useColorScheme();
  const iconColor = scheme === 'dark' ? '#3E7E62' : '#3E7E62';
  const chevronColor = scheme === 'dark' ? '#C8872C' : '#A56E20';

  return (
    <TouchableOpacity
      className="flex-row items-center py-4 px-4 bg-transparent border-b border-atelier-separator dark:border-atelier-separator-dark"
      onPress={() => navigation.navigate(stack)}
    >
      <View className="w-9 h-9 rounded-xl bg-atelier-bg-elevated dark:bg-atelier-bg-elevated-dark items-center justify-center">
        <FontAwesome5 name={icon} size={18} color={iconColor} />
      </View>
      <Text className="flex-1 ml-3 text-atelier-text dark:text-atelier-text-inverse font-medium text-base">
        {text}
      </Text>
      <FontAwesome5 name="chevron-right" size={14} color={chevronColor} />
    </TouchableOpacity>
  );
};

export default ListIcon;
