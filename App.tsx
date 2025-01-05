import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import remoteConfig from '@react-native-firebase/remote-config';

const App = () => {
  const [welcomeMessage, setWelcomeMessage] = useState('Loading...');

  useEffect(() => {
    const fetchConfig = async () => {
      await remoteConfig().setConfigSettings({
        minimumFetchIntervalMillis: 3600000,
      });

      await remoteConfig().fetchAndActivate();

      const message = remoteConfig()?.getValue('welcome_message').asString();
      setWelcomeMessage(message);
    };

    fetchConfig();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Firebase Remote Config</Text>
      <Text style={styles.message}>{welcomeMessage}</Text>

      <Button
        title="Fetch New Config"
        onPress={() => {
          remoteConfig()
            .fetchAndActivate()
            .then(() => {
              const message = remoteConfig()
                .getValue('welcome_message')
                .asString();
              setWelcomeMessage(message);
            });
        }}
        color="#007AFF"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  message: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
});

export default App;
