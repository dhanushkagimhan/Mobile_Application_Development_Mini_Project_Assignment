import React from 'react';
import { Text, View, FlatList, StyleSheet, StatusBar, Button  } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';
import { Card, Paragraph } from 'react-native-paper';
import styles from '../resources/style'

function userHomeScreen ({navigation }){  

  const [email, setEmail] = React.useState('')

  const [postArray, setpostArray] = React.useState('')

  const [loading, setloading] = React.useState(true)

  const readData = async () => {
    try {
      const userEmail = await AsyncStorage.getItem("email")
  
      setEmail(userEmail)
      console.log(userEmail)
     
    } catch (e) {
      console.log('Failed to fetch the data from storage')
    }

    firestore()
          .collection('Post')
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
  }

  React.useEffect(() => {
    readData();
  }, []);

  const renderItem = ({ item }) => (
    
    <Card style={styles.card}>
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
    </Card.Content>
    </Card>
  );
  

    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{alignSelf: 'flex-end', margin:10}}>
          <Button title="Log out" color="tomato" onPress={() => navigation.navigate("Krushihala")} />
        </View>
        <Text style={styles.heading1}>
          Home page
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

export default userHomeScreen;