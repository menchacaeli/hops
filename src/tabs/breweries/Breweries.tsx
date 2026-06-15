import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import BreweryModal from '../../components/BreweryModal';
import ListThumbnail from '../../components/ListThumbnail';
import { Spinner } from '../../components/ui';
import { updateBrewery } from '../../data';
import useBreweries from '../../hooks/useBreweries';
import useUserFavorites from '../../hooks/useUserFavorites';
import useModal from '../../hooks/useModal';
import type { Brewery } from '../../data';

const Breweries = () => {
  const { breweries, loading, load: loadBreweries } = useBreweries();
  const { isBreweryFavorite, addBreweryFavorite, load: loadFavorites } = useUserFavorites();
  const { modalState: breweryModal, openModal, closeModal } = useModal();

  useFocusEffect(
    useCallback(() => { loadBreweries(); loadFavorites(); }, [loadBreweries, loadFavorites]),
  );

  const onStarRatingPress = useCallback(async (rating: number, id: string) => {
    await updateBrewery(id, { rating });
    loadBreweries();
  }, [loadBreweries]);

  const onAddToFavoritePress = useCallback(async (id: string) => {
    await addBreweryFavorite(id);
    loadFavorites();
    closeModal();
  }, [addBreweryFavorite, loadFavorites, closeModal]);

  const handleItemPress = useCallback((item: Brewery) => {
    openModal({
      breweryId: item.id,
      header: item.name,
      address: item.address,
      phone: item.phone,
      image: item.image,
      rating: item.rating,
      isFavorite: isBreweryFavorite(item.id),
    });
  }, [openModal, isBreweryFavorite]);

  const renderItem = useCallback(({ item }: { item: Brewery }) => (
    <ListThumbnail
      text={item.name}
      subtext={item.address}
      image={item.image}
      rating={item.rating}
      isReadOnly={false}
      onStarRatingPress={rating => onStarRatingPress(rating, item.id)}
      onPress={() => handleItemPress(item)}
    />
  ), [handleItemPress, onStarRatingPress]);

  const keyExtractor = useCallback((item: Brewery) => item.id, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#f6fbf7' }}>
      {loading ? <Spinner /> : <FlatList data={breweries} keyExtractor={keyExtractor} renderItem={renderItem} />}
      <BreweryModal
        visible={!!breweryModal.visible}
        header={String(breweryModal.header ?? '')}
        address={String(breweryModal.address ?? '')}
        phone={String(breweryModal.phone ?? '')}
        image={String(breweryModal.image ?? '')}
        rating={Number(breweryModal.rating ?? 0)}
        isFavorite={Boolean(breweryModal.isFavorite)}
        isReadOnly={false}
        closeModal={closeModal}
        addToFavorites={() => onAddToFavoritePress(String(breweryModal.breweryId))}
      />
    </View>
  );
};

export default Breweries;
