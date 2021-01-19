import React, {useState} from 'react';
import cheerio from 'cheerio-without-node-native';
import moment from 'moment';
import ListThumbnailSeparator from '../../../components/ListThumbnailSeparator.js';
import {Container, Content, Separator, Text, Spinner} from 'native-base';
import EventModal from '../components/EventModal.js';
import {StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

const UpcomingEventsReleases = () => {
  const [laCumbreEvents, setLaCumbreEvents] = useState([]);
  const [marbleEvents, setMarbleEvents] = useState([]);
  const [eventModal, setEventModal] = useState({
    visible: false,
    header: '',
    date: '',
    subtext: '',
    image: '',
  });

  useFocusEffect(
    React.useCallback(() => {
      loadLaCumbreEvents();
      loadMarbleEvents();
    }, []),
  );

  const loadLaCumbreEvents = async () => {
    const searchUrl = 'https://www.lacumbrebrewing.com/';
    const response = await fetch(searchUrl);

    const htmlString = await response.text();
    const $ = cheerio.load(htmlString);
    const eventsList = $('ul.eventon_events_list > div');
    let results = [];
    eventsList.map((_, event) => {
      let obj = {
        name: $('.evo_event_schema > span[itemprop="name"]', event).text(),
        image: $('.evo_event_schema > meta[itemprop="image"]', event).attr(
          'content',
        ),
        description: $(
          '.evo_event_schema > meta[itemprop="description"]',
          event,
        ).attr('content'),
        date: $('.evo_event_schema > meta[itemprop="startDate"]', event).attr(
          'content',
        ),
      };
      results.push(obj);
    });
    setLaCumbreEvents(results);
  };

  const loadMarbleEvents = async () => {
    const searchUrl = 'https://marblebrewery.com/events';
    const response = await fetch(searchUrl);

    const htmlString = await response.text();
    const $ = cheerio.load(htmlString);
    const eventsList = $('#events > div');
    let results = [];
    eventsList.map((_, event) => {
      let obj = {
        name: $('.offsiteEvent h2', event).text(),
        image: $('.offsiteEvent img', event).attr('src'),
        description: $('.offsiteEvent p', event).text(),
        date: $('.offsiteEvent h3', event).text(),
      };
      results.push(obj);
    });
    setMarbleEvents(results);
  };

  const laCumbreEventsItems = laCumbreEvents.map((item, index) => {
    return (
      <ListThumbnailSeparator
        key={index}
        text={item.name}
        subtext={item.description}
        image={item.image}
        onPress={() =>
          setEventModal({
            visible: true,
            header: item.name,
            subtext: item.description,
            date:
              item.date.length > 10
                ? moment(item.date, 'YYYY-MM-DDTHH:mm:ss').format('lll')
                : moment(item.date, 'YYYY-MM-DD').format('ll'),
            image: item.image,
          })
        }
      />
    );
  });

  const marbleEventsItems = marbleEvents.map((item, index) => {
    return (
      <ListThumbnailSeparator
        key={index}
        text={item.name}
        subtext={item.description}
        image={item.image}
        onPress={() =>
          setEventModal({
            visible: true,
            header: item.name,
            subtext: item.description,
            date: item.date,
            image: item.image,
          })
        }
      />
    );
  });

  return (
    <Container>
      <Content>
        {laCumbreEventsItems.length <= 0 || marbleEventsItems.length <= 0 ? (
          <Spinner color="#71bc78" style={styles.spinner} />
        ) : (
          <>
            {laCumbreEventsItems.length <= 0 ? null : (
              <>
                <Separator bordered>
                  <Text>LA CUMBRE BREWERING CO</Text>
                </Separator>
                {laCumbreEventsItems}
              </>
            )}
            {marbleEventsItems.length <= 0 ? null : (
              <>
                <Separator bordered>
                  <Text>MARBLE BREWERING CO</Text>
                </Separator>
                {marbleEventsItems}
              </>
            )}
          </>
        )}
      </Content>
      <EventModal
        visible={eventModal.visible}
        header={eventModal.header}
        date={eventModal.date}
        subtext={eventModal.subtext}
        image={eventModal.image}
        closeModal={() => {
          setEventModal({
            ...eventModal,
            visible: false,
          });
        }}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '75%',
  },
});
export default UpcomingEventsReleases;
