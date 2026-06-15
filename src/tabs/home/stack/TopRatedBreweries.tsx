import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import BreweryModal from '../../../components/BreweryModal';
import ListThumbnail from '../../../components/ListThumbnail';
import { Spinner } from '../../../components/ui';
import useDataFetch from '../../../hooks/useDataFetch';
import useModal from '../../../hooks/useModal';

type Brewery = {
  id: number;
  name: string;
  address: string;
  phone: string;
  image: string;
  rating: number;
  isFavorite: boolean;
};

const TopRatedBreweries = () => {
  const { data: breweries, loading, load: loadBreweries } = useDataFetch<Brewery>('api/breweries/toprated');
  const { modalState: breweryModal, openModal, closeModal } = useModal();

  useFocusEffect(
    useCallback(() => {
      loadBreweries();
    }, [loadBreweries]),
  );

  const handleItemPress = useCallback((item: Brewery) => {
    openModal({
      breweryId: item.id,
      header: item.name,
      address: item.address,
      phone: item.phone,
      image: item.image,
      rating: item.rating,
      isFavorite: item.isFavorite,
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

  const keyExtractor = useCallback((item: Brewery) => String(item.id), []);

  return (
    <View style={{ flex: 1, backgroundColor: '#f6fbf7' }}>
      {loading ? (
        <Spinner />
      ) : (
        <FlatList
          data={breweries}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      )}
      <BreweryModal
        visible={!!breweryModal.visible}
        header={String(breweryModal.header ?? '')}
        address={String(breweryModal.address ?? '')}
        phone={String(breweryModal.phone ?? '')}
        image={String(breweryModal.image ?? '')}
        rating={Number(breweryModal.rating ?? 0)}
        isFavorite={Boolean(breweryModal.isFavorite)}
        isReadOnly={true}
        closeModal={closeModal}
      />
    </View>
  );
};

export default TopRatedBreweries;
