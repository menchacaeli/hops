import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import PrimaryButton from '../components/ui/PrimaryButton';
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
      <TextInput
        className="border border-amber-200 dark:border-[#2E2010] rounded-xl p-3 mb-3 text-base text-stone-900 dark:text-amber-50 bg-white dark:bg-[#1A140A]"
        placeholder="Username"
        placeholderTextColor="#78716C"
        onChangeText={setUsername}
        autoCapitalize="none"
      />
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
      {errors.map((e, i) => (
        <View key={i} className="bg-red-50 dark:bg-red-900/30 rounded-lg px-3 py-2 mb-2">
          <Text className="text-red-600 dark:text-red-400 text-sm">{e}</Text>
        </View>
      ))}
      <PrimaryButton label="Create Account" onPress={onCreateAccount} variant="filled" />
    </View>
  );
};

export default CreateAccount;
