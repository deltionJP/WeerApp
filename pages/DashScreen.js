import React from 'react';
import {View, Button,Text,Image, AsyncStorage, FlatList} from 'react-native';
// import fetchWeather from "../api/api"
import {Actions} from 'react-native-router-flux';
import DashStyle from '../assets/style/DashStyle.js';
import DashFlatlistStyle from '../assets/style/DashFlatlistStyle.js';
import WeatherIcon from '../src/WeatherIcon.js';
import ForecastComponent from '../src/ForecastComponent.js';
// import { images } from '../src/iconThings.js';
// import icons from '../src/icons.json';
import { images } from '../src/icons.js';




// import moment from 'moment' ;
import 'moment/min/moment-with-locales';
import moment from 'moment/min/moment-with-locales';

export default class DashScreen extends React.Component {
    constructor(){
        super();
        this.state={
            temp:'',
            tempSign: '',
            metricTest: true,
            wheaterData: null,
            kelvin: 273.15,
            currentDate: null,
            description: "",
            apiKey: 'c020357374cd0f321baf69e8391624a7',
            // city: 'Amsterdam',/
            currentCelciusTemp: null,
            cityInput: 'Deventer',
            windSpeed: '',
            windDeg: '',
            cloudness: '',
            speedFormat:'km/u',
            pressure: '',
            currentTime: null,

            forecastData: null,
            humidity: null,
            iconUri: 'http://openweathermap.org/img/w/',
            description2: "",
            currentWeatherIcon: require('../assets/img/icons/transparant.png'),

// https://openweathermap.org/weather-conditions
        }
    }

    componentDidMount(){
        this.getSettings();
        this.getDateToday();
        this.getWheater();
        this.getForecast();
    }

    getFunctions(){
        this.getSettings();
        this.getWheater();
        this.getForecast();
    }

