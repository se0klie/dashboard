import './App.css';
import LineChartWeather from './components/LineChartWeather';
import Grid from '@mui/material/Grid2' ;
import IndicatorWeather from './components/IndicatorWeather';
import TableWeather from './components/TableWeather';
import ControlWeather from './components/ControlWeather';
import { useEffect, useState } from 'react';
import Item from '../src/interface/Item';
import NavBarPage from '../src/components/NavBarPage';
import { Box, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import darkTheme from './theme';
import { ThemeProvider } from '@emotion/react';

interface Indicator {
  title?: string;
  subtitle?: string;
  value?: string;
}


function App() {
  let [indicators, setIndicators] = useState<Indicator[]>([]);
  let [items, setItems] = useState<Item[]>([]);
  let [city, setCity] = useState("Guayaquil");
  let [chartVariable, setChartVariable] = useState("precipitation"); // Selected variable for the chart
  const handleCityChange = (event: SelectChangeEvent) => {
    const selectedCity = event.target.value as string;
    setCity(selectedCity);

  };

  useEffect(() => {
    let request = async () => {
      try {
        const controller = new AbortController();
        const storageKey = `openWeatherMap_${city}`;
        const expiringKey = `expiringTime_${city}`;

        let savedTextXML = localStorage.getItem(storageKey);
        let expiringTime = localStorage.getItem(expiringKey);
        let nowTime = (new Date()).getTime();

        if (!expiringTime || nowTime > parseInt(expiringTime)) {
          const API_KEY = "64e39b1133933fafe80734ce341ec848";
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&mode=xml&appid=${API_KEY}`,
            
            { signal: controller.signal }
          );

          if (!response.ok) throw new Error("Failed to fetch data");

          savedTextXML = await response.text();

          const hours = 0.01; // Cache duration in hours
          const delay = hours * 3600000;
          const expiringTime = nowTime + delay;

          localStorage.setItem(storageKey, savedTextXML);
          localStorage.setItem(expiringKey, expiringTime.toString());
        }

        const parser = new DOMParser();
        const xml = parser.parseFromString(savedTextXML ?? "", "application/xml");

        if (savedTextXML) {
          let dataToItems: Item[] = new Array<Item>();
          let dataToIndicators: Indicator[] = new Array<Indicator>();

          let name = xml.getElementsByTagName("name")[0].innerHTML || "";
          dataToIndicators.push({ "title": "Location", "subtitle": "City", "value": name });

          let timeArray = xml.getElementsByTagName("time");
          let time = Array.from(timeArray).slice(0, 6);

          let precipitationArray = xml.getElementsByTagName("precipitation");
          let precipitation = Array.from(precipitationArray).slice(0, 6);

          let humidityArray = xml.getElementsByTagName("humidity");
          let humidity = Array.from(humidityArray).slice(0, 6);

          let cloudsArray = xml.getElementsByTagName("clouds");
          let clouds = Array.from(cloudsArray).slice(0, 6);
          
          let tempArray = xml.getElementsByTagName("temperature");
          let tempSlice = Array.from(tempArray).slice(0,6);

          let temperature = xml.getElementsByTagName("temperature")[0];
          let tempNow = (parseFloat(temperature.getAttribute("value") ?? "") - 273.15).toFixed(1)
          let minTemp = (parseFloat(temperature.getAttribute("min") ?? "") - 273.15).toFixed(1)
          let maxTemp = (parseFloat(temperature.getAttribute("max") ?? "") - 273.15).toFixed(1)
          let relTemp = "MIN: " + minTemp.toString() + " MAX: " + maxTemp.toString();

          let wind = xml.getElementsByTagName("windSpeed")[0];
          let windSpeed = wind.getAttribute("mps") + " mps";
          let windDir = xml.getElementsByTagName("windDirection")[0].getAttribute("deg") + " deg.";
          let windStr = "Angle: " + windDir;
          dataToIndicators.push({ "title": "Wind", "subtitle": windStr, "value": windSpeed })
          dataToIndicators.push({ "title": "Temperature", "subtitle": relTemp, "value": tempNow })
          let sens = (parseFloat(xml.getElementsByTagName("feels_like")[0].getAttribute("value") ?? "") - 273.15).toFixed(1) + " C."
          dataToIndicators.push({ "title": "Feels like", "subtitle": "", "value": sens })
          setIndicators(dataToIndicators);

          for (let i = 0; i < 6; i++) {
            let fromString = time[i].getAttribute("from") || "";
            let from = fromString.split("T", 2)[1];
            let toString = time[i].getAttribute("to") || "";
            let to = toString.split("T", 2)[1];
            let probability = precipitation[i].getAttribute("probability") || "";
            let value = humidity[i].getAttribute("value") || "";
            let all = clouds[i].getAttribute("all") || "";
            let tempStr = tempSlice[i].getAttribute("value") || "";
            let temp = (parseFloat(tempStr) -  273.15).toFixed(1)
            dataToItems.push({ "dateStart": from, "dateEnd": to, "precipitation": probability, "humidity": value, "clouds": all, "temperature": temp });
          }
          setIndicators(dataToIndicators);
          setItems(dataToItems);
        }
      } catch (err) {
        console.error("Error fetching or parsing weather data:", err);
      }
    };

    request();
  }, [city]);

  const getChartData = () => {
    return items.map((item) => Number(item[chartVariable as keyof Item] || 0));
  };

  const getChartLabels = (): string[] => {
    return items.map((item) => item.dateStart || "");
  };

  return (
    <>
    <ThemeProvider theme={darkTheme}>
      <NavBarPage city={city} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
        }}
      >
        <Grid container spacing={5} justifyContent='left' sx={{ paddingTop: 8 }}>
          <Select
            value={city}
            onChange={handleCityChange}
            sx={{ width: 200,  borderRadius: "50px", backgroundColor: '#3f3f3f', color:'white'}}

            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: '#575757', // Background color of the dropdown
                  '& .MuiMenuItem-root': {
                    color: '#ffffff', // Text color of MenuItems
                    '&:hover': {
                      backgroundColor: '#717171', // Hover effect
                    },
                  },
                },
              },
            }}

          >
            <MenuItem value="Guayaquil">Guayaquil</MenuItem>
            <MenuItem value="Santa Elena">Santa Elena</MenuItem>
            <MenuItem value="Quito">Quito</MenuItem>
            <MenuItem value="Latacunga">Latacunga</MenuItem>
            <MenuItem value="Cuenca">Cuenca</MenuItem>
            <MenuItem value="Azogues">Azogues</MenuItem>
            <MenuItem value="Tena">Tena</MenuItem>
            <MenuItem value="Gualaceo">Gualaceo</MenuItem>
            <MenuItem value="La Libertad">La Libertad</MenuItem>
          </Select>
        </Grid>

        <Typography variant="h3" sx={{ color: '#ffffff', fontFamily: "'Verdana', sans-serif", fontWeight:'bold'}}>
          Current Data
        </Typography>

        <Grid container sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}>

          {indicators.map((indicator, idx) => (
            <Grid key={idx} padding={3} size={6} >
              <IndicatorWeather title={indicator.title} subtitle={indicator.subtitle} value={indicator.value} />
            </Grid>
          ))}
        </Grid>
      </Box>


      {/* Table */}
      <Grid size={{ xs: 12, xl: 8 }} sx={{ height: '60vh', width: '100%' }} paddingTop={4}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, xl: 9 }}>
            <TableWeather itemsIn={items} />
          </Grid>
        </Grid>
      </Grid>

      {/* Chart and Control */}
      <Grid
        container
        sx={{
          width: '100%',
          display: 'flex',
          height: '70vh',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <Grid sx={{ maxWidth: '600px', width: '100%' }}>
          <ControlWeather chartVariable={chartVariable} setChartVariable={setChartVariable} />
        </Grid>
        <Grid sx={{ maxWidth: '800px', width: '100%' }}>
          <LineChartWeather
            data={[{ label: chartVariable, value: getChartData() }]}
            xLabels={getChartLabels()}
          />
        </Grid>
      </Grid>
      </ThemeProvider>
    </>
  );
}

export default App;
