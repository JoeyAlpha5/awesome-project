import React, {useState,useEffect,createRef} from 'react';
import {Text,View, FlatList, StyleSheet,TouchableOpacity,TextInput,ActivityIndicator,Image} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { useScrollToTop } from '@react-navigation/native';
const Home=({navigation})=>{
    const [searchInput,setSearchInput] = useState('');
    const [feed,setFeed] = useState([]);
    const ref = React.useRef(null);
    useScrollToTop(ref);
    // get our feed
    useEffect(() => {
        fetch('https://aurora-django-app.herokuapp.com/feed?feed_count=0')
        .then((re)=>re.json())
        .then((re)=>{
            setFeed(re.response);
        })
    }, []);

    return(
        <View style={styles.mainView}>
            <Text style={styles.Heading}>Colors Show</Text>
            <View style={styles.TextInputView}>
                <TextInput value={searchInput}  onChangeText={(val)=>setSearchInput(val)}placeholder={"Enter song title or artist name"} placeholderTextColor={"#000"} style={styles.TextInput}/>
            </View>


            <View style={styles.mainPostView}>
                {feed.length < 1?
                    <ActivityIndicator size={"large"} color={"#2FBBF0"}/>
                    :
                    <FlatList
                        ref={ref}
                        data={feed}
                        keyExtractor={(item,index)=>{return item.post_id.toFixed()}}
                        renderItem={({item,index})=>(
                            <View style={styles.postView}>
                                    <View style={styles.postTitle}>
                                        <View style={styles.imageView}>
                                            <Image style={styles.artistPhoto} source={{uri:item.artist_photo}}/>
                                            <View style={styles.titleView}>
                                                <Text style={styles.artist_name}>{item.post_artist}</Text>
                                                <Text style={styles.post_title}>{item.post_title}</Text>
                                            </View>
                                        </View> 
                                        <View>
                                            <Icon name="options-vertical" color="#989898"/>
                                        </View>
                                    </View>
                                    
                                    <TouchableOpacity style={styles.coverButton} onPress={()=>navigation.navigate('Player',{data:item})}>
                                        <Image style={styles.coverPhoto} source={{uri:item.cover_poto}}/>
                                    </TouchableOpacity>

                            </View>
                        )}
                    />
                }

            </View>
        </View>
    )
}
export default Home
const styles = StyleSheet.create({
    artist_name:{
        fontSize:16,
        fontWeight:'bold'
    },
    post_title:{
        fontSize:11,
        color:'#989898'
    },
    mainView:{
        flex:1,
    },
    titleView:{
        marginLeft:15,
    },  
    Heading:{
        fontSize:32,
        marginTop:60,
        marginLeft:15,
        fontWeight:'bold',
    },
    TextInput:{
        height:39,
        width:'90%',
        backgroundColor:'#EBEBEB',
        borderRadius:20,
        paddingLeft:15,
        marginTop:20,
        marginBottom:20,
    },
    TextInputView:{
        display:'flex',
        alignItems:'center',
    },
    mainPostView:{
        width:'100%',
        marginBottom:200
    },
    postTitle:{
        width:'90%',
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center'
    },
    postView:{
        width:'100%',
        alignItems:'center',
        marginTop:40,
    },
    artistPhoto:{
        backgroundColor:'rgba(0,0,0,0.06)',
        width:50,
        height:50,
        borderRadius:50,
    },
    imageView:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    },
    coverPhoto:{
        width:'100%',
        height:'100%',
        borderRadius:10,

    },
    coverButton:{
        width:'90%',
        height:200,
        backgroundColor:'rgba(0,0,0,0.06)',
        marginTop:20,
    }
    
})
