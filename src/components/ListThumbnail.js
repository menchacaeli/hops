import React from 'react';
import StarRating from 'react-native-star-rating';
import {StyleSheet, View} from 'react-native';
import {
  Text,
  Thumbnail,
  Right,
  ListItem,
  Left,
  Button,
  Body,
} from 'native-base';

const ListThumbnail = ({
  image,
  text,
  subtext,
  onPress,
  releaseDate,
  rating,
  isReadOnly,
  onStarRatingPress,
}) => {
  return (
    <ListItem avatar>
      <Left>
        <Thumbnail source={{uri: image}} />
      </Left>
      <Body>
        <Text>{text}</Text>
        <Text note numberOfLines={1}>
          {subtext}
        </Text>
        {releaseDate ? (
          <Text note numberOfLines={1}>
            {releaseDate}
          </Text>
        ) : null}
        <View transparent style={styles.starContainer}>
          <StarRating
            disabled={isReadOnly}
            emptyStar={'star-border'}
            fullStar={'star'}
            halfStar={'star-half'}
            iconSet={'MaterialIcons'}
            maxStars={5}
            rating={rating}
            starSize={16}
            fullStarColor={isReadOnly ? 'gray' : 'gold'}
            starStyle={styles.star}
            selectedStar={onStarRatingPress}
          />
          <View style={styles.starTextContainer}>
            <Text note>{isReadOnly ? 'Rating ' : 'Rate '}</Text>
          </View>
        </View>
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
  star: {
    paddingRight: 2,
  },
  starContainer: {
    flexDirection: 'row',
    width: 100,
  },
  starTextContainer: {
    marginLeft: 10,
    paddingTop: 1,
  },
});

export default ListThumbnail;
