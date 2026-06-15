import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

type Props = {
  image: string;
  text: string;
  subtext: string;
  onPress: () => void;
};

const ListThumbnailSeparator = React.memo(function ListThumbnailSeparator({
  image,
  text,
  subtext,
  onPress,
}: Props) {
  return (
    <View style={styles.row}>
      <Image source={{ uri: image }} style={styles.thumbnail} resizeMode="cover" />
      <View style={styles.body}>
        <Text style={styles.title}>{text}</Text>
        <Text style={styles.note} numberOfLines={1}>{subtext}</Text>
      </View>
      <TouchableOpacity onPress={onPress} style={styles.viewButton}>
        <Text style={styles.viewText}>View</Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  body: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 2,
  },
  note: {
    fontSize: 12,
    color: '#666',
  },
  viewButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  viewText: {
    color: '#919c92',
    fontSize: 14,
  },
});

export default ListThumbnailSeparator;
