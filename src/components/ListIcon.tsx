import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';

type Props = {
  text: string;
  icon: string;
  stack: string;
  navigation: NavigationProp<Record<string, undefined>>;
};

const ListIcon = ({ text, icon, stack, navigation }: Props) => {
  return (
    <TouchableOpacity style={styles.row} onPress={() => navigation.navigate(stack)}>
      <View style={styles.left}>
        <FontAwesome5 name={icon} size={18} color="#71bc78" />
      </View>
      <View style={styles.body}>
        <Text style={styles.text}>{text}</Text>
      </View>
      <View style={styles.right}>
        <FontAwesome5 name="chevron-right" size={14} color="#919c92" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  left: {
    width: 36,
    alignItems: 'center',
  },
  body: {
    flex: 1,
    paddingHorizontal: 8,
  },
  right: {
    width: 24,
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
  },
});

export default ListIcon;
