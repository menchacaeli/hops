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

type Props = {
  visible: boolean;
  header: string;
  date: string;
  subtext: string;
  image: string;
  closeModal: () => void;
};

const EventModal = ({ visible, header, date, subtext, image, closeModal }: Props) => {
  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={closeModal}>
      <View className="flex-1">
        <TouchableWithoutFeedback onPress={closeModal}>
          <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/60" />
        </TouchableWithoutFeedback>
        <View className="absolute bottom-0 left-0 right-0 h-[85%] bg-white dark:bg-[#1A140A] rounded-t-3xl overflow-hidden">
          <View className="w-full h-44 bg-amber-100 dark:bg-[#261C0E]">
            <Image source={{ uri: image }} className="w-full h-full" resizeMode="cover" />
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
            <View className="bg-amber-50 dark:bg-[#261C0E] rounded-full px-3 py-1 self-start mt-2">
              <Text className="text-amber-700 dark:text-amber-400 text-xs font-semibold">{date}</Text>
            </View>
            <Text className="text-stone-600 dark:text-amber-200 text-sm mt-3 leading-5">
              {subtext}
            </Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default EventModal;
