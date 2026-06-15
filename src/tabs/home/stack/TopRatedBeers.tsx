import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import BeerModal from '../../../components/BeerModal';
import ListThumbnailSquare from '../../../components/ListThumbnailSquare';
import { Spinner } from '../.././../components/ui';
import useDataFetch from '../../../hooks/useDataFetch';
import useModal from '../../../hooks/useModal';

type Beer = {
  id: number;
  name: string;
  brewery: string;
  abv: number;
  ibu: number;
  description: string;
  image: string;
  rating: number;
  isFavorite: boolean;
};

const TopRatedBeers = () => {
  const { data: beers, loading, load: loadBeers } = useDataFetch<Beer>('api/beers/toprated');
  const { modalState: beerModal, openModal, closeModal } = useModal();

  useFocusEffect(
    useCallback(() => {
      loadBeers();
    }, [loadBeers]),
  );

  const handleItemPress = useCallback((item: Beer) => {
    openModal({
      beerId: item.id,
      header: item.name,
      subtext: item.brewery,
      stats: `ABV: ${item.abv} IBUs: ${item.ibu}`,
      description: item.description,
      image: item.image,
      rating: item.rating,
      isFavorite: item.isFavorite,
    });
  }, [openModal]);

  const renderItem = useCallback(({ item }: { item: Beer }) => (
    <ListThumbnailSquare
      text={item.name}
      subtext={item.description}
      image={item.image}
      rating={item.rating}
      isReadOnly={true}
      onPress={() => handleItemPress(item)}
    />
  ), [handleItemPress]);

  const keyExtractor = useCallback((item: Beer) => String(item.id), []);
  const topRated = beers.filter(x => x.rating >= 3);

  return (
    <View style={{ flex: 1, backgroundColor: '#f6fbf7' }}>
      {loading ? (
        <Spinner />
      ) : (
        <FlatList
          data={topRated}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      )}
      <BeerModal
        visible={!!beerModal.visible}
        header={String(beerModal.header ?? '')}
        subtext={String(beerModal.subtext ?? '')}
        stats={String(beerModal.stats ?? '')}
        description={String(beerModal.description ?? '')}
        image={String(beerModal.image ?? '')}
        rating={Number(beerModal.rating ?? 0)}
        isFavorite={Boolean(beerModal.isFavorite)}
        isReadOnly={true}
        hasAddRemoveButton={false}
        closeModal={closeModal}
      />
    </View>
  );
};

export default TopRatedBeers;
