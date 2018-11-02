import React from 'react';
import {Image,View, Button, Text, AsyncStorage, TextInput, Picker, Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';
import SettingsList from 'react-native-settings-list';



export default class SettingScreen extends React.Component {

    constructor(){
        super();
        this.state={
            switchValue:true,
            valueSpeed: true,
            city: null
        }
    }


    onValueChange = async(value)=>{
        let x = "Celcius";
        if(value == false){
            x = "Fahrenheit";
        }
        await AsyncStorage.setItem('MWAtemp',x)
        this.setState({switchValue:value})
        // console.log(x);
    }
    onSpeedChange = async(value)=>{
        // alert(value);
        let x = "km/u";
        if(value == false){
            x = "m/s";
        }
        await AsyncStorage.setItem('MWASpeed',x)
        this.setState({valueSpeed:value})
        // console.log(x);
    }

    ChangeCity = (text) => {
        try {
            AsyncStorage.setItem('MWAcity', text.text);
        } catch (e) {

        }
    }

    render(){
        return(
            <View>
                <SettingsList>

                    <SettingsList.Header headerText='Temperatuur eenheid' headerStyle={{color:'black'}}/>
                    <SettingsList.Item
                                icon={
                                  <View style={{height:30,marginLeft:10,alignSelf:'center'}}>
                                    <Image style={{alignSelf:'center',height:40, width:40}} source={require('../assets/img/zon2.png')}/>
                                  </View>
                                }
                                itemWidth={50}
                                title='Fahrenheit / Celcius'
                                hasSwitch={true}
                                hasNavArrow={false}
                                switchState={this.state.switchValue}
                                switchOnValueChange={this.onValueChange}
                              />
                    <SettingsList.Item
                                icon={
                                  <View style={{height:30,marginLeft:10,alignSelf:'center'}}>
                                    <Image style={{alignSelf:'center',height:40, width:40}} source={require('../assets/img/zon2.png')}/>
                                  </View>
                                }
                                itemWidth={50}
                                title='M/S - KM/U'
                                hasSwitch={true}
                                hasNavArrow={false}
                                switchState={this.state.valueSpeed}
                                switchOnValueChange={this.onSpeedChange}
                              />
                              {/* <Picker
                                   selectedValue={this.state.language}
                                   style={{ height: 50, width: 100 }}
                                   onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
                                   <Picker.Item label="Java" value="java" />
                                   <Picker.Item label="JavaScript" value="js" />
                                 </Picker> */}
                              <TextInput
                                style= {{width: 100, height:40}}
                                placeholder="Voer hier een plaats in"
                                onChangeText={(text) => this.ChangeCity({text})}/>

                </SettingsList>
          </View>
        );
    }
}
