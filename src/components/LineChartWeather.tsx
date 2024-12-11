import Paper from '@mui/material/Paper';
import { LineChart } from '@mui/x-charts/LineChart';

interface LineChartWeatherProps {
  data: { label: string; value: number[] }[];
  xLabels: string[];
}

export default function LineChartWeather({ data, xLabels }: LineChartWeatherProps) {
  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <LineChart
        width={500}
        height={300}
        series={data.map(item => ({
          data: item.value,
          label: item.label
        }))}
        xAxis={[{ scaleType: 'point', data: xLabels }]}
      />
    </Paper>
  );
}
