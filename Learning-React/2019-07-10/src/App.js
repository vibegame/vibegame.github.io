import React from 'react';
import Info from './components/info';
import Form from './components/form';
import Weather from './components/weather';

const API_KEY = "4d4cac9ec6b202e73c13179487164b62";

class App extends React.Component {

  gettingWeather = async (e) => {
    e.preventDefault();
    const API_URL = await fetch(`https://samples.openweathermap.org/data/2.5/weather?id=2172797&appid=b6907d289e10d714a6e88b30761fae22`);
    // const data = await API_URL.json();
    // console.log(data);
  }

  render() {
    return (
    <div>
      <Info />
      <Form weatherMethod = {this.gettingWeather} />
      <Weather />
    </div>
    );
  }
}

export default App;