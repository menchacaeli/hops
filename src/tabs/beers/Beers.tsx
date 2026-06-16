import React, { useCallback, useMemo } from 'react';
import { FlatList, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import BeerModal from '../../components/BeerModal';
import SectionHeader from '../../components/SectionHeader';
import ListThumbnailSquare from '../../components/ListThumbnailSquare';
import { Card, ListEmptyState, Screen, Spinner } from '../../components/ui';
import { updateBeer } from '../../data';
import useBeers from '../../hooks/useBeers';
import useBreweries from '../../hooks/useBreweries';
import useUserFavorites from '../../hooks/useUserFavorites';
import useModal from '../../hooks/useModal';
import { tabContentInset } from '../../styles/layout';
import type { Beer } from '../../data';

type BrewerySection = {
  breweryId: string;
  label: string;
  beers: Beer[];
};

const BeerList = React.memo(function BeerList({
  beers,
  onItemPress,
  onStarRatingPress,
}: {
  beers: Beer[];
  onItemPress: (item: Beer) => void;
  onStarRatingPress: (rating: number, id: string) => void;
}) {
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
  return (
    <FlatList
      data={beers}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      scrollEnabled={false}
      ListEmptyComponent={<ListEmptyState label="No beers available yet." />}
    />
  );
});

const Beers = () => {
  const { beers, loading: beersLoading, load: loadBeers } = useBeers();
  const { breweries, loading: breweriesLoading, load: loadBreweries } = useBreweries();
  const { isBeerFavorite, addBeerFavorite, load: loadFavorites } = useUserFavorites();
  const { modalState: beerModal, openModal, closeModal } = useModal();

  useFocusEffect(
    useCallback(() => {
      loadBeers();
      loadBreweries();
      loadFavorites();
    }, [loadBeers, loadBreweries, loadFavorites]),
  );

  const loading = beersLoading || breweriesLoading;

  const sections = useMemo<BrewerySection[]>(() => {
    const breweryIdSet = [...new Set(beers.map(b => b.breweryId).filter(Boolean))].sort();
    return breweryIdSet.map(breweryId => {
      const name = breweries.find(b => b.id === breweryId)?.name ?? breweryId ?? '';
      return {
        breweryId,
        label: name.toUpperCase(),
        beers: beers.filter(b => b.breweryId === breweryId),
      };
    });
  }, [beers, breweries]);

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

  const renderSection = useCallback(({ item: section }: { item: BrewerySection }) => (
    <View className="mb-4">
      <SectionHeader label={section.label} />
      <Card className="p-0 overflow-hidden">
        <BeerList
          beers={section.beers}
          onItemPress={handleItemPress}
          onStarRatingPress={onStarRatingPress}
        />
      </Card>
    </View>
  ), [handleItemPress, onStarRatingPress]);

  const keyExtractor = useCallback((s: BrewerySection) => s.breweryId, []);

  return (
    <Screen>
      {loading ? (
        <Spinner />
      ) : (
        <FlatList
          data={sections}
          keyExtractor={keyExtractor}
          contentContainerStyle={tabContentInset}
          renderItem={renderSection}
          ListEmptyComponent={<ListEmptyState label="No beers found. Run ingestion from Profile." />}
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
    </Screen>
  );
};

export default Beers;