    getSettings = async () =>  {
        try {
            const value = await AsyncStorage.getItem('MWAtemp');
            if (value !== null) {
                this.setState({
                    temp:value,
                    metricTest: value=="Fahrenheit"? false: true});
            }
            const speedFormat = await AsyncStorage.getItem('MWASpeed');
            if (speedFormat !== null) {
                this.setState({
                    speedFormat:speedFormat,
                    speedBool: speedFormat=="m/s"? false: true});
            }

            const city = await AsyncStorage.getItem('MWAcity');
            if (city == null) {
                this.setState({cityInput: "Deventer"});
            }
            else {
                this.setState({cityInput: city});
            }

        }
        catch (e) {}

    }
    getWheater = async() =>
    {
        let currentWeather = 'http://api.openweathermap.org/data/2.5/weather?q='+this.state.cityInput+'&units=metric'+'&appid='+this.state.apiKey;
        let response = await fetch (currentWeather);
        let jsonObject = await response.json();
        this.setState({wheaterData:jsonObject});
        console.log(currentWeather);

        let currentTemp = "";
        let currentTempRound = "";
        let humidity = this.state.wheaterData.main.humidity;
        // let windSpeed = this.state.wheaterData.wind.speed;
        let windSpeed = null;
        let cloudness  =this.state.wheaterData.clouds.all;
        let pressure  =this.state.wheaterData.main.pressure;
        let weatherdescription = this.state.wheaterData.weather[0].description;

        if (this.state.speedBool) {
            windSpeed = this.state.wheaterData.wind.speed*3.6;
            windSpeed = windSpeed.toFixed(0)+' km/u'
        }
        else {
            windSpeed = this.state.wheaterData.wind.speed;
            windSpeed = windSpeed.toFixed(0)+' m/s'
        }

        if (this.state.metricTest) {
            currentTemp = this.state.wheaterData.main.temp;
            currentTempRound = currentTemp.toFixed(0);
        }
        else {
            currentTemp = this.state.wheaterData.main.temp+38.8;
            currentTempRound = currentTemp.toFixed(0);
        }

        this.setState({
            currentCelciusTemp:currentTempRound+'°',
            city: this.state.wheaterData.name,
            description:  this.state.wheaterData.weather[0].description,
            humidity: humidity+'%',
            windSpeed:  windSpeed,
            cloudness: cloudness+'%',
            pressure: pressure
        });

        // console.log(this.state.currentCelciusTemp);
        // console.log(this.state.city);
        // console.log(this.state.wheaterData.weather[0].description);
// console.log(this.state.humidity);
        // this.getDateToday();
        this.weatherIcons();

    }
    getForecast = async () =>{
        moment.locale('nl');
        let fiveDayForecast = 'http://api.openweathermap.org/data/2.5/forecast?q='+this.state.cityInput+',nl&units=metric&appid='+this.state.apiKey;
        console.log("5 Day Forecast");
        console.log(fiveDayForecast);
            let response = await fetch (fiveDayForecast);
        let jsonObject = await response.json();

        this.setState({wheaterData:jsonObject});


        let forecastArray = [];
        let forecastFinally = [];
        let tempature = "";
        let weatherdescriptionForecast = null;
        let weatherImg = "";

        for (var i = 0; i < this.state.wheaterData.list.length; i++) {
            let forecastDates = this.state.wheaterData.list[i].dt_txt;
            let resultDay = moment(forecastDates).      format('dddd');
            let resultDayNumber = moment(forecastDates).format('DD');
            let resultMonth = moment(forecastDates).    format('MMMM');
            let resultDateFull = moment(forecastDates). format('LL');
            let resultTime = moment(forecastDates).     format('LT');
            let results = resultDay + ' ' + resultDayNumber + ' '+ resultMonth;
            let tempature  = this.state.wheaterData.list[i].main.temp;
            // delete resultDateFull.now
            // console.log(resultDateFull);

            if (this.state.metricTest) {
                tempature = tempature.toFixed(0);
            }
            else {
                tempature = tempature+38.8;
                tempature = tempature.toFixed(0);
            }


             weatherdescriptionForecast = this.state.wheaterData.list[i].weather[0].id;
             console.log(this.state.wheaterData.list[i].weather[0].description);
             // console.log(weatherdescriptionForecast);
             // weatherImg = "../assets/img/icons/"+icons[weatherdescriptionForecast].icon+".png";
             weatherImg = images[weatherdescriptionForecast].icon;
            forecastArray.push({"date": results, "temp": tempature+'°', "time": resultTime, "icon": weatherImg, "iconDesc":this.state.wheaterData.list[i].weather[0].description});
        }

        let now = moment().format('dddd') + ' ' + moment().format('DD') + ' ' + moment().    format('MMMM') ;
        console.log(now);
        for(var j = forecastArray.length-1; j--;){
        	if (forecastArray[j].date === now) forecastArray.splice(j, 1);
        }
        // console.log(forecastArray);

        for (var i = 5; i < forecastArray.length; i+=8) {
            // console.log(forecastArray[i]);
            let date = forecastArray[i].date;
            let temp = forecastArray[i].temp;
            let time = forecastArray[i].time;
            let icon = forecastArray[i].icon;
            let iconDesc = forecastArray[i].iconDesc;
            forecastFinally.push({"date": date, "temp": temp, "time": time, "icon": icon, "iconDesc": iconDesc});
        }
        // console.log(forecastFinally);

        this.setState({
            forecastData: forecastFinally,
        });

    }

    getDateToday(){
        moment.locale('nl');
        let today = moment().format('dddd')+" "+ moment().format('LL');
        this.setState({
            currentDate: today,
            currentTime: moment().format('LT')   // 14:08
        });
    }

weatherIcons = async () =>{
    const weatherdescriptionId = this.state.wheaterData.weather[0].id;

    console.log(images[weatherdescriptionId]);


    let imgSource = images[weatherdescriptionId].icon;
    // let newImgSource = "../assets/img/icons/"+icons[weatherdescriptionId].icon+".png";
    console.log(imgSource);

    this.setState({currentWeatherIcon: imgSource});

}

