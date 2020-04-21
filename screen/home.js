import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,Image,FlatList,ActivityIndicator,} from 'react-native';
import {Card,FAB} from 'react-native-paper'

const Home = (props) => {
  
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(true)
  

  
  const fetchdata = () => {
    fetch("http://af462ae2.ngrok.io")
    .then(res => {
      //  console.log(res)
       return res.json()
      })
    .then(results =>{
        setData(results)
        setLoading(false)
      })
    .catch((err) => {
        console.log("catched in home.js",err)
      })
          
  }


  useEffect(() => {
      fetchdata()
   
  },[])
 
   
    const renderList = ((items) => {
      return(
        <Card style={styles.mycard} key = {items["_id"]} onPress={() =>{
          props.navigation.navigate("Profile",{items}) 

        }}>
           <View style={styles.cardview} key = {items["_id"]}>
            <Image
            style = {{width:60,height:60,borderRadius:30}}
            source = {{uri: items.url}}
            />            
            <View>
            <Text style={styles.text}> {items.Name} </Text>
            <Text style={{fontSize:15,marginLeft:10}}> {items.des} </Text>
            </View>
           </View>
          </Card>

      )
    })
    
   


    
    return(
        <View style={{flex:1}}>
          {loading?
          <ActivityIndicator size="large" color="#0000ff" />:
          <FlatList 
            data = {data}
            renderItem = {({item}) => {
              return renderList(item)
            }} 
            keyExtractor = {item => item._id}   
            onRefresh = {() => fetchdata()}     
            refreshing = {false}
          />
          }

          <FAB
            style={styles.fab}
            small={false}
            icon="plus"
            onPress={() => props.navigation.navigate("Add Employee")}
          />
  
        </View>
        
    )
}
const styles = StyleSheet.create({
  mycard:{
      margin:5,
      // padding:5
  },
  cardview:{
    flexDirection:"row",
    padding:5

  },
  text:{
    fontSize: 20,
    marginLeft : 10
  },
  fab: {
    position: 'absolute',
    margin: 16,
    backgroundColor:"#4c669f",
    right: 0,
    bottom: 0,
  },
  
})

export default Home