
import * as Font from 'expo-font'
import React, { Component } from 'react';
import {  Image ,View,  StyleSheet ,Platform, TouchableOpacity,Dimensions,AsyncStorage,ActivityIndicator,Modal,} from 'react-native';
import {ImagePicker,ImageManipulator ,Asset, FileSystem,} from 'expo';
import { Button, Text ,Header} from 'native-base';
import base64 from 'base-64'
import Icon from 'react-native-vector-icons/Ionicons';
import Cameram from './Camera'
import { ScrollView } from 'react-native-gesture-handler';
import {ImageViewer} from 'react-native-image-zoom-viewer';
import AutoHeightImage from 'react-native-auto-height-image';


const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 24 });


export default class HomePage extends Component  {

  constructor(props){
    super(props);


    
    this.state = {
      imageUri: null,
      data:null,
      file:null,  
      takenPhoto_data:null, 
      takenPhoto_uri:this.props.navigation.state.params.takenphoto_uri,
      //takenPhoto_exif:this.props.navigation.state.params.takenphoto_exif,
      translated:null,   
      fontLoaded:false,
      permanentData:null,
      modalVisible:false,
       
    };
    
  }
/*
  componentDidMount() {
    AsyncStorage.getItem("myKey").then((value) => {
        this.setState({"myKey": value});
    }).done();
  }
  
*/

    async componentDidMount(){
      await Font.loadAsync({          
          'Roboto_medium':require('../assets/fonts/Roboto_medium.ttf'),          
        });
        this.setState({fontLoaded:true});
        AsyncStorage.getItem("myCount").then((value) => { value == null ? this.setState({permanentData: 1}) :
          this.setState({permanentData: value});
          
      }).done();
      
    }


    

  render() {
    
    

    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    }
    
    
          
    return (


     
      <View style={styles.container}>  
          
        <Header style={styles.navbar}>
        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('About')}>
            <Icon name={Platform.OS === 'ios' ? 'ios-information-circle' : 'md-information-circle'} size={25} color="white" />
        </TouchableOpacity>
          
          <TouchableOpacity style={styles.navbarImage}>
            <Image source={require('../assets/images/forHeader1.png')} style={{width: 130, height: 40}}/>
            </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Camera')}>
            <Icon name={Platform.OS === 'ios' ? 'ios-camera' : 'md-camera'} size={25} color="white" />
          </TouchableOpacity>
        </Header>   
        <ScrollView>
        {this.state.fontLoaded ?(
        <View style={styles.content}>
          <View style={{paddingHorizontal:'5%'}}>
          {this.state.takenPhoto_uri != null && this.withUri()}  
          </View>

          

          <View style={styles.button}>         
          <Button info rounded large
            onPress={this._pickImage} >                        
          <Text>Resim Seç</Text></Button>
          </View>
          
          
          
          <Text>{this.state.myKey}</Text>
          
        </View>):
          (<ActivityIndicator size="large"/>)}
          {this.forPreview()}
          </ScrollView>
         
      </View>
      
      
    );
    
  }
  
  /*
  saveData=(value) =>{
    AsyncStorage.setItem("myKey", value);
    this.setState({"myKey": value});
}*/








  withUri  = () =>{

    
      return(<View style={{alignItems:'center', padding:'3%'}}>
              
        
        <TouchableOpacity onPress={() => this.setState({modalVisible:true})}>          
          <AutoHeightImage style={{transform: [{ rotate: '0deg' }]}}
                width={300}
                source={{uri:this.state.takenPhoto_uri} }
                resizeMode="contain"
                
                />
        </TouchableOpacity>
          
          {this.state.translated ==null ?
          <View style={{ padding:'3%'}}>
          <Button success        
            onPress={() => this.uploadPhoto()}>        
          <Text>Ara</Text></Button></View>:
          <Text>{this.state.translated}</Text>}
      
      </View>)};

  gotoAbout = () =>{  
    this.props.navigation.navigate('About');
  }

   forPreview = () => {

    const images = [ { url:this.state.takenPhoto_uri} ];
      return(
        <View style={styles.previewer}>
            <Modal
              visible={this.state.modalVisible}
              transparent={true}
              onRequestClose={() => this.setState({ modalVisible: false })}
              >
              <ImageViewer
                imageUrls={images}
                enableImageZoom={true}
                
                onSwipeDown={() => {
                  this.props.navigation.navigate("Home");
                }}
                
                enableSwipeDown={true}
              />
            </Modal>


        </View>

      )

   }
  
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64:true,
      //allowsEditing: true,
      aspect: [16, 9],
    });

    if (!result.cancelled) {
      this.setState({ takenPhoto_uri: result.uri ,data:result.base64 ,translated:null})
      
    }
    
  }


/*
  uploadPhoto = async () => {
    
    
    
    fetch('http://192.168.1.112:5000/dosyayukle', {
      method: 'POST',
      headers: {        
        Accept: 'application/json',
        //'Content-Type': 'image/png',
      },
      body: JSON.stringify({   
        dosya:this.state.data,
       })
       //body : "deger":"verim"
    })   
    /*
      .then((response)  => response.json()      
      .then((responseJson) => { 
              console.log(responseJson.bura)              
              this.setState({translated:responseJson.bura})   
              
              AsyncStorage.setItem(this.state.permanentData.toString(), JSON.stringify(myobject));
              
              
      })
      .catch((error) => {
        console.error(error);
      });
  }
*/





  uploadPhoto = async () => {
    
    fetch('http://192.168.1.61:5000/dosyayukle', {
      method: 'POST',
      headers: {        
        Accept: 'application/json',
        'Content-Type': 'image/png',
      },
      body: JSON.stringify({   
        dosya:this.state.data,
       })
       //body : "deger":"verim"
    })    
      .then((response)  => response.json()      
      .then((responseJson) => { 
              console.log(responseJson.bura)              
              this.setState({translated:responseJson.bura})                 
              
      })
      .catch((error) => {
        console.error(error);
      }));
  }

  getData= async() => {
    return fetch('http://192.168.1.105:5000/getdata')
      
      .then((response) => response.json())
      .then((responseJson) => { 
      //file = base64.decode(responseJson.WordText);
      let value=responseJson.description;
      
      this.setState({data:value})
      })
      .catch((error) => {
        console.error(error);
      });
}


}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: STATUS_BAR_HEIGHT,
    height: Platform.OS === 'ios' ? 200 : 50,
  },  
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#4630EB',
    
  },
  content: {
    alignItems: 'center',
    padding:'5%'
  },
  navbarImage: {
    alignItems: 'baseline',
    paddingTop:'3%'
  },
  button: {
    padding: '3%',       
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  previewer: 
{ 
  flex: 1,
  alignItems: 'center',
 
}
  
});

