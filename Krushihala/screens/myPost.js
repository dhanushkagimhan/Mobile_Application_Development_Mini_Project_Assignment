import React from 'react';
import { Text, View, FlatList, StyleSheet, StatusBar, Alert, Button  } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';
import { Card, Paragraph } from 'react-native-paper';
import style from '../resources/style';

function myPost ({navigation }){  

  const [email, setEmail] = React.useState('')

  const [postArray, setpostArray] = React.useState('')

  const [loading, setloading] = React.useState(true)

  const readData = async () => {
    try {
      const userEmail = await AsyncStorage.getItem("email")
  
      setEmail(userEmail)
      console.log(userEmail)

      firestore()
          .collection('Post')
          .where('email','==',userEmail)
          .get()
          .then(querySnapshot  => {
              if(querySnapshot.size>0){
                let postArr = []
                querySnapshot.forEach(
                  element => {
                    postArr.push(element)
                  }
                )
                setpostArray(postArr);
                setloading(false)
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

  const deleteData = (item) => {
    item.ref.delete();
    Alert.alert("Deleted Successfully");
  };

  const renderItem = ({ item }) => (
    
    <Card style={style.card}>
    
        <Card.Title title={item.data().title}/>    
      
      <Card.Content>
        <Paragraph>
          Description: {item.data().description}
        </Paragraph>
        <Paragraph>
          Product: {item.data().product}
        </Paragraph>
        <Paragraph>
          Quantity: {item.data().quantity}
        </Paragraph>
        <Paragraph>
          Price: {item.data().price}
        </Paragraph>
        <Paragraph>
          Phone Number: {item.data().phoneNum}
        </Paragraph>
        <Paragraph>
          Address: {item.data().Address}
        </Paragraph>
        <View style={{marginTop:10}}>
          <Button title="Delete" color="red" onPress={() => deleteData(item)} />
        </View>
    </Card.Content>
    </Card>
  );
  

    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={style.heading1}>
          My posts
        </Text>

        <FlatList
          data={postArray}     
          renderItem={renderItem}
          keyExtractor={item => item.id}  
          onRefresh={() => readData()} 
          refreshing={loading}
        />
        
      </View>
    )  
}


export default myPost;