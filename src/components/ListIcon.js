import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, Icon, Right, ListItem, Left, Button, Body} from 'native-base';

const ListIcon = ({text, icon, stack, navigation}) => {
  return (
    <ListItem icon button={true} onPress={() => navigation.navigate(stack)}>
      <Left>
        <Button transparent>
          <Icon active type="FontAwesome5" name={icon} style={styles.icon} />
        </Button>
      </Left>
      <Body>
        <Text>{text}</Text>
      </Body>
      <Right>
        <Icon active type="FontAwesome5" name="chevron-right" />
      </Right>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  icon: {
    fontSize: 18,
    color: '#71bc78',
  },
});

export default ListIcon;
