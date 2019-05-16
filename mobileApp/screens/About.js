import React from 'react';
import {Image,View,Platform,StyleSheet,TouchableOpacity,} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button,  Left, Body } from 'native-base';
import AutoHeightImage from 'react-native-auto-height-image';   
import { 
    Ionicons,
    MaterialIcons,
    Foundation,
    MaterialCommunityIcons,
    Octicons
  } from '@expo/vector-icons';

const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 24 });


export default class AboutPage extends React.Component{




    render(){

        return(
            

                <Container style={styles.container}>
                        <Header style={styles.navbar}>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.goBack()}>
                        <Ionicons name={Platform.OS === 'ios' ? 'ios-arrow-round-back' : 'md-arrow-round-back'} size={25} color="white" />
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.navbarImage}>
                        <Image source={require('../assets/images/forHeader1.png')} style={{width: 130, height: 40}}/>
                        </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Camera')}>
                        <Ionicons name={Platform.OS === 'ios' ? 'ios-camera' : 'md-camera'} size={25} color="white" />
                    </TouchableOpacity>
                    </Header>   
                <Content>
                <Card style={{flex: 0}}>
                    <CardItem>
                    <Left>
                        <Thumbnail source={require( '../assets/images/Sakarya_Universitesi.jpg')} />
                        <Body>
                        <Text>Osmanlıca - Türkçe Sözlük</Text>
                        <Text note>2019</Text>
                        </Body>
                    </Left>
                    </CardItem>
                    <CardItem >
                    <Body>                        
                        <AutoHeightImage style={{transform: [{ rotate: '0deg' }] , flex:1}}
                            width={385}
                            source={require( '../assets/images/grup.jpg') }
                            resizeMode="contain"
                            
                            />
                       
                    </Body>
                    </CardItem>
                    <CardItem  >
                    <Body>
                        <Text>
                        Geliştirenler:
                        </Text>
                        <Text>
                            <MaterialCommunityIcons name="chevron-right" />
                        Sulaiman Siddiqi - B151210553
                        </Text>
                        <Text>
                            <MaterialCommunityIcons name="chevron-right" />
                        Yusuf Aslan - B161210373
                        </Text>
                        <Text>
                            <MaterialCommunityIcons name="chevron-right" />
                        Ömer Yel - B161210385
                        </Text>
                        
                    </Body>
                    </CardItem>
                </Card>
                </Content>
        </Container>
            )

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
    paddingTop:'5%'
    },
    button: {
    padding: '3%',       
    alignItems: 'center',
    justifyContent: 'space-between'
    },

})