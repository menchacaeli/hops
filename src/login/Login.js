import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Form, Item, Input, Button, Text} from 'native-base';

const Login = () => {
  const onLogin = () => {};

  return (
    <Form>
      <Item>
        <Input placeholder="Username" />
      </Item>
      <Item last>
        <Input placeholder="Password" />
      </Item>
      <Button
        rounded
        block
        success
        style={styles.button}
        onPress={() => onLogin()}>
        <Text>login</Text>
      </Button>
    </Form>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
  },
});

export default Login;
