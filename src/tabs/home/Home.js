import React, {useState} from 'react';
import axios from 'axios';
import {StyleSheet} from 'react-native';
import BeerModal from '../../components/BeerModal.js';
import BreweryModal from '../../components/BreweryModal.js';
import ListIcon from '../../components/ListIcon.js';
import ListThumbnailSquare from '../../components/ListThumbnailSquare.js';
import ListThumbnail from '../../components/ListThumbnail.js';
import {View} from 'react-native';
import {Text, Container, Card, CardItem, Content} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';
import {apiUrl} from '../../../constants';

const Home = ({navigation}) => {
  const [favoriteBeers, setFavoriteBeers] = useState([]);
  const [favoriteBreweries, setFavoriteBreweries] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      loadFavoriteBeers();
      loadFavoriteBreweries();
    }, []),
  );
  const [beerModal, setBeerModal] = useState({
    visible: false,
    beerId: '',
    header: '',
    subtext: '',
    stats: '',
    description: '',
    image: '',
    rating: 0,
    isFavorite: false,
  });

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

  const items = [
    {
      text: 'Upcoming Events & Releases',
      icon: 'calendar-alt',
      stack: 'Upcoming Events & Releases',
    },
    {
      text: 'Top Rated Beers',
      icon: 'beer',
      stack: 'Top Rated Beers',
    },
    {
      text: 'Top Rated Breweries',
      icon: 'warehouse',
      stack: 'Top Rated Breweries',
    },
  ];

  const list = items.map((item, index, stack) => {
    return (
      <ListIcon
        key={index}
        text={item.text}
        icon={item.icon}
        stack={item.stack}
        navigation={navigation}
      />
    );
  });

  const loadFavoriteBeers = async () => {
    const endpoint = 'api/beers/favorites';
    const url = apiUrl + endpoint;
    console.log({url})
    axios
      .get(url)
      // eslint-disable-next-line prettier/prettier
      .then(function(response) {
        setFavoriteBeers(response.data);
      })
      // eslint-disable-next-line prettier/prettier
      .catch(function(error) {
        console.error(error);
      });
  };

  const loadFavoriteBreweries = async () => {
    const endpoint = 'api/breweries/favorites';
    const url = apiUrl + endpoint;

    axios
      .get(url)
      // eslint-disable-next-line prettier/prettier
      .then(function(response) {
        setFavoriteBreweries(response.data);
      })
      // eslint-disable-next-line prettier/prettier
      .catch(function(error) {
        console.error(error);
      });
  };

  const favBeers = favoriteBeers.map((item, index, stack) => {
    return (
      <View key={index}>
        <ListThumbnailSquare
          text={item.name}
          subtext={item.description}
          image={item.image}
          rating={item.rating}
          isReadOnly={true}
          onPress={() =>
            setBeerModal({
              visible: true,
              beerId: item.id,
              header: item.name,
              subtext: item.brewery,
              stats: `ABV: ${item.abv} IBUs: ${item.ibu}`,
              description: item.description,
              image: item.image,
              rating: item.rating,
              isFavorite: item.isFavorite,
            })
          }
        />
      </View>
    );
  });

  // eslint-disable-next-line prettier/prettier
  const onRemoveFromFavoritePress = (id, type) => {
    const endpoint = `api/${type}/${id}`;
    const url = apiUrl + endpoint;
    axios
      .put(url, {
        isFavorite: false,
      })
      // eslint-disable-next-line prettier/prettier
      .then(function(response) {
        console.log(response);
        if (type === 'beers') {
          loadFavoriteBeers();
          setBeerModal({
            ...beerModal,
            visible: false,
          });
        } else {
          loadFavoriteBreweries();
          setBreweryModal({
            ...breweryModal,
            visible: false,
          });
        }
      })
      // eslint-disable-next-line prettier/prettier
      .catch(function(error) {
        console.error(error);
      });
  };

  const favBreweries = favoriteBreweries.map((item, index, stack) => {
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
    <Container style={styles.container}>
      <Content padder>
        <Card>{list}</Card>
        <Card>
          <CardItem header>
            <Text>Favorite Beers</Text>
          </CardItem>
          {favBeers}
        </Card>
        <Card>
          <CardItem header>
            <Text>Favorite Breweries</Text>
          </CardItem>
          {favBreweries}
        </Card>
      </Content>
      <BeerModal
        visible={beerModal.visible}
        header={beerModal.header}
        subtext={beerModal.subtext}
        stats={beerModal.stats}
        description={beerModal.description}
        image={beerModal.image}
        rating={beerModal.rating}
        isFavorite={beerModal.isFavorite}
        isReadOnly={true}
        hasAddRemoveButton={false}
        closeModal={() => {
          setBeerModal({
            ...beerModal,
            visible: false,
          });
        }}
        removeFromFavorites={() => {
          onRemoveFromFavoritePress(beerModal.beerId, 'beers');
        }}
      />
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
        removeFromFavorites={() => {
          onRemoveFromFavoritePress(breweryModal.breweryId, 'breweries');
        }}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6fbf7',
  },
  icon: {
    fontSize: 18,
    color: '#71bc78',
  },
});

export default Home;
