import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { Card, PrimaryButton, Screen } from '../../components/ui';
import { getCurrentUser, syncIngestionToFirestore } from '../../data';
import { USE_MOCK } from '../../data/config';
import { tabContentInset } from '../../styles/layout';

export default function Profile() {
  const user = getCurrentUser();
  const [isSyncing, setIsSyncing] = useState(false);

  const runIngestionSync = async () => {
    setIsSyncing(true);
    console.log('[profile] ingestion button tapped');
    try {
      const summary = await syncIngestionToFirestore();
      console.log('[profile] ingestion success', summary);
      Alert.alert(
        'Ingestion Complete',
        `Upserted ${summary.breweriesUpserted} breweries and ${summary.beersUpserted} beers.`,
      );
    } catch (error) {
      console.error('[profile] ingestion failed', error);
      const message = error instanceof Error ? error.message : 'Unknown ingestion error';
      Alert.alert(
        'Ingestion Failed',
        `Details:\n${message}\n\nChecklist:\n1) EXPO_PUBLIC_USE_MOCK=false\n2) Firestore rules were published\n3) Device has internet access`,
      );
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <Screen>
      <View style={tabContentInset}>
        <Card>
          <Text className="text-xl font-semibold text-atelier-text dark:text-atelier-text-inverse mb-1">Profile</Text>
          <Text className="text-atelier-text-muted dark:text-atelier-text-muted-dark mb-4">
            Account details for the currently signed in user.
          </Text>

          <Text className="text-xs uppercase tracking-widest text-atelier-text-muted dark:text-atelier-text-muted-dark mb-1">Display Name</Text>
          <Text className="text-base text-atelier-text dark:text-atelier-text-inverse mb-3">
            {user?.displayName?.trim() ? user.displayName : 'Not set'}
          </Text>

          <Text className="text-xs uppercase tracking-widest text-atelier-text-muted dark:text-atelier-text-muted-dark mb-1">Email</Text>
          <Text className="text-base text-atelier-text dark:text-atelier-text-inverse mb-3">
            {user?.email ?? 'Unknown'}
          </Text>

          <Text className="text-xs uppercase tracking-widest text-atelier-text-muted dark:text-atelier-text-muted-dark mb-1">User ID</Text>
          <Text className="text-base text-atelier-text dark:text-atelier-text-inverse">{user?.uid ?? 'Unknown'}</Text>

          <Text className="text-xs uppercase tracking-widest text-atelier-text-muted dark:text-atelier-text-muted-dark mt-4 mb-1">Data Mode</Text>
          <Text className="text-base text-atelier-text dark:text-atelier-text-inverse mb-1">
            {USE_MOCK ? 'Mock (set EXPO_PUBLIC_USE_MOCK=false for Firebase)' : 'Firebase'}
          </Text>

          <View className="mt-5">
            <PrimaryButton
              label={isSyncing ? 'Running Ingestion...' : 'Run Ingestion Sync'}
              onPress={runIngestionSync}
              disabled={isSyncing}
            />
          </View>
        </Card>
      </View>
    </Screen>
  );
}