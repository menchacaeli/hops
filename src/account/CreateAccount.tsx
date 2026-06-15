// src/account/CreateAccount.tsx
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import type { AuthResult } from '../data';

type Props = {
  createAccount: (email: string, password: string, displayName?: string) => Promise<AuthResult>;
};

const CreateAccount = ({ createAccount }: Props) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const onCreateAccount = async () => {
    setErrors([]);
    if (!username || !email || !password) { setErrors(['Fields cannot be empty']); return; }
    if (password.length < 6) { setErrors(['Password must be 6 or more characters']); return; }
    const result = await createAccount(email.toLowerCase(), password, username);
    if (result.status === 'fail') setErrors([result.error]);
  };

  return (
    <View>
      <TextInput style={styles.input} placeholder="Username" onChangeText={setUsername} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" onChangeText={setPassword} secureTextEntry />
      {errors.map((e, i) => (
        <View key={i} style={styles.errorContainer}>
          <Text style={styles.errorText}>{e}</Text>
        </View>
      ))}
      <TouchableOpacity style={styles.button} onPress={onCreateAccount}>
        <Text style={styles.buttonText}>create account</Text>
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

export default CreateAccount;
