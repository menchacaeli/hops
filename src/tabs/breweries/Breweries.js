import React, {useState} from 'react';
import axios from 'axios';
import {View} from 'react-native';
import {
  Container,
  Content,
  Header,
  Left,
  Body,
  Title,
  Right,
  Spinner,
} from 'native-base';
import BreweryModal from '../../components/BreweryModal.js';
import ListThumbnail from '../../components/ListThumbnail.js';
import {StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import { apiUrl } from '../../../constants';
const Breweries = () => {
  const [breweries, setBreweries] = useState([]);
  const [breweryModal, setBreweryModal] = useState({
    visible: false,
    breweryId: '',
    header: '',
    address: '',
    phone: '',
    image: '',
    rating: 0,
    isFavorite: false,
  });

  useFocusEffect(
    React.useCallback(() => {
      loadBreweries();
    }, []),
  );

  const loadBreweries = async () => {
    const endpoint = 'api/breweries';
    const url = apiUrl + endpoint;
    axios
      .get(url)
      // eslint-disable-next-line prettier/prettier
      .then(function(response) {
        setBreweries(response.data);
      })
      // eslint-disable-next-line prettier/prettier
      .catch(function(error) {
        console.error(error);
      });
  };

  // eslint-disable-next-line prettier/prettier
  const onStarRatingPress = (rating, id) => {
    const endpoint = `api/breweries/${id}`;
    const url = apiUrl + endpoint;
    axios
      .put(url, {
        rating: rating,
      })
      // eslint-disable-next-line prettier/prettier
      .then(function(response) {
        console.log(response);
        loadBreweries();
      })
      // eslint-disable-next-line prettier/prettier
      .catch(function(error) {
        console.error(error);
      });
  };

  // eslint-disable-next-line prettier/prettier
  const onAddToFavoritePress = id => {
    const endpoint = `api/breweries/${id}`;
    const url = apiUrl + endpoint;
    axios
      .put(url, {
        isFavorite: true,
      })
      // eslint-disable-next-line prettier/prettier
      .then(function(response) {
        console.log(response);
        loadBreweries();
        setBreweryModal({
          ...breweryModal,
          visible: false,
        });
      })
      // eslint-disable-next-line prettier/prettier
      .catch(function(error) {
        console.error(error);
      });
  };

  const breweryList = breweries.map((item, index) => {
    return (
      <View key={index}>
        <ListThumbnail
          text={item.name}
          subtext={item.address}
          image={item.image}
          rating={item.rating}
          isReadOnly={false}
          // eslint-disable-next-line prettier/prettier
          onStarRatingPress={rating => onStarRatingPress(rating, item.id)}
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
      <Content>
        <Header transparent>
          <Left />
          <Body>
            <Title>Breweries</Title>
          </Body>
          <Right />
        </Header>
        {breweries.length <= 0 ? (
          <Spinner color="#71bc78" style={styles.spinner} />
        ) : (
          <>{breweryList}</>
        )}
        <BreweryModal
          visible={breweryModal.visible}
          header={breweryModal.header}
          address={breweryModal.address}
          phone={breweryModal.phone}
          image={breweryModal.image}
          rating={breweryModal.rating}
          isFavorite={breweryModal.isFavorite}
          reloadBreweries={loadBreweries}
          isReadOnly={true}
          closeModal={() => {
            setBreweryModal({
              ...breweryModal,
              visible: false,
            });
          }}
          addToFavorites={() => {
            onAddToFavoritePress(breweryModal.breweryId);
          }}
        />
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '75%',
  },
});

export default Breweries;
