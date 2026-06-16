import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import BeerModal from '../../components/BeerModal';
import SectionHeader from '../../components/SectionHeader';
import ListThumbnailSquare from '../../components/ListThumbnailSquare';
import { Spinner } from '../../components/ui';
import { updateBeer } from '../../data';
import useBeers from '../../hooks/useBeers';
import useUserFavorites from '../../hooks/useUserFavorites';
import useModal from '../../hooks/useModal';
import type { Beer } from '../../data';

const BREWERY_SECTIONS = [
  { label: 'BOSQUE BREWING CO.', id: 'bosque' },
  { label: 'LA CUMBRE BREWING CO.', id: 'la-cumbre' },
  { label: 'MARBLE BREWING', id: 'marble' },
  { label: 'SANTA FE BREWERY CO.', id: 'santa-fe' },
];

const BeerList = React.memo(function BeerList({
  beers, breweryId, onItemPress, onStarRatingPress,
}: {
  beers: Beer[];
  breweryId: string;
  onItemPress: (item: Beer) => void;
  onStarRatingPress: (rating: number, id: string) => void;
}) {
  const filtered = beers.filter(x => x.breweryId === breweryId);
  const renderItem = useCallback(({ item }: { item: Beer }) => (
    <ListThumbnailSquare
      text={item.name}
      subtext={item.description}
      image={item.image}
      rating={item.rating}
      isReadOnly={false}
      onStarRatingPress={rating => onStarRatingPress(rating, item.id)}
      onPress={() => onItemPress(item)}
    />
  ), [onItemPress, onStarRatingPress]);
  const keyExtractor = useCallback((item: Beer) => item.id, []);
  return <FlatList data={filtered} keyExtractor={keyExtractor} renderItem={renderItem} scrollEnabled={false} />;
});

const Beers = () => {
  const { beers, loading, load: loadBeers } = useBeers();
  const { isBeerFavorite, addBeerFavorite, load: loadFavorites } = useUserFavorites();
  const { modalState: beerModal, openModal, closeModal } = useModal();

  useFocusEffect(
    useCallback(() => { loadBeers(); loadFavorites(); }, [loadBeers, loadFavorites]),
  );

  const onStarRatingPress = useCallback(async (rating: number, id: string) => {
    await updateBeer(id, { rating });
    loadBeers();
  }, [loadBeers]);

  const onAddToFavoritePress = useCallback(async (id: string) => {
    await addBeerFavorite(id);
    loadFavorites();
    closeModal();
  }, [addBeerFavorite, loadFavorites, closeModal]);

  const handleItemPress = useCallback((item: Beer) => {
    openModal({
      beerId: item.id,
      header: item.name,
      subtext: item.breweryId,
      stats: `ABV: ${item.abv} IBUs: ${item.ibu}`,
      description: item.description,
      image: item.image,
      rating: item.rating,
      isFavorite: isBeerFavorite(item.id),
    });
  }, [openModal, isBeerFavorite]);

  return (
    <View className="flex-1 bg-amber-50 dark:bg-[#0C0A06]">
      {loading ? (
        <Spinner />
      ) : (
        <FlatList
          data={BREWERY_SECTIONS}
          keyExtractor={s => s.id}
          renderItem={({ item: section }) => (
            <View>
              <SectionHeader label={section.label} />
              <BeerList
                beers={beers}
                breweryId={section.id}
                onItemPress={handleItemPress}
                onStarRatingPress={onStarRatingPress}
              />
            </View>
          )}
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
        hasAddRemoveButton={true}
        closeModal={closeModal}
        addToFavorites={() => onAddToFavoritePress(String(beerModal.beerId))}
      />
    </View>
  );
};

export default Beers;
