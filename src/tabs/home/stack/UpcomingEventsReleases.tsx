import React, { useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { format, parseISO } from 'date-fns';
import { useFocusEffect } from '@react-navigation/native';
import SectionHeader from '../../../components/SectionHeader';
import EventModal from '../components/EventModal';
import { Card, ListEmptyState, Screen, Spinner } from '../../../components/ui';
import useEvents from '../../../hooks/useEvents';
import useModal from '../../../hooks/useModal';
import { tabContentInset } from '../../../styles/layout';

const BREWERY_LABELS: Record<string, string> = {
  'la-cumbre': 'La Cumbre Brewing Co.',
  'marble': 'Marble Brewing Co.',
  'bosque': 'Bosque Brewing Co.',
  'santa-fe': 'Santa Fe Brewing Co.',
};

const formatDate = (date: string) => {
  try {
    return date.length > 10
      ? format(parseISO(date), 'MMM d, yyyy, h:mm aa')
      : format(parseISO(date), 'MMM d, yyyy');
  } catch {
    return date;
  }
};

const parseDateBadge = (date: string): { day: string; month: string } => {
  try {
    const d = parseISO(date);
    return { day: format(d, 'd'), month: format(d, 'MMM').toUpperCase() };
  } catch {
    return { day: '?', month: '???' };
  }
};

const UpcomingEventsReleases = () => {
  const { events, loading, load } = useEvents();
  const { modalState: eventModal, openModal, closeModal } = useModal();

  useFocusEffect(useCallback(() => { load(); }, [load]));

  const breweryIds = [...new Set(events.map(e => e.breweryId))];

  if (loading) {
    return (
      <Screen>
        <Spinner />
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView contentContainerStyle={tabContentInset}>
        {breweryIds.length === 0 ? <ListEmptyState label="No upcoming events or releases yet." /> : null}
        {breweryIds.map(breweryId => {
          const breweryEvents = events.filter(e => e.breweryId === breweryId);
          return (
            <View key={breweryId} className="mb-4">
              <SectionHeader label={BREWERY_LABELS[breweryId] ?? breweryId.toUpperCase()} />
              <Card className="p-0 overflow-hidden">
                {breweryEvents.map((item) => {
                  const badge = parseDateBadge(item.date);
                  return (
                    <TouchableOpacity
                      key={item.id}
                      className="flex-row items-center py-4 px-4 bg-transparent border-b border-atelier-separator dark:border-atelier-separator-dark"
                      onPress={() => openModal({
                        header: item.name,
                        subtext: item.description,
                        date: formatDate(item.date),
                        image: item.image,
                      })}
                    >
                      <View className="bg-atelier-accent rounded-xl w-12 items-center py-2 mr-3">
                        <Text className="font-black text-white text-lg leading-none">{badge.day}</Text>
                        <Text className="text-white text-xs uppercase">{badge.month}</Text>
                      </View>
                      <View className="flex-1">
                        <Text className="text-atelier-text dark:text-atelier-text-inverse font-semibold text-sm" numberOfLines={1}>
                          {item.name}
                        </Text>
                        <Text className="text-atelier-text-muted dark:text-atelier-text-muted-dark text-xs mt-0.5" numberOfLines={2}>
                          {item.description}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </Card>
            </View>
          );
        })}
      </ScrollView>
      <EventModal
        visible={!!eventModal.visible}
        header={String(eventModal.header ?? '')}
        date={String(eventModal.date ?? '')}
        subtext={String(eventModal.subtext ?? '')}
        image={String(eventModal.image ?? '')}
        closeModal={closeModal}
      />
    </Screen>
  );
};

export default UpcomingEventsReleases;
