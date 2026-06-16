import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import StarRating, { StarRatingDisplay } from 'react-native-star-rating-widget';

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
    <View className="flex-row items-center py-4 px-4 bg-transparent border-b border-atelier-separator dark:border-atelier-separator-dark">
      <View className="w-16 h-16 rounded-xl bg-atelier-bg-elevated dark:bg-atelier-bg-elevated-dark mr-3 overflow-hidden">
        {image ? <Image source={{ uri: image }} className="w-full h-full" resizeMode="contain" /> : null}
      </View>
      <View className="flex-1 pr-2">
        <Text className="text-atelier-text dark:text-atelier-text-inverse font-semibold text-base mb-0.5" numberOfLines={1}>
          {text}
        </Text>
        <Text className="text-atelier-text-muted dark:text-atelier-text-muted-dark text-xs" numberOfLines={2}>
          {subtext}
        </Text>
        {releaseDate ? (
          <Text className="text-atelier-text-muted dark:text-atelier-text-muted-dark text-xs" numberOfLines={1}>
            {releaseDate}
          </Text>
        ) : null}
        <View className="flex-row items-center mt-1">
          {isReadOnly ? (
            <StarRatingDisplay
              maxStars={5}
              rating={rating ?? 0}
              starSize={14}
              color="#C8872C"
              starStyle={{ paddingRight: 1 }}
            />
          ) : (
            <StarRating
              maxStars={5}
              rating={rating ?? 0}
              starSize={14}
              color="#C8872C"
              starStyle={{ paddingRight: 1 }}
              onChange={onStarRatingPress ?? (() => {})}
            />
          )}
          <Text className="text-atelier-text-muted dark:text-atelier-text-muted-dark text-xs ml-2">
            {isReadOnly ? 'Rating' : 'Rate'}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={onPress}
        className="bg-atelier-success rounded-full min-w-14 px-3 py-1.5 ml-2 items-center"
      >
        <Text className="text-atelier-text-inverse text-xs font-semibold">View</Text>
      </TouchableOpacity>
    </View>
  );
});

export default ListThumbnailSquare;
