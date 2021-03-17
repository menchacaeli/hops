import React from 'react';
import {StyleSheet} from 'react-native';
import {
  Text,
  Thumbnail,
  Right,
  ListItem,
  Left,
  Body,
  Button,
} from 'native-base';

const ListThumbnailSeparator = ({image, text, subtext, onPress}) => {
  return (
    <ListItem thumbnail>
      <Left>
        <Thumbnail source={{uri: image}} />
      </Left>
      <Body>
        <Text>{text}</Text>
        <Text note numberOfLines={1}>
          {subtext}
        </Text>
      </Body>
      <Right>
        <Button transparent onPress={onPress}>
          <Text style={styles.view}>View</Text>
        </Button>
      </Right>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  view: {
    color: '#919c92',
    fontSize: 14,
  },
});

export default ListThumbnailSeparator;
