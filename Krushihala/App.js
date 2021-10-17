// In App.js in a new project

import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import userHomeScreen from './screens/userHomeScreen';
import afterSignupFillDetails from './screens/afterSignupDetailFillScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import addPost from './screens/addPost';
import editProfile from './screens/editProfile';
import myPost from './screens/myPost';
import style from './resources/style';



function kMainScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{margin:20, fontSize:30, color:"green"}}>Krushihala</Text>
      <Text style={{margin:20, textAlign:'center', fontSize:16}}>You can buy and sell your agricultural products with this app</Text>
      
      <View style={style.normButton}>
        <Button
          title="Login"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
      
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  //const [user, setUser] = React.useState('');

  global.isLogin = 0;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        

        {global.isLogin == 1 ? (
            <>
              <Stack.Screen name="Home" component={userHomeScreen} />
              
            </>
          ) : (
            <>
              <Stack.Screen name="Krushihala" component={kMainScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Sign up" component={SignupScreen} />

              <Stack.Screen name="afterSignupFilldetails" component={afterSignupFillDetails} options={{ title: 'Fill your details' }} />

              <Stack.Screen name="UHome" component={userHome} />
              
              
            </>
          )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator();

function userHome(){
  return(
    
      <Tab.Navigator>
        
        <Tab.Screen name="Home" component={userHomeScreen} />
        <Tab.Screen name="Add Post" component={addPost} />
        <Tab.Screen name="My Posts" component={myPost} />
        <Tab.Screen name="Edit Profile" component={editProfile} />
      </Tab.Navigator>
    
  )
}

export default App;