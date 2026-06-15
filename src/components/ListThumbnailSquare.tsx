import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import StarRating from 'react-native-star-rating-widget';

type Props = {
  image: string;
  text: string;
  subtext: string;
  onPress: () => void;
  releaseDate?: string;
  rating: number;
  isReadOnly: boolean;
  onStarRatingPress?: (rating: number) => void;
};

const ListThumbnailSquare = React.memo(function ListThumbnailSquare({
  image,
  text,
  subtext,
  onPress,
  releaseDate,
  rating,
  isReadOnly,
  onStarRatingPress,
}: Props) {
  return (
    <View style={styles.row}>
      <Image source={{ uri: image }} style={styles.thumbnail} resizeMode="contain" />
      <View style={styles.body}>
        <Text style={styles.title}>{text}</Text>
        <Text style={styles.note} numberOfLines={1}>{subtext}</Text>
        {releaseDate ? (
          <Text style={styles.note} numberOfLines={1}>{releaseDate}</Text>
        ) : null}
        <View style={styles.starContainer}>
          <StarRating
            disabled={isReadOnly}
            maxStars={5}
            rating={rating}
            starSize={16}
            color={isReadOnly ? 'gray' : 'gold'}
            starStyle={styles.star}
            onChange={onStarRatingPress ?? (() => {})}
          />
          <Text style={styles.rateLabel}>{isReadOnly ? 'Rating' : 'Rate'}</Text>
        </View>
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
    width: 56,
    height: 56,
    marginRight: 12,
    borderRadius: 4,
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
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  star: {
    paddingRight: 2,
  },
  rateLabel: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
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

export default ListThumbnailSquare;
