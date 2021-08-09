import React from 'react';
import {Text,TouchableOpacity,View,StyleSheet} from 'react-native';
import {firebase} from '../../Firebase/firebase';
const Profile=()=>{
    const signOut = ()=>{
        firebase.auth().signOut();
    }

    return(
       <View style={styles.mainView}>
            <TouchableOpacity onPress={signOut} style={styles.Button}>
                <Text style={styles.ButtonText}>Sign out</Text>
            </TouchableOpacity>
       </View>
    )
}
export default Profile
const styles = StyleSheet.create({
    mainView:{
        marginTop:40,
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
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
})