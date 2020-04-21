import React from 'react';
import { StyleSheet, Text, View,Image,Linking} from 'react-native';
import { Title,Card,Button } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons,Entypo } from '@expo/vector-icons'


const Profile = (props) => {

    const {_id,salary,Name,email,des,Phone,url} = props.route.params.items

    const deleteItem = () => {
        fetch("http://f0922c6e.ngrok.io/delete",{
            
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'                 
            },
            
            body: JSON.stringify({ 
                id : _id
            }) // body data type must match "Content-Type" header
          
        })
        props.navigation.navigate("Home")
    }
    return (
        <View style = {styles.root}> 
            <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style ={{
                height:"23%"
            }}
            />
            <View style ={{alignItems:"center"}}>
                <Image
                style = {{width:120,height:120,borderRadius:120/2,marginTop:-60}}
                source = {{uri:url}}
                />
                <Title> {Name} </Title>
                <Text style={{fontSize:15}}> {des} </Text>

            </View>
            <View>
                <Text></Text>
            </View>
            <View>
                <Text></Text>
            </View>            

            <Card style = {styles.myCard} onPress={() => {
                Linking.openURL(`mailto:${email}`)
            }}>
                <View style = {styles.Content}> 
                    <MaterialIcons name="email" size={32} color="#42243b" />
                    <Text style={{fontSize:16,marginTop:5,marginLeft:5}} > {email} </Text>
                </View>                
            </Card>

             <Card style = {styles.myCard} onPress={() => {
                 Linking.openURL(`tel:${Phone}`)
             }}>
                <View style = {styles.Content}> 
                    <Entypo name="phone" size={32} color="purple" />
                    <Text style={{fontSize:16,marginTop:5,marginLeft:5}} > {Phone} </Text>
                </View>               
            </Card>

             <Card style = {styles.myCard}>
                <View style = {styles.Content}> 
                    <MaterialIcons name="attach-money" size={32} color="green" />
                    <Text style={{fontSize:16,marginTop:5,marginLeft:5}} > {salary} </Text>
                </View>               
            </Card>
            <View>
                <Text></Text>
            </View>
            <View>
                <Text></Text>
            </View> 
            <View style ={styles.ButtonView}>
                
                <Button style = {styles.inputStyle} color = "#4c669f" icon="account-edit" mode="contained" onPress={() => {
                    props.navigation.navigate("Add Employee",{_id,salary,Name,email,des,Phone,url}) 

                    

                }
                }>
                    EDIT
                </Button>
                <Button style = {styles.inputStyle} color = "#4c669f" icon="delete" mode="contained" onPress={() => deleteItem()}>
                    FIRE EMPLOYEE
                </Button>

            </View>

        </View>
    )
 }

const styles = StyleSheet.create({
  root:{
      flex:1
  },
  myCard:{
      marginTop : 20,
      backgroundColor: "#fffcfc"
  },
  Content:{
      flexDirection:"row",
      marginTop : 8
  },
  ButtonView:{
      margin:13,
      padding:5,
      flexDirection:"row",
      justifyContent:"space-around"
  }
  //
})
export default Profile