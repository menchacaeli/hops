// src/landing/Landing.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, View, ScrollView, TouchableOpacity, Text } from 'react-native';
import Login from '../login/Login';
import Account from '../account/CreateAccount';
import type { AuthResult } from '../data';

type Props = {
  login: (email: string, password: string) => Promise<AuthResult>;
  createAccount: (email: string, password: string, displayName?: string) => Promise<AuthResult>;
};

const Landing = ({ login, createAccount }: Props) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
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

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.boxContainer}>
          <Animated.View style={{ opacity }}>
            <Text style={styles.hops}>Hops</Text>
          </Animated.View>
        </View>
        <View>
          {showLogin ? <Login login={login} /> : null}
          {showAccount ? <Account createAccount={createAccount} /> : null}
          {!showLogin && !showAccount ? (
            <>
              <TouchableOpacity style={[styles.button, styles.buttonOutline]} onPress={() => setShowLogin(true)}>
                <Text style={styles.buttonOutlineText}>login</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.buttonFilled]} onPress={() => setShowAccount(true)}>
                <Text style={styles.buttonFilledText}>create account</Text>
              </TouchableOpacity>
              {__DEV__ ? (
                <TouchableOpacity style={styles.devButton} onPress={() => login('dev@hops.com', 'password')}>
                  <Text style={styles.devButtonText}>⚡ skip login (dev)</Text>
                </TouchableOpacity>
              ) : null}
            </>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6fbf7' },
  content: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  boxContainer: { alignItems: 'center', marginBottom: 32 },
  hops: { fontSize: 60, fontWeight: 'bold', textAlign: 'center', color: '#71bc78' },
  button: { borderRadius: 24, paddingVertical: 14, alignItems: 'center', marginTop: 20 },
  buttonOutline: { borderWidth: 2, borderColor: '#71bc78' },
  buttonOutlineText: { color: '#71bc78', fontSize: 16, fontWeight: '600' },
  buttonFilled: { backgroundColor: '#71bc78' },
  buttonFilledText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  devButton: { marginTop: 32, alignItems: 'center', paddingVertical: 8 },
  devButtonText: { color: '#aaa', fontSize: 13 },
});

export default Landing;
