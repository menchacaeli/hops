import React from 'react';
import {Text, Button, Card, CardItem, Left, Body} from 'native-base';
import {StyleSheet, View, Modal, Image, Dimensions} from 'react-native';

const EventModal = ({visible, header, date, subtext, image, closeModal}) => {
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
                <Text style={styles.modalDate}>{date}</Text>
                <Text note style={styles.modalSubText}>
                  {subtext}
                </Text>
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
  modalImageContainer: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  modalImage: {
    height: 180,
    width: null,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    flex: 1,
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
  modalHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalDate: {
    fontSize: 15,
    marginBottom: 5,
  },
  modalSubText: {
    fontSize: 12,
  },
});

export default EventModal;
