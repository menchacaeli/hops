import React from 'react';
import StarRating from 'react-native-star-rating';
import {Text, Button, Card, CardItem, Left, Body} from 'native-base';
import {StyleSheet, View, Modal, Image, Dimensions} from 'react-native';

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
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <Card style={styles.modalView}>
          <CardItem cardBody style={styles.modalImageContainer}>
            <Image source={{uri: image}} style={styles.modalImage} />
          </CardItem>
          <CardItem>
            <Left>
              <Body>
                <Text style={styles.modalHeader}>{header}</Text>
                <Text note style={styles.modalText}>
                  {address}
                </Text>
                <Text note style={styles.modalText}>
                  {phone}
                </Text>
                <View transparent style={styles.starContainer}>
                  <StarRating
                    disabled={isReadOnly}
                    emptyStar={'star-border'}
                    fullStar={'star'}
                    halfStar={'star-half'}
                    iconSet={'MaterialIcons'}
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
                {isReadOnly ? null : (
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
                      <Button
                        small
                        dark
                        block
                        bordered
                        onPress={addToFavorites}>
                        <Text>Add to Favs</Text>
                      </Button>
                    )}
                  </View>
                )}
              </Body>
            </Left>
          </CardItem>
          <Button dark transparent block onPress={closeModal}>
            <Text>Close</Text>
          </Button>
        </Card>
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
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalImageContainer: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  modalImage: {
    height: 180,
    width: null,
    flex: 1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  modalHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalText: {
    fontSize: 12,
    marginBottom: 3,
  },
  star: {
    paddingRight: 2,
  },
  starContainer: {
    flexDirection: 'row',
    width: 100,
    marginBottom: 10,
  },
  starTextContainer: {
    marginLeft: 10,
    paddingTop: 1,
  },
});

export default BreweryModal;
