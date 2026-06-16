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
  const iconColor = scheme === 'dark' ? '#4ADE80' : '#166534';
  const chevronColor = scheme === 'dark' ? '#F59E0B' : '#FCD34D';

  return (
    <TouchableOpacity
      className="flex-row items-center py-4 px-4 bg-white dark:bg-[#1A140A] border-b border-amber-100 dark:border-[#2E2010]"
      onPress={() => navigation.navigate(stack)}
    >
      <View className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-[#261C0E] items-center justify-center">
        <FontAwesome5 name={icon} size={18} color={iconColor} />
      </View>
      <Text className="flex-1 ml-3 text-stone-900 dark:text-amber-50 font-medium text-base">
        {text}
      </Text>
      <FontAwesome5 name="chevron-right" size={14} color={chevronColor} />
    </TouchableOpacity>
  );
};

export default ListIcon;
