import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import DashScreen from './pages/DashScreen';
import SettingScreen from './pages/SettingScreen';
import AboutScreen from './pages/AboutScreen';
import {Router, Scene,Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import MainService from './app/services/mainservice.js';


//Create a dedicated class that will manage the tabBar icon
class TabIcon extends React.Component {
  render() {
    var color = this.props.selected ? '#00f240' : '#301c2a';

    return (
      <View style={{flex:1, flexDirection:'column', alignItems:'center', alignSelf:'center', justifyContent: 'center'}}>
        <Icon style={{color: color}} name={this.props.iconName || "circle"} size={25}/>
        {/* <Text style={{color: color, fontSize: 12}}>{this.props.title}</Text> */}
      </View>
    );
  }
}

export default class App extends React.Component {
    state = {
        loaded:false
    }
    constructor(){
        super();
        MainService.load(v => this.setState({loaded:true}));
    }
  render() {
    return (
        <View style={{flex:1}}>
        {this.state.loaded ?
        <Router navigationBarStyle={styles.navBar} titleStyle={styles.navTitle} sceneStyle={styles.routerScene}>
            <Scene key="root"
                        tabs={true}
                        tabBarStyle={{backgroundColor: "white", marginTop: 40, borderTopWidth:0}}
                        labelStyle={{fontSize: 14}}>
                <Scene key="dash"
                    component={DashScreen}
                    title='Dashboard'
                    animation="fade"
                    initial={true}
                    iconName="home"
                    icon={TabIcon}
                    hideNavBar={false}
                    onEnter={()=>{Actions.refs.dash.getFunctions();}}
                    // onEnter={()=>{Actions.refs.dash.getWheater();}}
                />
                <Scene key="settings"
                    component={SettingScreen}
                    title='Settings'
                    animation="fade"
                    iconName="cog"
                    icon={TabIcon}
                    hideNavBar={false}
                />
                <Scene key="about"
                    component={AboutScreen}
                    title='About'
                    animation="fade"
                    iconName="info-circle"
                    icon={TabIcon}
                    hideNavBar={false}
                />
            </Scene>
        </Router>
        // 189CC6

            :   <View style={{flex: 1,flexDirection: 'column',justifyContent: 'center',alignItems: 'center', backgroundColor: '#ffffff'}}>
                    {/* <Text>Loading...</Text> */}
                    <Image
                        fadeDuration={1000}
                      style={{height: 300, width: 300}}
                      source={require('./assets/iconapp.png')}
                      // source={require('./assets/img/weather-icon.png')}
                    />
                </View>}
        </View>
    );
  }
}
const styles = StyleSheet.create({
  navBar: {
    backgroundColor: 'white', // changing navbar color,
            // paddingTop: 10
    height: 5,

  },
  navTitle: {
    fontSize: 0,
    height:5,
    color: 'black', // changing navbar title color
  },
  routerScene: {
    // paddingTop: 20
  },
})
