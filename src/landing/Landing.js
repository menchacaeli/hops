import React, {useEffect, useState} from 'react';
import {
  Animated,
  Easing,
  SectionList,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  ToastAndroid
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Container, Content, Form, Item, Input, Button, Text} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';
import Login from '../login/Login.js';
import Account from '../account/CreateAccount.js';
import {post} from '../../helpers/fetchRequests';
const Landing = ({setToken}) => {
  const [login, setLogin] = useState(false);
  const [account, setAccount] = useState(false);

  useEffect(() => {
    animate(Easing.sin);
  });

  let opacity = new Animated.Value(0);
  const animate = easing => {
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
      easing,
    }).start();
  };

  const size = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 80],
  });

  const animatedStyles = [
    styles.box,
    {
      opacity,
    },
  ];

  const onCreateAccount = () => {
    setAccount(true);
  };

  const onLogin = () => {
    setLogin(true);
  };

  const setUser = (user={name:'',email:'',password:''}) => {
    const endpoint = 'auth/signin';
    post(endpoint, user).then(response => {
      if (response && response.status && response.status === "success") {
        const token = response.data.user._id;
        AsyncStorage.setItem('token', token).then(status => {
          setToken(token)
        }).catch(error => {
          console.log({asyncStorageError: error})
        })
      }
    }).catch(err => {
      console.log({err})
    })
  }
  return (
    <Container style={styles.container}>
      <Content contentContainerStyle={styles.content}>
        <View style={styles.boxContainer}>
          <Animated.View style={animatedStyles}>
            <Text style={styles.hops}>Hops</Text>
          </Animated.View>
        </View>
        <Form>
          {login ? <Login setUser={setUser}/> : null}
          {account ? <Account setUser={setUser}/> : null}
          {login ? null : account ? null : (
            <>
              <Button
                rounded
                bordered
                block
                success
                style={styles.button}
                onPress={() => onLogin()}>
                <Text>login</Text>
              </Button>
              <Button
                rounded
                block
                success
                style={styles.button}
                onPress={() => onCreateAccount()}>
                <Text>create account</Text>
              </Button>
            </>
          )}
        </Form>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6fbf7',
  },
  boxContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  box: {
    borderRadius: 4,
  },
  hops: {
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#71bc78',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    margin: 20,
  },
  button: {
    marginTop: 20,
  },
});

export default Landing;
