import React, {useState} from 'react';
import { Text, StyleSheet,View, Image,TextInput, TouchableOpacity, ScrollView } from "react-native";
import BackIcon from 'react-native-vector-icons/Feather';
import {firebase} from '../Firebase/firebase';
import FormError from '../Components/FormError';
import FormSuccess from '../Components/FormSuccess';
const SignUp = ({navigation})=>{
    const [fullName,setFullName] = useState('');
    const [email,setEmail] = useState('');
    const [errMessage,setErrorMessage]=useState('');
    const [successMessage,setSuccessMessage] = useState('');
    const [isLoading,setIsLoading] = useState(false);
    const [mobile,setMobile] = useState();
    const [password,setPassword] = useState();
    const [confirmPassword,setConfirmPassword] = useState();
    const [displayFormErr,setDisplayFormErr] = useState(false);

    function fullNameChange(value){
        setFullName(value);
    }

    function navigate(){
        navigation.navigate('signIn');
    }

    function createUser (){
        setIsLoading(true);
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(()=>{
            setIsLoading(false);
            setSuccessMessage("Your account has been created"); 
        })
        .catch((err)=>{
            setIsLoading(false);
            setErrorMessage(err.message);
            setDisplayFormErr(true); 
        })
        
    }

    const validatForm =()=>{
        var form_inputs = [fullName,email,mobile,password,confirmPassword];
        var passwords_match = password == confirmPassword;

        if(form_inputs.includes('') || form_inputs.includes(undefined)){
            setErrorMessage("Please fill in all fields");
            return setDisplayFormErr(true); 
        } 

        if(!passwords_match){
            setErrorMessage("Passwords do not match");
            return  setDisplayFormErr(true);
        } 

        if(passwords_match) return createUser();
    }
    
    return(
      <View style={styles.mainView}>
          <View style={styles.TopView}>
              <Image style={styles.ImageStyle} source={require('../assets/images/transparentLogo.png')}/>
          </View>

            <ScrollView style={styles.BottomView}>
                <BackIcon onPress={navigate} style={styles.Icon} name="chevron-left" size={60} color={"#fff"}/>
                <Text style={styles.Heading}>
                    Create{'\n'}
                    account
                </Text>
                <View style={styles.FormView}>
                    <TextInput onChangeText={fullNameChange} value={fullName} placeholder={"Full name*"} placeholderTextColor={"#fff"} style={styles.TextInput}/>
                    <TextInput onChangeText={(val)=>setEmail(val)} placeholder={"Email address*"} value={email} placeholderTextColor={"#fff"} style={styles.TextInput}/>
                    <TextInput onChangeText={(val)=>setMobile(val)} placeholder={"Mobile*"} value={mobile} placeholderTextColor={"#fff"} style={styles.TextInput}/>
                    <TextInput onChangeText={(val)=>setPassword(val)} placeholder={"Password*"} value={password} secureTextEntry={true} placeholderTextColor={"#fff"} style={styles.TextInput}/>
                    <TextInput onChangeText={(val)=>setConfirmPassword(val)} placeholder={"Confirm Password*"} value={confirmPassword} secureTextEntry={true} placeholderTextColor={"#fff"} style={styles.TextInput}/>
                    <TouchableOpacity onPress={validatForm} style={styles.Button}>
                        <Text style={styles.ButtonText}>Sign up</Text>
                    </TouchableOpacity>
                </View>
  
            </ScrollView>
            {displayFormErr  == true?
                <FormError  hideErrOverlay={setDisplayFormErr} err={errMessage}/>
                :
                null
            }

            {isLoading == true?
                <FormSuccess/>
                :
                successMessage=="Your account has been created"?
                    <FormSuccess successMessage={successMessage} close={setSuccessMessage}/>
                :
                null
            }

        </View>
    )
}

const styles = StyleSheet.create({
  mainView:{
    marginTop:40,
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
  },
  TopView:{
      width:'100%',
      height:'20%',
      display:'flex',
      justifyContent:'center',
      alignItems:'center'
  },
  BottomView:{
      width:'100%',
      height:'80%',
      backgroundColor:'#000',
      borderTopLeftRadius:30,
      borderTopRightRadius:30
  },
  ImageStyle:{
      width:'50%',
      resizeMode:'contain'
  },
  Heading:{
      color:'#fff',
      fontSize:40,
      fontWeight:'bold',
      marginLeft:30,
      marginTop:5
  },
  FormView:{
      width:'100%',
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      marginTop:10
  },
  TextInput:{
      width:'90%',
      borderWidth:1,
      borderColor:'#fff',
      height:52,
      borderRadius:10,
      paddingLeft:5,
      marginTop:20,
      color:'#fff'
  },
  Button:{
      width:'90%',
      color:'#000',
      height:52,
      backgroundColor:'#fff',
      borderRadius:10,
      marginTop:20,
      display:'flex',
      justifyContent:'center',
      alignItems:'center'
  },
  ButtonText:{
      fontWeight:'bold',
      fontSize:18
  },
  SignUpText:{
      color:'gray',
  },
  TextButton:{
      width:'100%',
      display:'flex',
      alignItems:'center',
      marginTop:20
  },
  Icon:{
      marginLeft:5,
      marginTop:10
  }


})
export default SignUp