import React, { Component } from 'react';
import {View,Text, Image, AppState} from 'react-native';
// import styles from './Style.js'

export default class WeatherIcon extends React.Component{
    constructor(){
        super();
        this.state={
            iconUri: 'http://openweathermap.org/img/w/',
            description2: "",
            currentWeatherIcon: ""
            // https://openweathermap.org/weather-conditions
        }
    }

    componentDidMount(){
        this.theIcons();
    }
        theIcons = async () =>  {

        console.log("theicon");
        console.log(this.props.descriptionValue);
        var imageArray = [
            {
                icon: "01d.png",
                description: "clear sky"
            },
            {
                icon: "02d.png",
                description: "few clouds"
            },
            ];

        for (var i = 0; i < imageArray.length; i++) {
        // var icon = $('#icon' + i);
        // icon.attr('src', imageArray[i].src);
            // console.log(imageArray[i].icon);
        }
        let theDescription = this.props.descriptionValue;
        // console.log(theDescription);
        if (theDescription == "clear sky") {
                this.setState({
                    currentWeatherIcon: this.state.iconUri+imageArray[0].icon
                });
        }
        else if (theDescription == "broken clouds") {
            this.setState({
                currentWeatherIcon: this.state.iconUri+imageArray[0].icon
            });
        }
        // console.log("test");
        // console.log(this.state.currentWeatherIcon);
        // console.log(this.props.descriptionValue);
    }


    render(){
        return(
            <View style={[{alignSelf:"flex-start"} ]} >
                {/* <Text style={{color: "#ffffff", fontSize: 80, alignSelf: 'center', marginTop: -15}}> */}
                    <Image
                              style={{width: 50, height: 50}}
                              source={{uri: this.state.iconUrl}}
                            />
                <Text>{this.props.descriptionValue}----{this.state.iconUrl}</Text>
            </View>
        )
    }
}
