import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

interface Indicator {
    title?: String;
    subtitle?: String;
    value?: String;
}

export default function IndicatorWeather(config: Indicator) {
    return (
        <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Typography component="h2" variant="h6" 
                        color="#FC7A1E" fontFamily="'Nunito', sans-serif" gutterBottom>
                {config.title} 
            </Typography>
            <Typography fontFamily="'Nunito', sans-serif" component="p" variant="h4">
                {config.value}
            </Typography>
            <Typography fontFamily="'Nunito', sans-serif" color="#F9C784" sx={{ flex: 1 }}>
                {config.subtitle}
            </Typography>
        </Paper> 
    )
}