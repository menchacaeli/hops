import React, { useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { format, parseISO } from 'date-fns';
import { useFocusEffect } from '@react-navigation/native';
import ListThumbnailSeparator from '../../../components/ListThumbnailSeparator';
import EventModal from '../components/EventModal';
import { Spinner } from '../../../components/ui';
import useEvents from '../../../hooks/useEvents';
import useModal from '../../../hooks/useModal';
import type { EventItem } from '../../../data';

const BREWERY_LABELS: Record<string, string> = {
  'la-cumbre': 'LA CUMBRE BREWING CO',
  'marble': 'MARBLE BREWING CO',
  'bosque': 'BOSQUE BREWING CO',
  'santa-fe': 'SANTA FE BREWING CO',
};

const SectionHeader = ({ label }: { label: string }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionLabel}>{label}</Text>
  </View>
);

const formatDate = (date: string) => {
  try {
    return date.length > 10
      ? format(parseISO(date), 'MMM d, yyyy, h:mm aa')
      : format(parseISO(date), 'MMM d, yyyy');
  } catch {
    return date;
  }
};

const UpcomingEventsReleases = () => {
  const { events, loading, load } = useEvents();
  const { modalState: eventModal, openModal, closeModal } = useModal();

  useFocusEffect(useCallback(() => { load(); }, [load]));

  const breweryIds = [...new Set(events.map(e => e.breweryId))];

  if (loading) return <Spinner />;

  return (
    <ScrollView style={styles.container}>
      {breweryIds.map(breweryId => {
        const breweryEvents = events.filter(e => e.breweryId === breweryId);
        return (
          <View key={breweryId}>
            <SectionHeader label={BREWERY_LABELS[breweryId] ?? breweryId.toUpperCase()} />
            {breweryEvents.map((item: EventItem) => (
              <ListThumbnailSeparator
                key={item.id}
                text={item.name}
                subtext={item.description}
                image={item.image}
                onPress={() =>
                  openModal({
                    header: item.name,
                    subtext: item.description,
                    date: formatDate(item.date),
                    image: item.image,
                  })
                }
              />
            ))}
          </View>
        );
      })}
      <EventModal
        visible={!!eventModal.visible}
        header={String(eventModal.header ?? '')}
        date={String(eventModal.date ?? '')}
        subtext={String(eventModal.subtext ?? '')}
        image={String(eventModal.image ?? '')}
        closeModal={closeModal}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6fbf7' },
  sectionHeader: { backgroundColor: '#e8f5e9', paddingVertical: 8, paddingHorizontal: 16, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#ccc' },
  sectionLabel: { fontSize: 12, fontWeight: '600', color: '#555', letterSpacing: 0.5 },
});

export default UpcomingEventsReleases;
