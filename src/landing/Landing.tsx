import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, View, ScrollView, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from '../login/Login';
import Account from '../account/CreateAccount';
import { post } from '../lib/fetchRequests';

type Props = {
  setToken: (token: string) => void;
};

const Landing = ({ setToken }: Props) => {
  const [login, setLogin] = useState(false);
  const [account, setAccount] = useState(false);
  const opacityRef = useRef(new Animated.Value(0));
  const opacity = opacityRef.current;

  useEffect(() => {
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
      easing: Easing.sin,
    }).start();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setUser = (user: { email: string; password: string }) => {
    post('auth/signin', user)
      .then(response => {
        if (response.status === 'success') {
          const data = response.data as { user?: { _id?: string } };
          const token = data?.user?._id;
          if (token) {
            AsyncStorage.setItem('token', token)
              .then(() => setToken(token))
              .catch(error => console.log({ asyncStorageError: error }));
          }
        }
      })
      .catch(err => console.log({ err }));
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.boxContainer}>
          <Animated.View style={{ opacity }}>
            <Text style={styles.hops}>Hops</Text>
          </Animated.View>
        </View>
        <View>
          {login ? <Login setUser={setUser} /> : null}
          {account ? <Account setUser={setUser} /> : null}
          {!login && !account ? (
            <>
              <TouchableOpacity
                style={[styles.button, styles.buttonOutline]}
                onPress={() => setLogin(true)}>
                <Text style={styles.buttonOutlineText}>login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonFilled]}
                onPress={() => setAccount(true)}>
                <Text style={styles.buttonFilledText}>create account</Text>
              </TouchableOpacity>
            </>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6fbf7',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  boxContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  hops: {
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#71bc78',
  },
  button: {
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonOutline: {
    borderWidth: 2,
    borderColor: '#71bc78',
  },
  buttonOutlineText: {
    color: '#71bc78',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonFilled: {
    backgroundColor: '#71bc78',
  },
  buttonFilledText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Landing;
