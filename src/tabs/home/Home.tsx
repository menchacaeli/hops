import React, { useCallback } from 'react';
import { FlatList, ScrollView, StyleSheet, View, Text } from 'react-native';
import { useFocusEffect, NavigationProp } from '@react-navigation/native';
import BeerModal from '../../components/BeerModal';
import BreweryModal from '../../components/BreweryModal';
import ListIcon from '../../components/ListIcon';
import ListThumbnailSquare from '../../components/ListThumbnailSquare';
import ListThumbnail from '../../components/ListThumbnail';
import { Card, Spinner } from '../../components/ui';
import useUserFavorites from '../../hooks/useUserFavorites';
import useModal from '../../hooks/useModal';
import type { Beer, Brewery } from '../../data';

const MENU_ITEMS = [
  { text: 'Upcoming Events & Releases', icon: 'calendar-alt', stack: 'Upcoming Events & Releases' },
  { text: 'Top Rated Beers', icon: 'beer', stack: 'Top Rated Beers' },
  { text: 'Top Rated Breweries', icon: 'warehouse', stack: 'Top Rated Breweries' },
];

type Props = { navigation: NavigationProp<Record<string, undefined>> };

const Home = ({ navigation }: Props) => {
  const { favoriteBeers, favoriteBreweries, loading, load, removeBeerFavorite, removeBreweryFavorite } = useUserFavorites();
  const { modalState: beerModal, openModal: openBeerModal, closeModal: closeBeerModal } = useModal();
  const { modalState: breweryModal, openModal: openBreweryModal, closeModal: closeBreweryModal } = useModal();

  useFocusEffect(useCallback(() => { load(); }, [load]));

  const onRemoveBeerFavorite = useCallback(async (id: string) => {
    await removeBeerFavorite(id);
    load();
    closeBeerModal();
  }, [removeBeerFavorite, load, closeBeerModal]);

  const onRemoveBreweryFavorite = useCallback(async (id: string) => {
    await removeBreweryFavorite(id);
    load();
    closeBreweryModal();
  }, [removeBreweryFavorite, load, closeBreweryModal]);

  const renderMenuItem = useCallback(({ item }: { item: typeof MENU_ITEMS[0] }) => (
    <ListIcon text={item.text} icon={item.icon} stack={item.stack} navigation={navigation} />
  ), [navigation]);

  const renderFavBeer = useCallback(({ item }: { item: Beer }) => (
    <ListThumbnailSquare
      text={item.name} subtext={item.description} image={item.image} rating={item.rating} isReadOnly={true}
      onPress={() => openBeerModal({ beerId: item.id, header: item.name, subtext: item.breweryId, stats: `ABV: ${item.abv} IBUs: ${item.ibu}`, description: item.description, image: item.image, rating: item.rating, isFavorite: true })}
    />
  ), [openBeerModal]);

  const renderFavBrewery = useCallback(({ item }: { item: Brewery }) => (
    <ListThumbnail
      text={item.name} subtext={item.address} image={item.image} rating={item.rating} isReadOnly={true}
      onPress={() => openBreweryModal({ breweryId: item.id, header: item.name, address: item.address, phone: item.phone, image: item.image, rating: item.rating, isFavorite: true })}
    />
  ), [openBreweryModal]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card style={styles.card}>
        <FlatList data={MENU_ITEMS} keyExtractor={item => item.stack} renderItem={renderMenuItem} scrollEnabled={false} />
      </Card>
      <Card style={styles.card}>
        <Text style={styles.cardHeader}>Favorite Beers</Text>
        {loading ? <Spinner /> : (
          <FlatList data={favoriteBeers} keyExtractor={item => item.id} renderItem={renderFavBeer} scrollEnabled={false} />
        )}
      </Card>
      <Card style={styles.card}>
        <Text style={styles.cardHeader}>Favorite Breweries</Text>
        {loading ? <Spinner /> : (
          <FlatList data={favoriteBreweries} keyExtractor={item => item.id} renderItem={renderFavBrewery} scrollEnabled={false} />
        )}
      </Card>
      <BeerModal
        visible={!!beerModal.visible} header={String(beerModal.header ?? '')} subtext={String(beerModal.subtext ?? '')}
        stats={String(beerModal.stats ?? '')} description={String(beerModal.description ?? '')} image={String(beerModal.image ?? '')}
        rating={Number(beerModal.rating ?? 0)} isFavorite={true} isReadOnly={true} hasAddRemoveButton={false}
        closeModal={closeBeerModal} removeFromFavorites={() => onRemoveBeerFavorite(String(beerModal.beerId))}
      />
      <BreweryModal
        visible={!!breweryModal.visible} header={String(breweryModal.header ?? '')} address={String(breweryModal.address ?? '')}
        phone={String(breweryModal.phone ?? '')} image={String(breweryModal.image ?? '')}
        rating={Number(breweryModal.rating ?? 0)} isFavorite={true} isReadOnly={true}
        closeModal={closeBreweryModal} removeFromFavorites={() => onRemoveBreweryFavorite(String(breweryModal.breweryId))}
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
