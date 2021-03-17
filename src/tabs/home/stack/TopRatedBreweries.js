import React, {useState} from 'react';
import {Container, Content, Spinner} from 'native-base';
import BreweryModal from '../../../components/BreweryModal.js';
import ListThumbnail from '../../../components/ListThumbnail.js';
import {StyleSheet} from 'react-native';
import {View, Text} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getTopRatedBreweries} from '../../../redux/slices/features/topRatedBreweriesSlice.js';
import {breweryModel} from '../../../ui/breweryModel.js';

const TrendingBreweries = () => {
  const [breweryModal, setBreweryModal] = useState(breweryModel);
  const {topRatedBreweriesList} = useSelector(
    (state) => state.topRatedBreweries,
  );
  const _dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      if (topRatedBreweriesList && topRatedBreweriesList.length <= 0) {
        _dispatch(getTopRatedBreweries());
      }
    }, []),
  );

  const topRatedBreweries = topRatedBreweriesList.map((item, index, stack) => {
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
        {topRatedBreweriesList.length <= 0 ? (
          <Spinner color="#71bc78" style={styles.spinner} />
        ) : topRatedBreweriesList.length === 0 ? (
          <Text>There are currently no top rated beers, come back later.</Text>
        ) : (
          <>{topRatedBreweries}</>
        )}
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

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '75%',
  },
});

export default TrendingBreweries;
