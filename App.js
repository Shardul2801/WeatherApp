import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';

import {Lottie} from 'lottie-react-native'

const { Lottie } = lottie-react-native;

import {API_key} from './utilities/WeatherAPIKey' ;
import Weather from './Component/Weather';



export default class App extends React.Component {
  
  
  constructor(props) {
    super(props);
    this.state ={
      isLoading: true,
      temperature: 0,
      weatherCondition: null,
      error: null 
    };
  }
  
  fetchWeather = (lat, lon) => {
    fetch( 
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_key}&units=metric`
      )
    .then(response => response.json())
    .then(json => {
      this.setState({
      temperature: json.main.temp,
      weatherCondition: json.weather[0].main,
      isLoading: false
    });
  });
  
  }

  componentDidMount () {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude)
      },
      error => {
        this.setState ({
          error: `Error Getting Weather Conditions`
        });
      }
    );
  }

  
  
  
  
  
  
  
  render() {
    const {isLoading , weatherCondition , temperature} = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText} > Fetching The Weather... </Text>
              
          </View> ): (
            <Weather weather ={weatherCondition} temperature={temperature}/>
          )
        }
        
        
      </View>
    );
  }
}  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFDE4",
  },
  loadingText: {
    fontSize: 30
  }
});
