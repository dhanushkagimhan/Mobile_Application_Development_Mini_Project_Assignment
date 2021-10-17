import React from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import firestore from '@react-native-firebase/firestore';
import style from '../resources/style';

function editProfile ({ navigation }){  

    const [name, setname] = React.useState('');
    const [city, setCity] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [phoneNum, setPhoneNum] = React.useState('');

    const [userDocId, setuserDocId] = React.useState('');

    const [email, setEmail] = React.useState('')

    const readData = async () => {
      try {
        const userEmail = await AsyncStorage.getItem("email")
    
        setEmail(userEmail)
        console.log(userEmail+"20")

        firestore()
          .collection('Users')
          .where("email", "==", userEmail)
          .get()
          .then(querySnapshot  => {
              if(querySnapshot.size>0){
                querySnapshot.forEach(
                  element => {
                    let user = element.data();
                    setuserDocId(element.id)
                    console.log(user+"h")
                    setname(user.name)
                    setCity(user.city)
                    setAddress(user.address)
                    setPhoneNum(user.phoneNumber)
                  }
                )
              }
              else{
                console.log("No user data")
              }
          })
       
      } catch (e) {
        console.log('Failed to fetch the data from storage')
      }
    }
  
    React.useEffect(() => {
      readData();
    }, []);

    function editUserDetails(name,city,address,phoneNum){
      return(
        //console.log("edited");
        firestore()
            .collection('Users')
            .doc(userDocId)
            .update({
                name: name,
                city: city,
                address: address,
                phoneNumber: phoneNum,          
            })
            .then(() => {
                console.log('User details updated!');
            })
      )
    }

    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={style.heading1}>
          Edit profile 
        </Text>

        <View style={style.ViewGroupRoot}>
          <View style={style.rowContainer}>
            <Text>Name:</Text>
            <TextInput
              placeholder="Name"
              value={name}
              onChangeText={setname}
            />
          </View>

          <View style={style.rowContainer}>
            <Text>City:</Text>
            <TextInput
              placeholder="City"
              value={city}
              onChangeText={setCity}
            />
          </View>
          
          <View style={style.rowContainer}>
            <Text>Address:</Text>
            <TextInput
              placeholder="Address"
              value={address}
              onChangeText={setAddress}
            />
          </View>
          
          <View style={style.rowContainer}>  
            <Text>Phone:</Text>
            <TextInput
              placeholder="Phone number"
              value={phoneNum}
              onChangeText={setPhoneNum}
            />
          </View>
        </View>

        <View style={style.normButton}>
          <Button title="Edit Profile" onPress={() => editUserDetails(name,city,address,phoneNum)} />
        </View>
        
      </View>
    )   
}

export default editProfile;