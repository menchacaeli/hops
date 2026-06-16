import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import BeerModal from '../../../components/BeerModal';
import ListThumbnailSquare from '../../../components/ListThumbnailSquare';
import { Card, ListEmptyState, Screen, Spinner } from '../../../components/ui';
import useBeers from '../../../hooks/useBeers';
import useModal from '../../../hooks/useModal';
import { tabContentInset } from '../../../styles/layout';
import type { Beer } from '../../../data';

const TopRatedBeers = () => {
  const { beers, loading, load: loadBeers } = useBeers();
  const { modalState: beerModal, openModal, closeModal } = useModal();

  useFocusEffect(useCallback(() => { loadBeers(); }, [loadBeers]));

  const handleItemPress = useCallback((item: Beer) => {
    openModal({
      beerId: item.id,
      header: item.name,
      subtext: item.breweryId,
      stats: `ABV: ${item.abv} IBUs: ${item.ibu}`,
      description: item.description,
      image: item.image,
      rating: item.rating,
      isFavorite: false,
    });
  }, [openModal]);

  const renderItem = useCallback(({ item }: { item: Beer }) => (
    <ListThumbnailSquare
      text={item.name} subtext={item.description} image={item.image} rating={item.rating}
      isReadOnly={true} onPress={() => handleItemPress(item)}
    />
  ), [handleItemPress]);

  const topRated = beers.filter(b => b.rating >= 3);
  const keyExtractor = useCallback((item: Beer) => item.id, []);

  return (
    <Screen>
      {loading ? <Spinner /> : (
        <View style={tabContentInset}>
          <Card className="p-0 overflow-hidden">
            <FlatList
              data={topRated}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              ListEmptyComponent={<ListEmptyState label="No top rated beers yet." />}
            />
          </Card>
        </View>
      )}
      <BeerModal
        visible={!!beerModal.visible} header={String(beerModal.header ?? '')} subtext={String(beerModal.subtext ?? '')}
        stats={String(beerModal.stats ?? '')} description={String(beerModal.description ?? '')} image={String(beerModal.image ?? '')}
        rating={Number(beerModal.rating ?? 0)} isFavorite={false} isReadOnly={true} hasAddRemoveButton={false}
        closeModal={closeModal}
      />
    </Screen>
  );
};

export default TopRatedBeers;
