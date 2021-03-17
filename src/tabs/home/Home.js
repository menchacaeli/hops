import React, {useState, useEffect} from 'react';
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
import {beerModel} from '../../ui/beerModel.js';
import {breweryModel} from '../../ui/breweryModel.js';
import {useDispatch, useSelector} from 'react-redux';
import {
  getBeerFavorites,
  getBreweryFavorites,
} from '../../redux/slices/homeSlice.js';
import {removeBeerFromFavs} from '../../redux/slices/beersSlice.js';
import {removeBreweryFromFavs} from '../../redux/slices/breweriesSlice.js';

const Home = ({navigation}) => {
  const [beerModal, setBeerModal] = useState(beerModel);
  const [breweryModal, setBreweryModal] = useState(breweryModel);
  const {
    discoverItems,
    beerFavorites,
    breweryFavorites,
    beerloading,
    breweryloading,
  } = useSelector((state) => state.home);
  const _dispatch = useDispatch();

  useEffect(() => {
    if (beerloading === 'fulfilled') {
      _dispatch(getBeerFavorites());
    }
    if (breweryloading === 'fulfilled') {
      _dispatch(getBreweryFavorites());
    }
  }, [beerloading]);

  useFocusEffect(
    React.useCallback(() => {
      _dispatch(getBeerFavorites());
      _dispatch(getBreweryFavorites());
    }, []),
  );

  const list = discoverItems.map((item, index, stack) => {
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

  const favBeers = beerFavorites.map((item, index, stack) => {
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

  const onRemoveFromFav = (id, type) => {
    if (type === 'beers') {
      _dispatch(removeBeerFromFavs(id));
      setBeerModal({
        ...beerModal,
        visible: false,
      });
    } else {
      _dispatch(removeBreweryFromFavs(id));
      setBreweryModal({
        ...breweryModal,
        visible: false,
      });
    }
  };

  const favBreweries = breweryFavorites.map((item, index, stack) => {
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
        isReadOnly={false}
        hasAddRemoveButton={true}
        closeModal={() => {
          setBeerModal({
            ...beerModal,
            visible: false,
          });
        }}
        removeFromFavorites={() => {
          onRemoveFromFav(beerModal.beerId, 'beers');
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
        isReadOnly={false}
        hasAddRemoveButton={true}
        closeModal={() => {
          setBreweryModal({
            ...breweryModal,
            visible: false,
          });
        }}
        removeFromFavorites={() => {
          onRemoveFromFav(breweryModal.breweryId, 'breweries');
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
