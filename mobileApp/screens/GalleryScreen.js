import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Text, ScrollView ,Platform ,RefreshControl,  } from 'react-native';
import { FileSystem, FaceDetector, MediaLibrary, Permissions,Constants , } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';
import Photo from './Photo';

const PHOTOS_DIR = FileSystem.documentDirectory + 'photos';
const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 24 });
const NAVBAR_HEIGHT = 48;

export default class GalleryScreen extends React.Component {
  

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      faces: {},
      images: {},
      photos: [],
      selected: [],
      updated_paged:null
    };
  }


  _onRefresh = () => {
    this.setState({refreshing: true});
    this.fetchData().then(() => {
      this.setState({refreshing: false});
    });
  }

  componentDidMount = async () => {
    const photos = await FileSystem.readDirectoryAsync(PHOTOS_DIR);
    this.setState({ photos });    
  };
  
  fetchData = async() =>{
    const photos = await FileSystem.readDirectoryAsync(PHOTOS_DIR);
    this.setState({ photos });
  }; 

  toggleSelection = (uri, isSelected) => {
    let selected = this.state.selected;
    if (isSelected) {
      selected.push(uri);
    } else {
      selected = selected.filter(item => item !== uri);
    }
    this.setState({ selected });
    console.log(uri);
  };

  deleteLocalPhotos = async () =>{
    const photos = this.state.selected;

    if(photos.length>0){
      const promises = photos.map(photoUri => {
        return FileSystem.deleteAsync(photoUri);        
      });
      await Promise.all(promises)
      alert('Basariyla silindi!')  
      this.toggleSelection;
    }
    else{
      alert ("Fotograf yok!");
    }    
  }

  saveToGallery = async () => {
    const photos = this.state.selected;

    if (photos.length > 0) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status !== 'granted') {
        throw new Error('Kamera izni alınamadı!');
      }

      const promises = photos.map(photoUri => {
        return MediaLibrary.createAssetAsync(photoUri);        
      });
      //console.log(photoUri);
      await Promise.all(promises)
      alert('Kayıt Başarılı!')
      this.setState({selected:[]})
    } else {
      alert('Kayıt Başarısız!');
    }
    
  };

  renderPhoto = fileName => 
    <Photo
      key={fileName}
      uri={`${PHOTOS_DIR}/${fileName}`}
      onSelectionToggle={this.toggleSelection}
    />;

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navbar}>
          <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
            <MaterialIcons name="arrow-back" size={25} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button_middle} onPress={this.deleteLocalPhotos}>
            <MaterialIcons name="delete" size={25} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.saveToGallery}>
          <MaterialIcons name="save" size={25} color="white" />
          </TouchableOpacity>
        </View>
        <ScrollView contentComponentStyle={{ flex: 1 }} refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }>
          <View style={styles.pictures}>
            {this.state.photos.map(this.renderPhoto)}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: STATUS_BAR_HEIGHT,
    backgroundColor: 'white',
    height: Platform.OS === 'ios' ? 200 : 100,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#4630EB',
    
  },
  pictures: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  button_middle:{
    padding:20,
    alignItems:"flex-end",
  },
  button: {
    padding: 20,
  },
  whiteText: {
    color: 'white',
  }
});
