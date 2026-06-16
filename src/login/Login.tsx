import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import PrimaryButton from '../components/ui/PrimaryButton';
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
      <TextInput
        className="border border-amber-200 dark:border-[#2E2010] rounded-xl p-3 mb-3 text-base text-stone-900 dark:text-amber-50 bg-white dark:bg-[#1A140A]"
        placeholder="Email"
        placeholderTextColor="#78716C"
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        className="border border-amber-200 dark:border-[#2E2010] rounded-xl p-3 mb-3 text-base text-stone-900 dark:text-amber-50 bg-white dark:bg-[#1A140A]"
        placeholder="Password"
        placeholderTextColor="#78716C"
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? (
        <View className="bg-red-50 dark:bg-red-900/30 rounded-lg px-3 py-2 mb-3">
          <Text className="text-red-600 dark:text-red-400 text-sm">{error}</Text>
        </View>
      ) : null}
      <PrimaryButton label="Login" onPress={onLogin} variant="filled" />
    </View>
  );
};

export default Login;
