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
    if(location === undefined) location = this.state.selectedLocation;
    getEvents().then((events) => {
      const locationEvents = (location === "all") ?
            events : events.filter((event) => event.location === location);
            eventCount = eventCount === undefined ?
            this.state.numberOfEvents : eventCount;
      this.setState({
        events: locationEvents.slice(0, eventCount),
        selectedLocation: location,
        numberOfEvents: eventCount
      });
    })
  }

  getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location)=>{
      const number = events.filter((event) => event.location === location).length;
      const city = location.split(", ").shift();
      return {city, number};
    });
    return data;
  }

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem("access_token");
    const isTokenValid = (await checkToken(accessToken)).error ? false: true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
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
    if (showWelcomeScreen === undefined) return <div className="App" />
    return (
      <div className="App">
        <WelcomeScreen
          showWelcomeScreen={showWelcomeScreen}
          getAccessToken={() => { getAccessToken() }}
        />
        <h1>Welcome to a Meet App</h1>
         {!navigator.onLine && (
          <WarningAlert 
          text={"You are currently offline. App is running in offline mode."}
          />
        )}
        <CitySearch 
          updateEvents={this.updateEvents}
          locations={locations}
        />
        <EventList events={events} />
        <NumberOfEvents
          updateEvents={this.updateEvents}
          numberOfEvents={numberOfEvents}
        />        
        <div className="data-vis-wrapper">
          <EventGenre events={events} />
          <ResponsiveContainer height={400} >
            <ScatterChart
              margin={{ top: 20, right: 20, bottom: 20, left: 20, }}
            >
              <CartesianGrid />
              <XAxis 
                type="category"
                dataKey="city"
                name="city"
              />
              <YAxis
                allowDecimals={false}
                type="number"
                dataKey="number"
                name="number of events"
              />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter data={this.getData()} fill="#E1FF91" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>        
      </div>
    );
  }
}

export default App;