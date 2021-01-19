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

const ListThumbnailSquare = ({
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
    <ListItem thumbnail>
      <Left>
        <Thumbnail square source={{uri: image}} style={styles.thumbnailImage} />
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
            emptyStar={'ios-star-outline'}
            fullStar={'ios-star'}
            halfStar={'ios-star-half'}
            iconSet={'Ionicons'}
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
        <Button transparent>
          <Text style={styles.view} onPress={onPress}>
            View
          </Text>
        </Button>
      </Right>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  view: {
    color: '#919c92',
  },
  thumbnailImage: {
    resizeMode: 'contain',
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

export default ListThumbnailSquare;
