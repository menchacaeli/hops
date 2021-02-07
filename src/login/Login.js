import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Form, Item, Input, Button, Text} from 'native-base';

const Login = ({setUser}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    if (email && password) {
      const lowerCaseEmail = email.toLowerCase();
      const user = {
        email: lowerCaseEmail,
        password: password,
      };
      setUser(user);
    }
  };

  return (
    <Form>
      <Item>
        <Input
          placeholder="Email"
          onChangeText={email => setEmail(email)}
          autoCompleteType="off"
        />
      </Item>
      <Item last>
        <Input
          placeholder="Password"
          onChangeText={password => setPassword(password)}
          autoCompleteType="off"
        />
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
