import React, {useEffect, useState} from 'react';
import {
  Animated,
  Easing,
  SectionList,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text,
  Spinner,
} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';
import Login from '../login/Login.js';
import Tabs from '../tabs/index.js';
import Account from '../account/CreateAccount.js';
import {post} from '../../helpers/fetchRequests';
import {useDispatch, useSelector} from 'react-redux';

const Landing = () => {
  const [login, setLogin] = useState(false);
  const [account, setAccount] = useState(false);
  const {token, loading} = useSelector((state) => state.auth);

  useEffect(() => {
    animate(Easing.sin);
  });

  let opacity = new Animated.Value(0);
  const animate = (easing) => {
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

  return (
    <>
      {loading === 'pending' ? (
        <Spinner color="#71bc78" style={styles.spinner} />
      ) : token && loading === 'fulfilled' ? (
        <Tabs />
      ) : (
        <Container style={styles.container}>
          <Content contentContainerStyle={styles.content}>
            <View style={styles.boxContainer}>
              <Animated.View style={animatedStyles}>
                <Text style={styles.hops}>Hops</Text>
              </Animated.View>
            </View>
            <Form>
              {login ? <Login /> : null}
              {account ? <Account /> : null}
              {login ? null : account ? null : (
                <>
                  <Button
                    rounded
                    bordered
                    block
                    success
                    style={styles.button}
                    onPress={() => setLogin(true)}>
                    <Text>login</Text>
                  </Button>
                  <Button
                    rounded
                    block
                    success
                    style={styles.button}
                    onPress={() => setAccount(true)}>
                    <Text>create account</Text>
                  </Button>
                </>
              )}
            </Form>
          </Content>
        </Container>
      )}
    </>
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
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2o%',
  },
});

export default Landing;
