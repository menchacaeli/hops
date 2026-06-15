import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { post } from '../lib/fetchRequests';

type Props = {
  setUser: (user: { email: string; password: string }) => void;
};

const CreateAccount = ({ setUser }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const onCreateAccount = () => {
    setErrors([]);
    if (!username || !email || !password) {
      setErrors(['Fields cannot be empty']);
      return;
    }
    if (password.length < 6) {
      setErrors(['Password must be 6 or more characters']);
      return;
    }
    const data = { name: username, email, password };
    post('/api/users/create', data)
      .then(response => {
        if (response.status === 'success') {
          setUser({ email, password });
        }
      })
      .catch(error => console.log({ error }));
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        secureTextEntry
      />
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#71bc78',
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    backgroundColor: '#ec4646',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  errorText: {
    color: '#fff',
    fontSize: 13,
  },
});

export default CreateAccount;
