import React, {useState, useEffect} from 'react';
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
import {beerModel} from '../../ui/beerModel.js';
import {useDispatch, useSelector} from 'react-redux';
import {
  getBeers,
  removeBeerFromFavs,
  addBeerToFavs,
} from '../../redux/slices/beersSlice.js';
import {getStarRating} from '../../redux/slices/features/starRatingSlice.js';
import {getBeerFavorites} from '../../redux/slices/homeSlice.js';

const Beers = () => {
  const {beers} = useSelector((state) => state.beers);
  const {loading} = useSelector((state) => state.starRating);
  const [beerModal, setBeerModal] = useState(beerModel);
  const _dispatch = useDispatch();

  useEffect(() => {
    if (loading === 'fulfilled') {
      _dispatch(getBeers());
    }
  }, [loading]);

  useFocusEffect(
    React.useCallback(() => {
      _dispatch(getBeers());
    }, []),
  );

  const onStarRatingPress = (id, rating) => {
    const model = {
      id: id,
      rating: rating,
      type: 'beers',
    };
    _dispatch(getStarRating(model));
  };

  const onAddToFav = (id) => {
    _dispatch(addBeerToFavs(id));
    setBeerModal({
      ...beerModal,
      visible: false,
    });
  };

  const onRemoveFromFav = (id) => {
    _dispatch(removeBeerFromFavs(id));
    setBeerModal({
      ...beerModal,
      visible: false,
    });
  };

  const bosqueBeers = beers
    .filter((x) => x.brewery === 'Bosque Brewing Co.')
    .map((item, index) => {
      return (
        <View key={index}>
          <ListThumbnailSquare
            text={item.name}
            subtext={item.description}
            image={item.image}
            rating={item.rating}
            isReadOnly={false}
            onStarRatingPress={(rating) => onStarRatingPress(item.id, rating)}
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
    .filter((x) => x.brewery === 'La Cumbre Brewing Co.')
    .map((item, index) => {
      return (
        <View key={index}>
          <ListThumbnailSquare
            text={item.name}
            subtext={item.description}
            image={item.image}
            rating={item.rating}
            isReadOnly={false}
            onStarRatingPress={(rating) => onStarRatingPress(item.id, rating)}
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
    .filter((x) => x.brewery === 'Marble Brewery')
    .map((item, index) => {
      return (
        <View key={index}>
          <ListThumbnailSquare
            text={item.name}
            subtext={item.description}
            image={item.image}
            rating={item.rating}
            isReadOnly={false}
            onStarRatingPress={(rating) => onStarRatingPress(item.id, rating)}
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
    .filter((x) => x.brewery === 'Santa Fe Brewing Co.')
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
            onStarRatingPress={(rating) => onStarRatingPress(item.id, rating)}
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
          image={beerModal.image}
          description={beerModal.description}
          rating={beerModal.rating}
          isFavorite={beerModal.isFavorite}
          isReadOnly={true}
          hasAddRemoveButton={true}
          closeModal={() => {
            setBeerModal({
              ...beerModal,
              visible: false,
            });
          }}
          addToFavorites={() => {
            onAddToFav(beerModal.beerId);
          }}
          removeFromFavorites={() => {
            onRemoveFromFav(beerModal.beerId);
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
