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
  Spinner,
} from 'native-base';
import BreweryModal from '../../components/BreweryModal.js';
import ListThumbnail from '../../components/ListThumbnail.js';
import {StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {breweryModel} from '../../ui/breweryModel.js';
import {useDispatch, useSelector} from 'react-redux';
import {
  getBreweries,
  removeBreweryFromFavs,
  addBreweryToFavs,
} from '../../redux/slices/breweriesSlice.js';
import {getStarRating} from '../../redux/slices/features/starRatingSlice.js';
import {getBreweryFavorites} from '../../redux/slices/homeSlice.js';

const Breweries = () => {
  const {breweries} = useSelector((state) => state.breweries);
  const {loading} = useSelector((state) => state.starRating);
  const [breweryModal, setBreweryModal] = useState(breweryModel);
  const _dispatch = useDispatch();

  useEffect(() => {
    if (loading === 'fulfilled') {
      _dispatch(getBreweries());
    }
  }, [loading]);

  useFocusEffect(
    React.useCallback(() => {
      _dispatch(getBreweries());
    }, []),
  );

  const onStarRatingPress = (id, rating) => {
    const model = {
      id: id,
      rating: rating,
      type: 'breweries',
    };
    _dispatch(getStarRating(model));
  };

  const onAddToFav = (id) => {
    _dispatch(addBreweryToFavs(id));
    setBreweryModal({
      ...breweryModal,
      visible: false,
    });
  };

  const onRemoveFromFav = (id) => {
    _dispatch(removeBreweryFromFavs(id));
    setBreweryModal({
      ...breweryModal,
      visible: false,
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
          onStarRatingPress={(rating) => onStarRatingPress(item.id, rating)}
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
          isReadOnly={false}
          hasAddRemoveButton={true}
          closeModal={() => {
            setBreweryModal({
              ...breweryModal,
              visible: false,
            });
          }}
          addToFavorites={() => {
            onAddToFav(breweryModal.breweryId);
          }}
          removeFromFavorites={() => {
            onRemoveFromFav(breweryModal.breweryId);
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
