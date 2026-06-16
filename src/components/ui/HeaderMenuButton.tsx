import React from 'react';
import { ActionSheetIOS, Alert, Platform, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { theme } from '../../styles/theme';

type Props = {
  onProfile: () => void;
  onSignOut: () => void;
  rightOffset?: number;
};

export default function HeaderMenuButton({ onProfile, onSignOut, rightOffset = 0 }: Props) {
  const onPress = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Profile', 'Sign out'],
          cancelButtonIndex: 0,
          destructiveButtonIndex: 2,
          userInterfaceStyle: 'light',
        },
        buttonIndex => {
          if (buttonIndex === 1) onProfile();
          if (buttonIndex === 2) onSignOut();
        },
      );
      return;
    }

    Alert.alert('Menu', 'Choose an action', [
      { text: 'Profile', onPress: onProfile },
      { text: 'Sign out', style: 'destructive', onPress: onSignOut },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityLabel="Open menu"
      hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
      style={{
        marginRight: rightOffset,
        backgroundColor: 'transparent',
        width: 28,
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <FontAwesome5 name="bars" size={18} color={theme.color.success} />
    </TouchableOpacity>
  );
}