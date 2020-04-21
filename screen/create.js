import React,{useState} from 'react';
import { StyleSheet, Text, View,Modal,Alert,KeyboardAvoidingView} from 'react-native';
import {TextInput,Button} from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';



const Create = (props) => {
  
    const update=(type)=>{
        if (props.route.params)
        {
            switch(type)
            {
                case "Name": return props.route.params.Name
                case "Phone": return props.route.params.Phone
                case "email": return props.route.params.email
                case "pos": return props.route.params.des
                case "salary": return props.route.params.salary
                case "pic": return props.route.params.url
            }

        }
        else{
            return ""
        }
            

    }
   

    const [Name,setName] = useState(update("Name"))
    const [Phone,setPhone] = useState(update("Phone"))
    const [email,setEmail] = useState(update("email"))
    const [salary,setSalary] = useState(update("salary"))
    const [pic,setPic] = useState(update("pic"))
    const [pos,setPos] = useState(update("pos"))
    const [modal,setModal] = useState(false)
    const [enableShift,setenableShift] = useState(false)

    const pickfromGallery =async () =>{
        const {granted} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if(granted)
        {
            const data = ImagePicker.launchImageLibraryAsync({
                mediaTypes :ImagePicker.MediaTypeOptions.Images,
                allowsEditing : true,
                aspect : [1,1],
                quality :0.5,
            })
        }
        else{
            Alert.alert("bhaaaag bhsddddk")
        
        }
    }
    const pickfromCamera =async () =>{
        const {granted} = await Permissions.askAsync(Permissions.CAMERA)
        if(granted)
        {
            const data = ImagePicker.launchCameraAsync({
                mediaTypes :ImagePicker.MediaTypeOptions.Images,
                allowsEditing : true,
                aspect : [1,1],
                quality :0.5,
            })
           
        }
        else{
            Alert.alert("bhaaaaagg bhsddddk")
        
        }
    }
    const submitData = () =>{
        fetch("http://af462ae2.ngrok.io/send-data",{
            
                method: 'POST', 
                headers: {
                  'Content-Type': 'application/json'                 
                },
                body: JSON.stringify({
                    Name,
                    Phone,
                    email,
                    pos,
                    url:pic,
                    salary,
                    

                }) // body data type must match "Content-Type" header
              
        })
        .then(res =>res.json())
        .then(data => {
            Alert.alert(`${data.Name} is saved`)
            props.navigation.navigate("Home")
        })
        .catch((err) => {
            console.log("catched in create.js")
        })
    }
    const updateData =() =>{
        fetch("http://af462ae2.ngrok.io/update",{
            
                method: 'POST', 
                headers: {
                  'Content-Type': 'application/json'                 
                },
                body: JSON.stringify({
                    id:props.route.params._id,
                    Name,
                    Phone,
                    email,
                    pos,
                    url:pic,
                    salary,
                    

                }) // body data type must match "Content-Type" header
              
        })
        .then(res =>res.json())
        .then(data => {
            Alert.alert(`${data.Name} is updated`)
            props.navigation.navigate("Home")
        })
        .catch((err) => {
            console.log("catched in create.js updateData()")
        })
    }

    

    return(
        <KeyboardAvoidingView behavior="position" style = {styles.root} enabled={enableShift}>

            <View>

             <TextInput
                label='Name'
                style = {styles.inputStyle}
                value={Name}
                onFocus = {() => setenableShift(false)}
                theme = {theme}
                mode = "outlined"
                onChangeText={text =>setName( text )}
                />
             <TextInput
                label='Position'
                style = {styles.inputStyle}
                value={pos}
                onFocus = {() => setenableShift(false)}
                theme = {theme}
                mode = "outlined"
                onChangeText={text => setPos( text )}
                />
             <TextInput
                label='Phone no'
                style = {styles.inputStyle}
                value={Phone}
                keyboardType = "number-pad"
                theme = {theme}
                onFocus = {() => setenableShift(false)}
                mode = "outlined"
                onChangeText={text => setPhone( text)}
                />
             <TextInput
                label='Email'
                style = {styles.inputStyle}
                value={email}
                onFocus = {() => setenableShift(true)}
                theme = {theme}
                mode = "outlined"
                onChangeText={text => setEmail( text)}
                />
             <TextInput
                label='Salary'
                style = {styles.inputStyle}
                value={salary}
                theme = {theme}
                onFocus = {() => setenableShift(true)}
                mode = "outlined"
                onChangeText={text => setSalary( text)}
                />
         
            <View>
                <Text> </Text>
            </View>
                <Button style = {styles.inputStyle} icon="upload" mode="contained" onPress={() => setModal(true)}>
                    Upload Image
                </Button>
                <Button style = {styles.inputStyle} icon="content-save" mode="contained" onPress={() => {
                    props.route.params ? updateData() : submitData()
                }}>
                    save
                </Button>

                <Modal 
                 animationType = {"slide"}  
                 transparent = {true} 
                 
                 visible = {modal}
                 onRequestClose = {() =>{ setModal(false)} }  >

                 <View style = {styles.setBottom}>
                    <View style = {styles.modalView}>         
                        <Button icon = "camera" color = "black" mode="contained" onPress={() => pickfromCamera()}>
                            Take Photo
                        </Button>
                        <Button icon = "camera" color = "black" mode="contained" onPress={() => pickfromGallery()}>
                            Gallery
                        </Button>
                    </View>
                    <Button color = "black" mode="outlined" onPress={() => setModal(false)}>
                            CANCEL
                    </Button>
                </View>
                
                </Modal>
            </View>
        </KeyboardAvoidingView>

    )

}
const theme = {
    colors:{
        primary:"black"
    }
}

const styles = StyleSheet.create({
    root:{
        flex:1
    },
    inputStyle:{
        margin : 10
    },
    setBottom:{
        position:"absolute",
        bottom :0,
        width : "100%"
    },
    modalView:{
        color:"red",
        margin:20,
        flexDirection:"row",
        padding : 0,
        justifyContent : "space-around",
        
    }

})
export default Create