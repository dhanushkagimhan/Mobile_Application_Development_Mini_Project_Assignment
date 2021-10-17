import React from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';
import style from '../resources/style';

function addPost ({ navigation }){ 
  
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [product, setProduct] = React.useState('');
  const [quantity, setQuantity] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [Address, setAddress] = React.useState('');
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

  function addPost(title,description,product,quantity,price,Address,phoneNum){
    return(
      
      firestore()
            .collection('Post')
            .add({
                email: email,
                title: title,
                description: description,
                product: product,
                quantity: quantity, 
                price: price,
                Address: Address,
                phoneNum: phoneNum,
            })
            .then(() => {
                console.log('Add post!');
                setTitle("")
                setDescription("")
                setProduct("")
                setQuantity("")
                setPrice("")
                setAddress("")
                setPhoneNum("")
            })
    )
  }

    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={style.heading1}>
          Add new post
        </Text>

        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          placeholder="Product"
          value={product}
          onChangeText={setProduct}
        />
        <TextInput
          placeholder="Quantity"
          value={quantity}
          onChangeText={setQuantity}
        />
        <TextInput
          placeholder="Price"
          value={price}
          onChangeText={setPrice}
        />
        <TextInput
          placeholder="Address"
          value={Address}
          onChangeText={setAddress}
        />
        <TextInput
          placeholder="Phone number"
          value={phoneNum}
          onChangeText={setPhoneNum}
        />

        <View style={style.normButton}>
          <Button title="Add post" onPress={() => addPost(title,description,product,quantity,price,Address,phoneNum)} />
        </View>
        
      </View>
    )  
}

export default addPost;