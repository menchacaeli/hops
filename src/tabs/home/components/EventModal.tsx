import React from 'react';
import { StyleSheet, View, Text, Modal, Image, Dimensions, TouchableOpacity } from 'react-native';

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
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.modalImage} />
          </View>
          <View style={styles.content}>
            <Text style={styles.modalHeader}>{header}</Text>
            <Text style={styles.modalDate}>{date}</Text>
            <Text style={styles.modalSubText}>{subtext}</Text>
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
  modalDate: {
    fontSize: 15,
    marginBottom: 5,
    color: '#444',
  },
  modalSubText: {
    fontSize: 12,
    color: '#666',
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

export default EventModal;
