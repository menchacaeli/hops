import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import cheerio from 'cheerio-without-node-native';
import { format, parseISO } from 'date-fns';
import { useFocusEffect } from '@react-navigation/native';
import ListThumbnailSeparator from '../../../components/ListThumbnailSeparator';
import EventModal from '../components/EventModal';
import { Spinner } from '../../../components/ui';
import useModal from '../../../hooks/useModal';

type EventItem = {
  name: string;
  image: string;
  description: string;
  date: string;
};

const SectionHeader = ({ label }: { label: string }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionLabel}>{label}</Text>
  </View>
);

const UpcomingEventsReleases = () => {
  const [laCumbreEvents, setLaCumbreEvents] = useState<EventItem[]>([]);
  const [marbleEvents, setMarbleEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { modalState: eventModal, openModal, closeModal } = useModal();

  const loadLaCumbreEvents = async () => {
    try {
      const response = await fetch('https://www.lacumbrebrewing.com/');
      const htmlString = await response.text();
      const $ = cheerio.load(htmlString);
      const results: EventItem[] = [];
      $('ul.eventon_events_list > div').each((_, event) => {
        results.push({
          name: $('.evo_event_schema > span[itemprop="name"]', event).text(),
          image: $('.evo_event_schema > meta[itemprop="image"]', event).attr('content') ?? '',
          description: $('.evo_event_schema > meta[itemprop="description"]', event).attr('content') ?? '',
          date: $('.evo_event_schema > meta[itemprop="startDate"]', event).attr('content') ?? '',
        });
      });
      setLaCumbreEvents(results);
    } catch (e) {
      setLaCumbreEvents([]);
    }
  };

  const loadMarbleEvents = async () => {
    try {
      const response = await fetch('https://marblebrewery.com/events');
      const htmlString = await response.text();
      const $ = cheerio.load(htmlString);
      const results: EventItem[] = [];
      $('#events > div').each((_, event) => {
        results.push({
          name: $('.offsiteEvent h2', event).text(),
          image: $('.offsiteEvent img', event).attr('src') ?? '',
          description: $('.offsiteEvent p', event).text(),
          date: $('.offsiteEvent h3', event).text(),
        });
      });
      setMarbleEvents(results);
    } catch (e) {
      setMarbleEvents([]);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      Promise.all([loadLaCumbreEvents(), loadMarbleEvents()]).finally(() =>
        setLoading(false),
      );
    }, []),
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

  if (loading) {
    return <Spinner />;
  }

  return (
    <ScrollView style={styles.container}>
      {laCumbreEvents.length > 0 && (
        <>
          <SectionHeader label="LA CUMBRE BREWING CO" />
          {laCumbreEvents.map((item, index) => (
            <ListThumbnailSeparator
              key={index}
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
        </>
      )}
      {marbleEvents.length > 0 && (
        <>
          <SectionHeader label="MARBLE BREWING CO" />
          {marbleEvents.map((item, index) => (
            <ListThumbnailSeparator
              key={index}
              text={item.name}
              subtext={item.description}
              image={item.image}
              onPress={() =>
                openModal({
                  header: item.name,
                  subtext: item.description,
                  date: item.date,
                  image: item.image,
                })
              }
            />
          ))}
        </>
      )}
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
  container: {
    flex: 1,
    backgroundColor: '#f6fbf7',
  },
  sectionHeader: {
    backgroundColor: '#e8f5e9',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555',
    letterSpacing: 0.5,
  },
});

export default UpcomingEventsReleases;
