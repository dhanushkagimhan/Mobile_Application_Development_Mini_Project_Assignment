import React from 'react';
import { Text, View, Button, TextInput, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import style from '../resources/style';

function LoginScreen ({ navigation }){  

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  async function setEmailAS(email){
    try {
      await AsyncStorage.setItem(
        'email',email
      );
      console.log("save email")
    } catch (error) {
      console.log("not save")
    }
  }

  function loginUser(email, password){

      
        if(email == '' || password==''){
          Alert.alert("Fill the login credentials")
        }
        else{
          auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            console.log('signed in!');

            setEmailAS(email)         

            navigation.navigate("UHome");
          })
          .catch(() => {
            Alert.alert("Invalid credential!");
          })
        }
      
    }

    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={style.heading1}>
          Login
        </Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <View style={style.normButton}>
          <Button title="Login" onPress={() => loginUser(email,password)} />
        </View>

        <View style={style.normButton}>
          <Button
            title="Sign up"
            onPress={() => navigation.navigate('Sign up')}
          />
        </View>
      </View>
    )  
}

export default LoginScreen;