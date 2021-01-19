import React, {useState} from 'react';
import axios from 'axios';
import {View} from 'react-native';
import {Container, Content, Spinner} from 'native-base';
import BeerModal from '../../../components/BeerModal.js';
import ListThumbnailSquare from '../../../components/ListThumbnailSquare.js';
import {StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

const TopRatedBeers = () => {
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
  });

  useFocusEffect(
    React.useCallback(() => {
      loadBeers();
    }, []),
  );

  const loadBeers = async () => {
    axios
      .get('http://localhost:8080/api/beers/toprated')
      // eslint-disable-next-line prettier/prettier
      .then(function(response) {
        setBeers(response.data);
      })
      // eslint-disable-next-line prettier/prettier
      .catch(function(error) {
        console.error(error);
      });
  };

  const topRatedBeers = beers
    // eslint-disable-next-line prettier/prettier
    .filter(x => x.rating >= 3)
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
        {beers.length <= 0 ? (
          <Spinner color="#71bc78" style={styles.spinner} />
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
