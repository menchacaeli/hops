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
        <Button transparent>
          <Text style={styles.button} onPress={onPress}>
            View
          </Text>
        </Button>
      </Right>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  button: {
    color: '#919c92',
  },
});

export default ListThumbnailSeparator;
