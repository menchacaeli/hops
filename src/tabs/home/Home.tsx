import React, { useCallback } from 'react';
import { FlatList, ScrollView, StyleSheet, View, Text } from 'react-native';
import { useFocusEffect, NavigationProp } from '@react-navigation/native';
import BeerModal from '../../components/BeerModal';
import BreweryModal from '../../components/BreweryModal';
import ListIcon from '../../components/ListIcon';
import ListThumbnailSquare from '../../components/ListThumbnailSquare';
import ListThumbnail from '../../components/ListThumbnail';
import { Card, Spinner } from '../../components/ui';
import { put } from '../../lib/fetchRequests';
import useDataFetch from '../../hooks/useDataFetch';
import useModal from '../../hooks/useModal';

type Beer = { id: number; name: string; brewery: string; abv: number; ibu: number; description: string; image: string; rating: number; isFavorite: boolean; };
type Brewery = { id: number; name: string; address: string; phone: string; image: string; rating: number; isFavorite: boolean; };

const MENU_ITEMS = [
  { text: 'Upcoming Events & Releases', icon: 'calendar-alt', stack: 'Upcoming Events & Releases' },
  { text: 'Top Rated Beers', icon: 'beer', stack: 'Top Rated Beers' },
  { text: 'Top Rated Breweries', icon: 'warehouse', stack: 'Top Rated Breweries' },
];

type Props = { navigation: NavigationProp<Record<string, undefined>>; };

const Home = ({ navigation }: Props) => {
  const { data: favoriteBeers, loading: loadingBeers, load: loadFavoriteBeers } = useDataFetch<Beer>('api/beers/favorites');
  const { data: favoriteBreweries, loading: loadingBreweries, load: loadFavoriteBreweries } = useDataFetch<Brewery>('api/breweries/favorites');
  const { modalState: beerModal, openModal: openBeerModal, closeModal: closeBeerModal } = useModal();
  const { modalState: breweryModal, openModal: openBreweryModal, closeModal: closeBreweryModal } = useModal();

  useFocusEffect(
    useCallback(() => {
      loadFavoriteBeers();
      loadFavoriteBreweries();
    }, [loadFavoriteBeers, loadFavoriteBreweries]),
  );

  const onRemoveFromFavoritePress = (id: number, type: 'beers' | 'breweries') => {
    put(`api/${type}/${id}`, null, { isFavorite: false }).then(() => {
      if (type === 'beers') { loadFavoriteBeers(); closeBeerModal(); }
      else { loadFavoriteBreweries(); closeBreweryModal(); }
    });
  };

  const renderMenuItem = useCallback(({ item }: { item: typeof MENU_ITEMS[0] }) => (
    <ListIcon text={item.text} icon={item.icon} stack={item.stack} navigation={navigation} />
  ), [navigation]);

  const renderFavBeer = useCallback(({ item }: { item: Beer }) => (
    <ListThumbnailSquare
      text={item.name} subtext={item.description} image={item.image} rating={item.rating} isReadOnly={true}
      onPress={() => openBeerModal({ beerId: item.id, header: item.name, subtext: item.brewery, stats: `ABV: ${item.abv} IBUs: ${item.ibu}`, description: item.description, image: item.image, rating: item.rating, isFavorite: item.isFavorite })}
    />
  ), [openBeerModal]);

  const renderFavBrewery = useCallback(({ item }: { item: Brewery }) => (
    <ListThumbnail
      text={item.name} subtext={item.address} image={item.image} rating={item.rating} isReadOnly={true}
      onPress={() => openBreweryModal({ breweryId: item.id, header: item.name, address: item.address, phone: item.phone, image: item.image, rating: item.rating, isFavorite: item.isFavorite })}
    />
  ), [openBreweryModal]);

  const loading = loadingBeers || loadingBreweries;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card style={styles.card}>
        <FlatList data={MENU_ITEMS} keyExtractor={item => item.stack} renderItem={renderMenuItem} scrollEnabled={false} />
      </Card>
      <Card style={styles.card}>
        <Text style={styles.cardHeader}>Favorite Beers</Text>
        {loading ? <Spinner /> : (
          <FlatList data={favoriteBeers} keyExtractor={item => String(item.id)} renderItem={renderFavBeer} scrollEnabled={false} />
        )}
      </Card>
      <Card style={styles.card}>
        <Text style={styles.cardHeader}>Favorite Breweries</Text>
        {loading ? <Spinner /> : (
          <FlatList data={favoriteBreweries} keyExtractor={item => String(item.id)} renderItem={renderFavBrewery} scrollEnabled={false} />
        )}
      </Card>
      <BeerModal
        visible={!!beerModal.visible} header={String(beerModal.header ?? '')} subtext={String(beerModal.subtext ?? '')} stats={String(beerModal.stats ?? '')} description={String(beerModal.description ?? '')} image={String(beerModal.image ?? '')} rating={Number(beerModal.rating ?? 0)} isFavorite={Boolean(beerModal.isFavorite)}
        isReadOnly={true} hasAddRemoveButton={false} closeModal={closeBeerModal}
        removeFromFavorites={() => onRemoveFromFavoritePress(Number(beerModal.beerId), 'beers')}
      />
      <BreweryModal
        visible={!!breweryModal.visible} header={String(breweryModal.header ?? '')} address={String(breweryModal.address ?? '')} phone={String(breweryModal.phone ?? '')} image={String(breweryModal.image ?? '')} rating={Number(breweryModal.rating ?? 0)} isFavorite={Boolean(breweryModal.isFavorite)}
        isReadOnly={true} closeModal={closeBreweryModal}
        removeFromFavorites={() => onRemoveFromFavoritePress(Number(breweryModal.breweryId), 'breweries')}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6fbf7' },
  content: { padding: 12 },
  card: { marginBottom: 12, padding: 0, overflow: 'hidden' },
  cardHeader: { fontSize: 15, fontWeight: '600', paddingVertical: 10, paddingHorizontal: 16, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#e0e0e0' },
});

export default Home;
