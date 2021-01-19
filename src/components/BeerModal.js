import React from 'react';
import StarRating from 'react-native-star-rating';
import {Text, Button} from 'native-base';
import {StyleSheet, View, Modal, Image, Dimensions} from 'react-native';

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
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalContentContainer}>
            <View style={styles.modalImageContainer}>
              <Image source={{uri: image}} style={styles.modalImage} />
            </View>
            <View style={styles.modalTextContainer}>
              <Text style={styles.modalHeader}>{header}</Text>
              <Text style={styles.modalSubText}>{subtext}</Text>
              <Text style={styles.modalText} note>
                {stats}
              </Text>
              <View transparent style={styles.starContainer}>
                <StarRating
                  disabled={isReadOnly}
                  emptyStar={'ios-star-outline'}
                  fullStar={'ios-star'}
                  halfStar={'ios-star-half'}
                  iconSet={'Ionicons'}
                  maxStars={5}
                  rating={rating}
                  starSize={16}
                  fullStarColor={isReadOnly ? 'gray' : 'gold'}
                  starStyle={styles.star}
                />
                <View style={styles.starTextContainer}>
                  <Text note>{isReadOnly ? 'Rating ' : 'Rate '}</Text>
                </View>
              </View>
              <Text style={styles.modalDesc} note>
                {description}
              </Text>
              {hasAddRemoveButton ? (
                <View>
                  {isFavorite ? (
                    <Button
                      small
                      dark
                      block
                      bordered
                      onPress={removeFromFavorites}>
                      <Text>Remove From Favs</Text>
                    </Button>
                  ) : (
                    <Button small dark block bordered onPress={addToFavorites}>
                      <Text>Add to Favs</Text>
                    </Button>
                  )}
                </View>
              ) : null}
            </View>
          </View>
          <Button dark transparent block onPress={closeModal}>
            <Text>Close</Text>
          </Button>
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
    marginTop: 22,
  },
  modalView: {
    height: 'auto',
    width: deviceWidth - 50,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalContentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  modalImageContainer: {
    flex: 0.5,
    width: '50%',
    padding: 10,
    height: 300,
  },
  modalImage: {
    padding: 10,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  modalTextContainer: {
    height: 'auto',
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
    marginBottom: 1,
  },
  modalDesc: {
    fontSize: 12,
    marginTop: 3,
    marginBottom: 10,
  },
  star: {
    paddingRight: 2,
  },
  starContainer: {
    flexDirection: 'row',
    width: 100,
    marginBottom: 5,
  },
  starTextContainer: {
    marginLeft: 10,
    paddingTop: 1,
  },
  icon: {
    fontSize: 25,
  },
});

export default BeerModal;
