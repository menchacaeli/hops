import React, { useCallback } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import BeerModal from '../../components/BeerModal';
import ListThumbnailSquare from '../../components/ListThumbnailSquare';
import { Spinner } from '../../components/ui';
import { put } from '../../lib/fetchRequests';
import useDataFetch from '../../hooks/useDataFetch';
import useModal from '../../hooks/useModal';

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

const BREWERY_SECTIONS = [
  { label: 'BOSQUE BREWING CO.', name: 'Bosque Brewing Co.' },
  { label: 'LA CUMBRE BREWING CO.', name: 'La Cumbre Brewing Co.' },
  { label: 'MARBLE BREWING', name: 'Marble Brewery' },
  { label: 'SANTA FE BREWERY CO.', name: 'Santa Fe Brewing Co.' },
];

const BeerList = React.memo(function BeerList({
  beers,
  breweryName,
  onItemPress,
  onStarRatingPress,
}: {
  beers: Beer[];
  breweryName: string;
  onItemPress: (item: Beer) => void;
  onStarRatingPress: (rating: number, id: number) => void;
}) {
  const filtered = beers.filter(x => x.brewery === breweryName);
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
  const keyExtractor = useCallback((item: Beer) => String(item.id), []);
  return (
    <FlatList
      data={filtered}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      scrollEnabled={false}
    />
  );
});

const Beers = () => {
  const { data: beers, loading, load: loadBeers } = useDataFetch<Beer>('api/beers');
  const { modalState: beerModal, openModal, closeModal } = useModal();

  useFocusEffect(
    useCallback(() => { loadBeers(); }, [loadBeers]),
  );

  const onStarRatingPress = useCallback((rating: number, id: number) => {
    put(`api/beers/${id}`, null, { rating }).then(() => loadBeers());
  }, [loadBeers]);

  const onAddToFavoritePress = useCallback((id: number) => {
    put(`api/beers/${id}`, null, { isFavorite: true }).then(() => {
      loadBeers();
      closeModal();
    });
  }, [loadBeers, closeModal]);

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

  return (
    <View style={styles.container}>
      {loading ? (
        <Spinner />
      ) : (
        <FlatList
          data={BREWERY_SECTIONS}
          keyExtractor={s => s.name}
          renderItem={({ item: section }) => (
            <View>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionLabel}>{section.label}</Text>
              </View>
              <BeerList
                beers={beers}
                breweryName={section.name}
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
        addToFavorites={() => onAddToFavoritePress(Number(beerModal.beerId))}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6fbf7' },
  sectionHeader: {
    backgroundColor: '#e8f5e9',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  sectionLabel: { fontSize: 12, fontWeight: '600', color: '#555', letterSpacing: 0.5 },
});

export default Beers;
