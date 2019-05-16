import React from 'react';
import { Platform ,Dimensions} from 'react-native';
import { createStackNavigator, createBottomTabNavigator , createSwitchNavigator ,createDrawerNavigator,createAppContainer} from 'react-navigation';

import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import CameraScreen from '../screens/Camera';
//import SettingsScreen from '../screens/SettingsScreen';
import ApiScreen from '../screens/WebApi';
import AboutScreen from '../screens/About';


//const WIDTH = Dimensions.get('window').width;

/*
class Exporter extends Component {  
  render() {
    return <AppContainer />;
  }
}
export default Exporter;*/





/*
const HomeStack = createStackNavigator({
  Home: HomeScreen,  
},{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 });
*/
 /*
HomeStack.navigationOptions = { 
  tabBarLabel: 'AnaSayfa',  

  tabBarIcon:({tintColor}) => (
    <Icon name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
    color={tintColor} size={24}  />
  ),
};*/

/*
const AboutStack = createStackNavigator({
  About: AboutScreen,  
},{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 });

 AboutStack.navigationOptions = {
  
}



const CameraStack = createStackNavigator({
  Links: CameraScreen,
},{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 });
*/
 /*
CameraStack.navigationOptions = {
  tabBarLabel: 'Kamera',
  tabBarVisible:false,

  tabBarIcon:({tintColor}) => (
    <Icon name={Platform.OS === 'ios' ? 'ios-camera' : 'md-camera'}
    color={tintColor} size={24}  />
  ),
};*/

/*
const ApiStack = createStackNavigator({
  Settings: ApiScreen,
},{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 });
 */
/*
 ApiStack.navigationOptions = {
  tabBarLabel: 'Ceviri',
  tabBarIcon:({tintColor}) => (
    <Icon name={Platform.OS === 'ios' ? 'ios-document' : 'md-document'}
    color={tintColor} size={24}  />
  )
  
};*/

/*
export default createBottomTabNavigator({
  CameraStack,
  HomeStack,  
  ApiStack,
},{
  initialRouteName:'CameraStack',
  order:['HomeStack','CameraStack','ApiStack'],

tabBarOptions:{
showLabel:false,
activeTintColor:"#30A2B9",
inactiveTintColor:"#404040"

}
},

);*/



/*
const AppSwitchNavigator = createSwitchNavigator({
  HomeSwitch: { screen: HomeScreen },
  CameraSwitch: { screen: CameraScreen },
  ApiSwitch: { screen: ApiScreen }   
});

const AppContainer = createAppContainer(AppSwitchNavigator);*/
/*

const DrawerConfig = {
	drawerWidth: WIDTH*0.83,
	contentComponent: ({ navigation }) => {
		return(<MenuDrawer navigation={navigation} />)
	}
} 

const DrawerNavigator =  createDrawerNavigator(
	{
		AnaSayfa: {
			screen: HomeScreen
		},
		Kamera: {
			screen: CameraScreen
		},
		Ceviri: {
			screen: ApiScreen
		}
	},
	DrawerConfig
);
*/

const AppNavigator= createStackNavigator({
  Camera:{
    screen:CameraScreen,
    navigationOptions :{
      header: null,      
     }
  },
  Home: {
    screen:HomeScreen,
    navigationOptions :{
      header: null,      
     }
  },
  Api:{
    screen: ApiScreen,
    navigationOptions :{
      header: null,      
     }
  },
  About:{
    screen: AboutScreen,
    navigationOptions :{
      header: null,      
     }
  },

})


export default createAppContainer(AppNavigator);

