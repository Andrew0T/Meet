import React, { Component } from "react";
import WelcomeScreen from "./WelcomeScreen";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import EventGenre from "./EventGenre";
import { WarningAlert } from "./alert";
import { getEvents, extractLocations, checkToken, getAccessToken } from "./api";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import "./App.css";
import "./nprogress.css";

class App extends Component {
  state = {
    events: [],
    locations: [],
    selectedLocation: "all",
    numberOfEvents: 32,
    showWelcomeScreen: undefined
  }

  updateEvents = (location, eventCount) => {
    const { numberOfEvents, selectedLocation} = this.state;
    if(location === undefined) location = selectedLocation;
    getEvents().then((events) => {
      const locationEvents = location === "all" ?
            events : events.filter((event) => event.location === location);
      eventCount = eventCount === undefined ? numberOfEvents : eventCount;
      this.setState({
        events: locationEvents.slice(0, eventCount),
        selectedLocation: location,
        numberOfEvents: eventCount
      });
    });
  };

  getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location)=>{
      const number = events.filter((event) => event.location === location).length;
      const city = location.split(", ").shift();
      return {city, number};
    });
    return data;
  };

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem("access_token");
    const isTokenValid = (await checkToken(accessToken)).error ? false: true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    const localHost = window.location.href.startsWith("http://localhost") ? true:
    code || isTokenValid;
    this.setState({ showWelcomeScreen: !localHost });
    if (localHost  && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  render() {
    const { events, locations, numberOfEvents, showWelcomeScreen } = this.state;
    if (showWelcomeScreen === undefined) return <div className="App" />;
    return (
      <div className="App">
        <h1>Welcome to a Meet App</h1>
          <div className="OfflineAlert" >
         {!navigator.onLine && (
          <WarningAlert 
          text={"You are currently offline. App is running in offline mode."}
          />
        )}
        </div>
        <div>
          <CitySearch 
            locations={locations}
            updateEvents={this.updateEvents}
          />
          <NumberOfEvents
            numberOfEvents={numberOfEvents}
            updateEvents={this.updateEvents}
          />
        </div>
        <div className="data-vis-wrapper">
          <EventGenre events={events} />
          <ResponsiveContainer height={300} >
            <ScatterChart
              margin={{ top: 20, right: 20, bottom: 20, left: 20, }}
            >
              <CartesianGrid/>
              <XAxis 
                type="category"
                dataKey="city"
                name="city"
                stroke="#ECDB3A"                
              />
              <YAxis
                allowDecimals={false}
                max="32"
                type="number"
                dataKey="number"
                name="number of events"
                stroke="#ECDB3A"
              />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter data={this.getData()} fill="#EEFF99" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <EventList events={events} />
        <WelcomeScreen
          showWelcomeScreen={showWelcomeScreen}
          getAccessToken={() => { getAccessToken() }}
        />
      </div>
    );
  }
}

export default App;