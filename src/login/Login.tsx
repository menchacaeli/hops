// src/login/Login.tsx
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import type { AuthResult } from '../data';

type Props = {
  login: (email: string, password: string) => Promise<AuthResult>;
};

const Login = ({ login }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onLogin = async () => {
    setError('');
    if (!email || !password) { setError('Email and password are required'); return; }
    const result = await login(email.toLowerCase(), password);
    if (result.status === 'fail') setError(result.error);
  };

  return (
    <View>
      <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" onChangeText={setPassword} secureTextEntry />
      {error ? <View style={styles.errorContainer}><Text style={styles.errorText}>{error}</Text></View> : null}
      <TouchableOpacity style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}>login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 15, backgroundColor: '#fff' },
  button: { backgroundColor: '#71bc78', borderRadius: 24, paddingVertical: 14, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  errorContainer: { backgroundColor: '#ec4646', borderRadius: 4, padding: 8, marginBottom: 8 },
  errorText: { color: '#fff', fontSize: 13 },
});

export default Login;
