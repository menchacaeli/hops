import React from 'react';
import { StyleSheet, View, Text, Modal, Image, Dimensions, TouchableOpacity } from 'react-native';
import StarRating from 'react-native-star-rating-widget';

type Props = {
  visible: boolean;
  header: string;
  subtext: string;
  stats: string;
  image: string;
  description: string;
  closeModal: () => void;
  addToFavorites?: () => void;
  removeFromFavorites?: () => void;
  rating: number;
  isFavorite: boolean;
  isReadOnly: boolean;
  hasAddRemoveButton: boolean;
};

const BeerModal = ({
  visible,
  header,
  subtext,
  stats,
  image,
  description,
  closeModal,
  addToFavorites,
  removeFromFavorites,
  rating,
  isFavorite,
  isReadOnly,
  hasAddRemoveButton,
}: Props) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalContentContainer}>
            <View style={styles.modalImageContainer}>
              <Image source={{ uri: image }} style={styles.modalImage} />
            </View>
            <View style={styles.modalTextContainer}>
              <Text style={styles.modalHeader}>{header}</Text>
              <Text style={styles.modalSubText}>{subtext}</Text>
              <Text style={styles.modalText}>{stats}</Text>
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
              <Text style={styles.modalDesc}>{description}</Text>
              {hasAddRemoveButton ? (
                <TouchableOpacity
                  style={styles.favButton}
                  onPress={isFavorite ? removeFromFavorites : addToFavorites}>
                  <Text style={styles.favButtonText}>
                    {isFavorite ? 'Remove From Favs' : 'Add to Favs'}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
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
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalContentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  modalImageContainer: {
    flex: 0.5,
    width: '50%',
    padding: 10,
    height: 300,
  },
  modalImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  modalTextContainer: {
    flex: 0.5,
    width: '50%',
    padding: 10,
  },
  modalHeader: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 3,
    lineHeight: 35,
  },
  modalSubText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  modalText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 1,
  },
  modalDesc: {
    fontSize: 12,
    color: '#666',
    marginTop: 3,
    marginBottom: 10,
  },
  star: {
    paddingRight: 2,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
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
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  closeText: {
    fontSize: 15,
    color: '#333',
  },
});

export default BeerModal;
