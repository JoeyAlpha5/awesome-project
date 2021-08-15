import 'react-native-gesture-handler';
import React,{useState,useEffect} from 'react';
import SignIn from './Screens/SignIn';
import SignUp from './Screens/SignUp';
import Home from './Screens/signedIn/Home';
import Profile from './Screens/signedIn/Profile';
import Notifications from './Screens/signedIn/Notifications';
import Apparel from './Screens/signedIn/Apparel';
import Player from './Screens/signedIn/Player';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {firebase} from './Firebase/firebase';

const App: () => Node = () => {
  const [isSignedIn,setIsSignedIn]=useState(true);
  const Stack = createStackNavigator();
  const HomeStack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const HomeStackScreens = ({navigation})=>{
    return(
      <HomeStack.Navigator>
        <HomeStack.Screen name="Feed" component={Home} options={{headerShown:false}}/>
        <HomeStack.Screen name="Player" component={Player} options={{headerShown:false}}/>
      </HomeStack.Navigator>
    )
  }

  useEffect(()=>{
    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        setIsSignedIn(true);
      }else{
        setIsSignedIn(false);
      }
    })
  },[])

    if(isSignedIn == true){
      return(
        <NavigationContainer>
          <Tab.Navigator
              screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
    
                if (route.name === 'Home') {
                  iconName = focused
                    ? 'ios-home'
                    : 'ios-home-outline';
                } else if (route.name === 'Apparel') {
                  iconName = focused ? 'shirt' : 'shirt-outline';
                }
                else if(route.name === 'Notifications'){
                  iconName = focused ? 'ios-notifications' : 'ios-notifications-outline';
                }else{
                  iconName = focused ? 'ios-person' : 'ios-person-outline';
                }
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}

            tabBarOptions={{
              activeTintColor: '#2FBBF0',
              inactiveTintColor: '#7A8FA6',
            }}
          >
            <Tab.Screen name="Home" component={HomeStackScreens} />
            <Tab.Screen name="Apparel" component={Apparel} />
            <Tab.Screen name="Notifications" component={Notifications} />
            <Tab.Screen name="Profile" component={Profile} />
          </Tab.Navigator>
        </NavigationContainer>
      )
    }else{
      return(
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="signIn" component={SignIn} options={{headerShown:false}} />
            <Stack.Screen name="signUp" component={SignUp} options={{headerShown:false}}/>
          </Stack.Navigator>
        </NavigationContainer>
      )
    }
};


export default App;
