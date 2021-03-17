import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Form, Item, Input, Button, Text} from 'native-base';
import {fetchUser} from '../redux/slices/authSlice.js';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {loading} = useSelector((state) => state.auth);
  const _dispatch = useDispatch();

  useEffect(() => {
    console.log('login page token: ', loading);
  }, [loading]);

  const _onLogin = () => {
    if (email && password) {
      const lowerCaseEmail = email.toLowerCase();
      const user = {
        email: lowerCaseEmail,
        password: password,
      };
      if (user) {
        _dispatch(fetchUser(user));
      }
    }
  };

  return (
    <Form>
      <Item>
        <Input
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          autoCompleteType="off"
        />
      </Item>
      <Item last>
        <Input
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
          autoCompleteType="off"
        />
      </Item>
      <Button rounded block success style={styles.button} onPress={_onLogin}>
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
