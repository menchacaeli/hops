import React from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { StarRatingDisplay } from 'react-native-star-rating-widget';

type Props = {
  visible: boolean;
  header: string;
  address: string;
  phone: string;
  image: string;
  rating: number;
  closeModal: () => void;
  isFavorite: boolean;
  removeFromFavorites?: () => void;
  addToFavorites?: () => void;
  isReadOnly: boolean;
};

const BreweryModal = ({
  visible,
  header,
  address,
  phone,
  image,
  rating,
  closeModal,
  isFavorite,
  removeFromFavorites,
  addToFavorites,
  isReadOnly,
}: Props) => {
  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={closeModal}>
      <View className="flex-1">
        <TouchableWithoutFeedback onPress={closeModal}>
          <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/60" />
        </TouchableWithoutFeedback>
        <View className="absolute bottom-0 left-0 right-0 h-[85%] bg-white dark:bg-[#1A140A] rounded-t-3xl overflow-hidden">
          <View className="w-full h-44 bg-amber-100 dark:bg-[#261C0E]">
            {image ? <Image source={{ uri: image }} className="w-full h-full" resizeMode="cover" /> : null}
          </View>
          <View className="items-center pt-3">
            <View className="w-10 h-1 bg-stone-300 dark:bg-[#2E2010] rounded-full" />
          </View>
          <TouchableOpacity
            onPress={closeModal}
            className="absolute top-[188px] right-5"
          >
            <Text className="text-stone-400 text-xl">✕</Text>
          </TouchableOpacity>
          <ScrollView className="flex-1 px-5 pt-3" contentContainerStyle={{ paddingBottom: 32 }}>
            <Text className="font-black text-2xl text-stone-900 dark:text-amber-50 pr-8">
              {header}
            </Text>
            <View className="flex-row gap-2 mt-2">
              <View className="bg-amber-50 dark:bg-[#261C0E] rounded-full px-3 py-1">
                <Text className="text-amber-700 dark:text-amber-400 text-xs font-semibold">
                  {address}
                </Text>
              </View>
            </View>
            <Text className="text-stone-500 dark:text-amber-200 text-sm mt-2">{phone}</Text>
            <View className="flex-row items-center mt-3">
              <StarRatingDisplay
                maxStars={5}
                rating={rating ?? 0}
                starSize={18}
                color="#FBBF24"
                starStyle={{ paddingRight: 2 }}
              />
              <Text className="text-stone-500 dark:text-amber-200 text-xs ml-2">
                {isReadOnly ? 'Rating' : 'Rate'}
              </Text>
            </View>
            {!isReadOnly ? (
              <TouchableOpacity
                className="bg-amber-600 dark:bg-amber-500 rounded-full py-4 items-center mt-5"
                onPress={isFavorite ? removeFromFavorites : addToFavorites}
              >
                <Text className="text-white font-bold text-base tracking-wide">
                  {isFavorite ? 'Remove From Favs' : 'Add to Favs'}
                </Text>
              </TouchableOpacity>
            ) : null}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default BreweryModal;
