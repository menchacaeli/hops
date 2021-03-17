import React, {useState} from 'react';
import cheerio from 'cheerio-without-node-native';
import moment from 'moment';
import ListThumbnailSeparator from '../../../components/ListThumbnailSeparator.js';
import {Container, Content, Separator, Text, Spinner} from 'native-base';
import EventModal from '../components/EventModal.js';
import {StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getCumbreEvents} from '../../../redux/slices/features/cumbreSlice.js';
import {getMarbleEvents} from '../../../redux/slices/features/marbleSlice.js';

const UpcomingEventsReleases = () => {
  const {cumbreEvents} = useSelector((state) => state.cumbre);
  const {marbleEvents} = useSelector((state) => state.marble);
  const [eventModal, setEventModal] = useState({
    visible: false,
    header: '',
    date: '',
    subtext: '',
    image: '',
  });
  const _dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      if (cumbreEvents && cumbreEvents.length <= 0)
        _dispatch(getCumbreEvents());
      if (marbleEvents && marbleEvents.length <= 0)
        _dispatch(getMarbleEvents());
    }, []),
  );

  const laCumbreEventsItems = cumbreEvents.map((item, index) => {
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
        {laCumbreEventsItems.length <= 0 && marbleEventsItems.length <= 0 ? (
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
