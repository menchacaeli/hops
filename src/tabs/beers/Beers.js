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
  Separator,
  Text,
  Spinner,
} from 'native-base';
import BeerModal from '../../components/BeerModal.js';
import ListThumbnailSquare from '../../components/ListThumbnailSquare.js';
import {StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

const Beers = () => {
  const [beers, setBeers] = useState([]);
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

  useFocusEffect(
    React.useCallback(() => {
      loadBeers();
    }, []),
  );

  const loadBeers = async () => {
    axios
      .get('http://localhost:8080/api/beers')
      // eslint-disable-next-line prettier/prettier
      .then(function(response) {
        setBeers(response.data);
      })
      // eslint-disable-next-line prettier/prettier
      .catch(function(error) {
        console.error(error);
      });
  };

  // eslint-disable-next-line prettier/prettier
  const onStarRatingPress = (rating, id) => {
    axios
      .put(`http://localhost:8080/api/beers/${id}`, {
        rating: rating,
      })
      // eslint-disable-next-line prettier/prettier
      .then(function(response) {
        console.log(response);
        loadBeers();
      })
      // eslint-disable-next-line prettier/prettier
      .catch(function(error) {
        console.error(error);
      });
  };

  // eslint-disable-next-line prettier/prettier
  const onAddToFavoritePress = id => {
    axios
      .put(`http://localhost:8080/api/beers/${id}`, {
        isFavorite: true,
      })
      // eslint-disable-next-line prettier/prettier
      .then(function(response) {
        console.log(response);
        loadBeers();
        setBeerModal({
          ...beerModal,
          visible: false,
        });
      })
      // eslint-disable-next-line prettier/prettier
      .catch(function(error) {
        console.error(error);
      });
  };

  const bosqueBeers = beers
    // eslint-disable-next-line prettier/prettier
    .filter(x => x.brewery === 'Bosque Brewing Co.')
    .map((item, index) => {
      return (
        <View key={index}>
          <ListThumbnailSquare
            text={item.name}
            subtext={item.description}
            image={item.image}
            rating={item.rating}
            isReadOnly={false}
            // eslint-disable-next-line prettier/prettier
            onStarRatingPress={rating => onStarRatingPress(rating, item.id)}
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

  const laCumbreBeers = beers
    // eslint-disable-next-line prettier/prettier
    .filter(x => x.brewery === 'La Cumbre Brewing Co.')
    .map((item, index) => {
      return (
        <View key={index}>
          <ListThumbnailSquare
            text={item.name}
            subtext={item.description}
            image={item.image}
            rating={item.rating}
            isReadOnly={false}
            // eslint-disable-next-line prettier/prettier
            onStarRatingPress={rating => onStarRatingPress(rating, item.id)}
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

  const marbleBeers = beers
    // eslint-disable-next-line prettier/prettier
    .filter(x => x.brewery === 'Marble Brewery')
    .map((item, index) => {
      return (
        <View key={index}>
          <ListThumbnailSquare
            text={item.name}
            subtext={item.description}
            image={item.image}
            rating={item.rating}
            isReadOnly={false}
            // eslint-disable-next-line prettier/prettier
            onStarRatingPress={rating => onStarRatingPress(rating, item.id)}
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

  const santaFeBeers = beers
    // eslint-disable-next-line prettier/prettier
    .filter(x => x.brewery === 'Santa Fe Brewing Co.')
    .map((item, index) => {
      return (
        <View key={index}>
          <ListThumbnailSquare
            text={item.name}
            subtext={item.description}
            image={item.image}
            rating={item.rating}
            isReadOnly={false}
            // eslint-disable-next-line prettier/prettier
            onStarRatingPress={rating => onStarRatingPress(rating, item.id)}
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

  return (
    <Container>
      <Content>
        <Header transparent>
          <Left />
          <Body>
            <Title>Beers</Title>
          </Body>
          <Right />
        </Header>
        {beers.length <= 0 ? (
          <Spinner color="#71bc78" style={styles.spinner} />
        ) : (
          <>
            <Separator bordered>
              <Text>BOSQUE BREWING CO.</Text>
            </Separator>
            {bosqueBeers}
            <Separator bordered>
              <Text>LA CUMBRE BREWING CO.</Text>
            </Separator>
            {laCumbreBeers}
            <Separator bordered>
              <Text>MARBLE BREWING</Text>
            </Separator>
            {marbleBeers}
            <Separator bordered>
              <Text>SANTA FE BREWERY CO.</Text>
            </Separator>
            {santaFeBeers}
          </>
        )}
        <BeerModal
          visible={beerModal.visible}
          header={beerModal.header}
          subtext={beerModal.subtext}
          stats={beerModal.stats}
          description={beerModal.description}
          image={beerModal.image}
          rating={beerModal.rating}
          isFavorite={beerModal.isFavorite}
          reloadBeers={loadBeers}
          isReadOnly={true}
          hasAddRemoveButton={true}
          closeModal={() => {
            setBeerModal({
              ...beerModal,
              visible: false,
            });
          }}
          addToFavorites={() => {
            onAddToFavoritePress(beerModal.beerId);
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

export default Beers;
