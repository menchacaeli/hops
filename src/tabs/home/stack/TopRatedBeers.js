import React, {useState} from 'react';
import {View} from 'react-native';
import {Container, Content, Spinner} from 'native-base';
import BeerModal from '../../../components/BeerModal.js';
import ListThumbnailSquare from '../../../components/ListThumbnailSquare.js';
import {StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getTopRatedBeers} from '../../../redux/slices/features/topRatedBeersSlice.js';
import {beerModel} from '../../../ui/beerModel.js';

const TopRatedBeers = () => {
  const [beerModal, setBeerModal] = useState(beerModel);
  const {topRatedBeersList} = useSelector((state) => state.topRatedBeers);
  const _dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      if (topRatedBeersList && topRatedBeersList.length <= 0) {
        _dispatch(getTopRatedBeers());
      }
    }, []),
  );

  const topRatedBeers = topRatedBeersList
    // eslint-disable-next-line prettier/prettier
    .filter((x) => x.rating >= 3)
    .map((item, index) => {
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
              })
            }
          />
        </View>
      );
    });

  return (
    <Container>
      <Content>
        {topRatedBeersList.length <= 0 ? (
          <Spinner color="#71bc78" style={styles.spinner} />
        ) : topRatedBeersList.length === 0 ? (
          <Text>There are currently no top rated beers, come back later.</Text>
        ) : (
          <>{topRatedBeers}</>
        )}
        <BeerModal
          visible={beerModal.visible}
          header={beerModal.header}
          subtext={beerModal.subtext}
          stats={beerModal.stats}
          description={beerModal.description}
          image={beerModal.image}
          rating={beerModal.rating}
          beerId={beerModal.beerId}
          isReadOnly={true}
          hasAddRemoveButton={false}
          closeModal={() => {
            setBeerModal({
              ...beerModal,
              visible: false,
            });
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

export default TopRatedBeers;
