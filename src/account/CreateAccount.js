import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Form, Item, Input, Button, Text, Icon, View} from 'native-base';
import {post} from '../../helpers/fetchRequests';
const CreateAccount = ({setUser}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setError] = useState([]);
  const [isSubmitted, setSubmitted] = useState(false);
  const onCreateAccount = () => {
    setSubmitted(true);
    setError([]);
    if (username && email && password) {
      const isValidPassword = validatePassword(password, setError);
      if (!isValidPassword) {
        setError([...errors, 'Password must be 6 or more character']);
      }
      const data = {
        name: username,
        email,
        password,
      };
      const endpoint = '/api/users/create';
      post(endpoint, data)
        .then(response => {
          if (response.status && response.status === 'success') {
            let message = response.data && response.data.message;
            if (message) {
              setUser(data);
            }
          }
        })
        .catch(error => {
          console.log({error});
        });
    } else {
      setError([...errors, 'Fields cannot be empty']);
    }
  };

  return (
    <Form>
      <Item>
        <Input
          onChangeText={uName => setUsername(uName)}
          placeholder="Username"
          autoCompleteType="username"
        />
      </Item>
      <Item>
        <Input
          onChangeText={email => setEmail(email)}
          placeholder="Email"
          autoCompleteType="email"
        />
      </Item>
      <Item last>
        <Input
          onChangeText={password => setPassword(password)}
          placeholder="Password"
          autoCompleteType="password"
        />
      </Item>
      {errors &&
        errors.length > 0 &&
        errors.map((e, i) => {
          return (
            <View key={e + i} style={styles.error_container}>
              <Text style={styles.error_text}> {e}</Text>
            </View>
          );
        })}
      <Button
        rounded
        block
        success
        style={styles.button}
        // disabled={isSubmitted}
        onPress={() => onCreateAccount()}>
        <Text>create account</Text>
      </Button>
    </Form>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
  },
  error_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ec4646',
    color: 'white',
    marginTop: 20,
    padding: 5,
    elevation: 2,
  },
  error_icon: {
    color: 'white',
    padding: 2,
  },
  error_text: {
    color: 'white',
  },
});

const validatePassword = (password, setError) => {
  return password.length >= 6;
};

export default CreateAccount;
