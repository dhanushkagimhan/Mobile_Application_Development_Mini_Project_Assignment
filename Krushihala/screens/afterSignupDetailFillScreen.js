import React from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage'
import style from '../resources/style';

function afterSignupFillDetails ({ navigation }){  
    const [name, setname] = React.useState('');
    const [city, setCity] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [phoneNum, setPhoneNum] = React.useState('');

    const [email, setEmail] = React.useState('')

    const readData = async () => {
      try {
        const userEmail = await AsyncStorage.getItem("email")
    
        setEmail(userEmail)
        console.log(userEmail)
       
      } catch (e) {
        console.log('Failed to fetch the data from storage')
      }
    }
  
    React.useEffect(() => {
      readData();
    }, []);

    function fillUserDetails(uname,ucity,uaddress,uphoneNum){
        return(
            firestore()
            .collection('Users')
            .add({
                email: email,
                name: uname,
                city: ucity,
                address: uaddress,
                phoneNumber: uphoneNum,          
            })
            .then(() => {
                console.log('User added!');
                navigation.navigate("UHome");
            })
        )
    }

    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={style.heading1}>
          Fill you details
        </Text>

        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setname}
        />
        <TextInput
          placeholder="City"
          value={city}
          onChangeText={setCity}
        />
        <TextInput
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          placeholder="Phone number"
          value={phoneNum}
          onChangeText={setPhoneNum}
        />

        <View style={style.normButton}>
          <Button title="Finish" onPress={() => fillUserDetails(name,city,address,phoneNum)} />
        </View>
        
      </View>
    )  
}

export default afterSignupFillDetails;