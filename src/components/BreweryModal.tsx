import React from 'react';
import { StyleSheet, View, Text, Modal, Image, Dimensions, TouchableOpacity } from 'react-native';
import StarRating from 'react-native-star-rating-widget';

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
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.modalImage} />
          </View>
          <View style={styles.content}>
            <Text style={styles.modalHeader}>{header}</Text>
            <Text style={styles.modalText}>{address}</Text>
            <Text style={styles.modalText}>{phone}</Text>
            <View style={styles.starContainer}>
              <StarRating
                disabled={isReadOnly}
                maxStars={5}
                rating={rating}
                starSize={16}
                color={isReadOnly ? 'gray' : 'gold'}
                starStyle={styles.star}
                onChange={() => {}}
              />
              <Text style={styles.rateLabel}>{isReadOnly ? 'Rating' : 'Rate'}</Text>
            </View>
            {!isReadOnly ? (
              <TouchableOpacity
                style={styles.favButton}
                onPress={isFavorite ? removeFromFavorites : addToFavorites}>
                <Text style={styles.favButtonText}>
                  {isFavorite ? 'Remove From Favs' : 'Add to Favs'}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    marginTop: 22,
  },
  modalView: {
    width: deviceWidth - 50,
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    width: '100%',
    height: 180,
  },
  modalImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  modalHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 3,
  },
  star: {
    paddingRight: 2,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rateLabel: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
  },
  favButton: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  favButtonText: {
    fontSize: 13,
    color: '#333',
  },
  closeButton: {
    alignItems: 'center',
    paddingVertical: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e0e0e0',
  },
  closeText: {
    fontSize: 15,
    color: '#333',
  },
});

export default BreweryModal;
