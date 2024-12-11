// ControlWeather.tsx
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface ControlWeatherProps {
  chartVariable: string;
  setChartVariable: (variable: string) => void;
}

export default function ControlWeather({ chartVariable, setChartVariable }: ControlWeatherProps) {
  const items = [
    { "name": "Precipitación", "description": "Cantidad de agua que cae sobre una superficie en un período específico.", "key": "precipitation" },
    { "name": "Humedad", "description": "Cantidad de vapor de agua presente en el aire, generalmente expresada como un porcentaje.", "key": "humidity" },
    { "name": "Nubosidad", "description": "Grado de cobertura del cielo por nubes, afectando la visibilidad y la cantidad de luz solar recibida.", "key": "clouds" }
  ];

  const handleChange = (event: SelectChangeEvent) => {
    const selectedKey = event.target.value;
    setChartVariable(selectedKey);
  };

  return (
    <Paper>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="variable-select-label">Variables</InputLabel>
          <Select
            labelId="variable-select-label"
            id="variable-select"
            label="Variables"
            value={chartVariable}
            onChange={handleChange}
          >
            <MenuItem value="" disabled>Seleccione una variable</MenuItem>
            {items.map((item, key) => (
              <MenuItem key={key} value={item.key}>{item.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Typography mt={2} component="p" color="text.secondary">
        {
          items.find(item => item.key === chartVariable)?.description ||
          "Seleccione una variable para ver su descripción."
        }
      </Typography>
    </Paper>
  );
}
