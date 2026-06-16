import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
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

const ListThumbnail = React.memo(function ListThumbnail({
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
    <View className="flex-row items-center py-4 px-4 bg-white dark:bg-[#1A140A] border-b border-amber-100 dark:border-[#2E2010]">
      <View className="w-14 h-14 rounded-full border-2 border-amber-200 dark:border-[#2E2010] bg-amber-100 dark:bg-[#261C0E] mr-3 overflow-hidden">
        <Image source={{ uri: image }} className="w-full h-full" resizeMode="cover" />
      </View>
      <View className="flex-1">
        <Text className="text-stone-900 dark:text-amber-50 font-semibold text-base mb-0.5" numberOfLines={1}>
          {text}
        </Text>
        <Text className="text-stone-500 dark:text-amber-200 text-xs" numberOfLines={2}>
          {subtext}
        </Text>
        {releaseDate ? (
          <Text className="text-stone-500 dark:text-amber-200 text-xs" numberOfLines={1}>
            {releaseDate}
          </Text>
        ) : null}
        <View className="flex-row items-center mt-1">
          <StarRating
            disabled={isReadOnly}
            maxStars={5}
            rating={rating}
            starSize={14}
            color="#FBBF24"
            starStyle={{ paddingRight: 1 }}
            onChange={onStarRatingPress ?? (() => {})}
          />
          <Text className="text-stone-500 dark:text-amber-200 text-xs ml-2">
            {isReadOnly ? 'Rating' : 'Rate'}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={onPress}
        className="bg-green-800 dark:bg-green-400 rounded-full px-3 py-1 ml-2"
      >
        <Text className="text-white dark:text-[#0C0A06] text-xs font-semibold">View</Text>
      </TouchableOpacity>
    </View>
  );
});

export default ListThumbnail;