    render(){
        return(
            <View style={DashStyle.rootView}>
                <Image
                    style={{
                        backgroundColor: '#ccc',
                        flex: 5,
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                    }}
                    source={require('../assets/img/header-background.png')}
                />
                <View style={{flex:3}}>
                {/* <View style={{flex:3, backgroundColor:"#3B3B5C"}}> */}

                    <View style={{flex:4}}>

                        <View style={[{alignSelf: 'center'}]} >
                            <Text style={DashStyle.cityText}>
                                {this.state.city}
                            </Text>
                        </View>
                        <View style={[{alignSelf: 'center'} ,DashStyle.red]} >
                            <View style={{}}>
                                <Text style={{color: "#ffffff", fontSize: 80, alignSelf: 'center', marginTop: -15}}>
                                    <Image
                                        style={{width: 230, height: 230, backgroundColor: "#8c6eeb"}}
                                        source={this.state.currentWeatherIcon}
                                    />
                                    {this.state.currentCelciusTemp}
                                </Text>
                            </View>

                        </View>
                            {/* <WeatherIcon descriptionValue={this.state.description}/> */}
                    </View>

                    {/* <View style={{flex: 1, backgroundColor: "#3B3B5C",justifyContent: 'center'}}> */}
                    <View style={{flex: 1,justifyContent: 'center'}}>
                        <Text style={{marginLeft: 15,color: "#6FA9CF", fontWeight: "bold"}}>{this.state.currentDate}</Text>
                        <Text style={{marginLeft: 15,color: "#6FA9CF", fontWeight: "bold"}}>{this.state.currentTime}</Text>
                    </View>
               </View>

               <View style={DashStyle.secondScreenLevel}>
                   <View style={DashFlatlistStyle.dailyTitleView}>
                       <Text style={DashFlatlistStyle.titleText}>Dagelijks</Text>
                   </View>
                   {/* <Text>{this.state.temp}</Text> */}
                   <View style={[DashFlatlistStyle.topFlatlistView]}>
                       <FlatList data={this.state.forecastData}
                            renderItem={({item}) =>
                            <View style={DashFlatlistStyle.insideFlatlistView}>
                                <View style={DashFlatlistStyle.viewFlatlistItemDate}>
                                    <Text style={[DashFlatlistStyle.dateText, DashFlatlistStyle.textColor]}>{item.date}</Text>
                                </View>
                                <View style={DashFlatlistStyle.imageView}>
                                     <Image source ={item.icon} style={{width: 40, height: 40, marginTop: 5}} />
                                </View>
                                <View style={{width: '10%', height: 50, borderTopWidth: 1, borderColor: "#C8C7CC"}}>
                                    <Text style={[{fontSize: 16 , lineHeight: 50}, DashFlatlistStyle.textColor]}>{item.temp} </Text>
                                </View>
                            </View>
                            }
                                keyExtractor={(item,index) => item } />
                    </View>
                    <Text style={DashFlatlistStyle.titleText}>Details</Text>
                    <View style={{flexDirection:'row'}}>
                    <View style={{marginTop:8, marginBottom: 4, width: '50%'}}>
                        <Text style={[{marginTop: 10}, DashFlatlistStyle.textColor]}>Luchtvochtigheid: {this.state.humidity}</Text>
                        <Text style={[{marginTop: 10}, DashFlatlistStyle.textColor]}>Bewolking: {this.state.cloudness}</Text>
                    </View>
                        <View style={{marginTop:8, marginBottom: 4, width: '50%'}}>
                            <Text style={[{marginTop: 10}, DashFlatlistStyle.textColor]}>Luchtdruk: {this.state.pressure} hPa</Text>
                            <Text style={[{marginTop: 10}, DashFlatlistStyle.textColor]}>Wind: {this.state.windSpeed}</Text>

                            {/* <Text style={[{marginTop: 10}, DashFlatlistStyle.textColor]}>Luchtvochtigheid: {this.state.humidity}</Text> */}

                        </View>
                    </View>
               </View>

            </View>

        );
    }
}
