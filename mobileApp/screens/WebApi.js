import React, { Component } from 'react';
import * as Font from 'expo-font'
import { Image, ActivityIndicator,AsyncStorage ,View} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
export default class CardShowcaseExample extends Component {


constructor(props){
    super(props);
    this.state={
        fontLoaded:false,
        meaning:null,
        imageUri:null,
        myKey:null,
        cardCount:parseInt(this.props.navigation.state.params.cardCount),
        
    };
  }

    

    async componentDidMount(){
        await Font.loadAsync({
            'Roboto-Black':require('../assets/fonts/Roboto-Black.ttf'),
            'Roboto-BlackItalic':require('../assets/fonts/Roboto-BlackItalic.ttf'),
            'Roboto_medium':require('../assets/fonts/Roboto_medium.ttf'),
            
          });          
          this.setState({fontLoaded:true});

          
    }
    
     
    



  render() {

    

    return (
      <Container>
        <Header />
        {this.state.fontLoaded ?(
        <Content>
         
         {this.getSavedData(1)}
        </Content>):
        (<ActivityIndicator size="large"/>)}
      </Container>
    );
  }

  viewFunc = (meaning,urim) =>{

    return(<View>
          <Card style={{flex: 0}}>            
            <CardItem>
              <Body>
                <Image source={{uri:this.state.imageUri}} style={{height: 300, width: 500, flex: 1}}/>
                <Text>
                 {meaning}
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent textStyle={{color: '#87838B'}} >
                  <Icon name="logo-github" />
                  
                  <Text>{this.state.meaning}</Text>
                </Button>
              </Left>
            </CardItem>
          </Card>
          </View>)
  }



  getSavedData = async  (num) =>{
  //console.log(this.state.myKey)
        console.log(num+"caountcar")
        
        
        const value =await AsyncStorage.getItem(num.toString())          
        var obj=JSON.parse(value);
        this.setState({myKey:obj})
        var meaning =obj.meaning;
        var imageUri=obj.imageUri;
        
          
          
      
        
        console.log(meaning+"meaning")
        console.log(new Date()+"date")
             
        return( <View>
          <Card style={{flex: 0}}>            
            <CardItem>
              <Body>
                <Image source={{uri:this.state.imageUri}} style={{height: 300, width: 500, flex: 1}}/>
                <Text>
                 {this.state.myKey.map(obj =>obj.meaning)}
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent textStyle={{color: '#87838B'}} >
                  <Icon name="logo-github" />
                  
                  <Text>{this.state.meaning}</Text>
                </Button>
              </Left>
            </CardItem>
          </Card>
          </View>


        )
        }

        forCards = () => {

          var cards =[];
          var num=this.state.cardCount;
          console.log(num+"new card state")
          for(let i =0; i < 10; i++){
            if(num !=0){
              console.log(num+"new card")
              console.log(this.getSavedData(num)+"iiiiiiiiii")
              cards.push(this.getSavedData(num))        
              num=num-1;
              console.log(num+"new card-1")
            }
          }
          console.log(cards[0]+"inside")
          return cards
    
        }

        
}