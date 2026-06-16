import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, View, ScrollView, TouchableOpacity, Text } from 'react-native';
import Login from '../login/Login';
import Account from '../account/CreateAccount';
import PrimaryButton from '../components/ui/PrimaryButton';
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
    <View className="flex-1 bg-amber-50 dark:bg-[#0C0A06]">
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 32 }}>
        <Animated.View style={{ opacity }} className="items-center mb-12">
          <Text className="text-5xl text-center mb-2">🌿</Text>
          <Text className="font-black text-7xl text-green-800 dark:text-green-400 text-center">
            Hops
          </Text>
          <Text className="text-stone-500 dark:text-amber-200 text-sm tracking-wide text-center mt-2">
            Discover craft beer & breweries
          </Text>
        </Animated.View>

        {showLogin ? <Login login={login} /> : null}
        {showAccount ? <Account createAccount={createAccount} /> : null}

        {!showLogin && !showAccount ? (
          <View>
            <PrimaryButton
              label="Create Account"
              onPress={() => setShowAccount(true)}
              variant="filled"
            />
            <View className="mt-3">
              <PrimaryButton
                label="Login"
                onPress={() => setShowLogin(true)}
                variant="outline"
              />
            </View>
            {__DEV__ ? (
              <TouchableOpacity
                className="mt-10 items-center py-2"
                onPress={() => login('dev@hops.com', 'password')}
              >
                <Text className="text-stone-400 dark:text-amber-200 text-xs">
                  ⚡ skip login (dev)
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default Landing;
