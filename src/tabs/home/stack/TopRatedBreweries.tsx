import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import BreweryModal from '../../../components/BreweryModal';
import ListThumbnail from '../../../components/ListThumbnail';
import { Card, ListEmptyState, Screen, Spinner } from '../../../components/ui';
import useBreweries from '../../../hooks/useBreweries';
import useModal from '../../../hooks/useModal';
import { tabContentInset } from '../../../styles/layout';
import type { Brewery } from '../../../data';

const TopRatedBreweries = () => {
  const { breweries, loading, load: loadBreweries } = useBreweries();
  const { modalState: breweryModal, openModal, closeModal } = useModal();

  useFocusEffect(useCallback(() => { loadBreweries(); }, [loadBreweries]));

  const handleItemPress = useCallback((item: Brewery) => {
    openModal({
      breweryId: item.id,
      header: item.name,
      address: item.address,
      phone: item.phone,
      image: item.image,
      rating: item.rating,
      isFavorite: false,
    });
  }, [openModal]);

  const renderItem = useCallback(({ item }: { item: Brewery }) => (
    <ListThumbnail
      text={item.name}
      subtext={item.address}
      image={item.image}
      rating={item.rating}
      isReadOnly={true}
      onPress={() => handleItemPress(item)}
    />
  ), [handleItemPress]);

  const topRated = breweries.filter(b => b.rating >= 3);
  const keyExtractor = useCallback((item: Brewery) => item.id, []);

  return (
    <Screen>
      {loading ? <Spinner /> : (
        <View style={tabContentInset}>
          <Card className="p-0 overflow-hidden">
            <FlatList
              data={topRated}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              ListEmptyComponent={<ListEmptyState label="No top rated breweries yet." />}
            />
          </Card>
        </View>
      )}
      <BreweryModal
        visible={!!breweryModal.visible}
        header={String(breweryModal.header ?? '')}
        address={String(breweryModal.address ?? '')}
        phone={String(breweryModal.phone ?? '')}
        image={String(breweryModal.image ?? '')}
        rating={Number(breweryModal.rating ?? 0)}
        isFavorite={false}
        isReadOnly={true}
        closeModal={closeModal}
      />
    </Screen>
  );
};

export default TopRatedBreweries;
