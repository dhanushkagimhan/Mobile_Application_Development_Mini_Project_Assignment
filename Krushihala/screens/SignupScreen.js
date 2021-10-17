import React from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage'
import style from '../resources/style';

function SignupScreen({ navigation }) {
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

    function createUser(email, password){
      if(email == '' || password==''){
        Alert.alert("Fill the signup details")
      }
      else{
        auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created!');
          Alert.alert("User account created!");
          setEmailAS(email);
          navigation.navigate("afterSignupFilldetails")
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            Alert.alert("That email address is already in use!");
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            Alert.alert('That email address is invalid!');
          }

          console.error(error);
        })
      }
    }

    return(
      <View style={style.centerView1}>
        <Text style={style.heading1}>
          Sign up
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
          <Button title="Sign Up" onPress={() => createUser(email,password)} />
        </View>

        <View style={style.normButton}>
          <Button
            title="Login"
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </View>
    );
}

export default SignupScreen;