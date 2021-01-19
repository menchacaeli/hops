import React, {useState} from 'react';
import axios from 'axios';
import {Container, Content} from 'native-base';
import BreweryModal from '../../../components/BreweryModal.js';
import ListThumbnail from '../../../components/ListThumbnail.js';
import {View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

const TrendingBreweries = () => {
  const [breweries, setBreweries] = useState([]);
  const [breweryModal, setBreweryModal] = useState({
    visible: false,
    breweryId: '',
    header: '',
    address: '',
    phone: '',
    image: '',
    rating: 0,
    isFavorite: '',
  });

  useFocusEffect(
    React.useCallback(() => {
      loadBreweries();
    }, []),
  );

  const loadBreweries = async () => {
    axios
      .get('http://localhost:8080/api/breweries/toprated')
      // eslint-disable-next-line prettier/prettier
      .then(function(response) {
        setBreweries(response.data);
      })
      // eslint-disable-next-line prettier/prettier
      .catch(function(error) {
        console.error(error);
      });
  };

  const topRatedBreweries = breweries.map((item, index, stack) => {
    return (
      <View key={index}>
        <ListThumbnail
          text={item.name}
          subtext={item.address}
          image={item.image}
          rating={item.rating}
          isReadOnly={true}
          onPress={() =>
            setBreweryModal({
              visible: true,
              breweryId: item.id,
              header: item.name,
              address: item.address,
              phone: item.phone,
              image: item.image,
              rating: item.rating,
              isFavorite: item.isFavorite,
            })
          }
        />
      </View>
    );
  });
  return (
    <Container>
      <Content padder>
        {topRatedBreweries}
        <BreweryModal
          visible={breweryModal.visible}
          header={breweryModal.header}
          address={breweryModal.address}
          phone={breweryModal.phone}
          image={breweryModal.image}
          rating={breweryModal.rating}
          isFavorite={breweryModal.isFavorite}
          isReadOnly={true}
          closeModal={() => {
            setBreweryModal({
              ...breweryModal,
              visible: false,
            });
          }}
        />
      </Content>
    </Container>
  );
};

export default TrendingBreweries;
