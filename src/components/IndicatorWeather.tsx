import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

interface Indicator {
    title?: String;
    subtitle?: String;
    value?: String;
}

const theme = createTheme({
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#3f3f3f',
                    color: 'white',
                    boxShadow: '0px 4px 10px #121212',
                }
            }
        }
    }
})

export default function IndicatorWeather(config: Indicator) {
    return (
        <ThemeProvider theme={theme}>
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography component="h2" variant="h6"
                    gutterBottom
                    sx={{ fontFamily: "'Verdana', sans-serif" }}>
                    {config.title}
                </Typography>
                <Typography component="p" variant="h4"
                    sx={{ fontFamily: "'Verdana', sans-serif", fontWeight: 'bold' }} >
                    {config.value}
                </Typography>
                <Typography sx={{ flex: 1, fontFamily: "'Verdana', sans-serif" }}  >
                    {config.subtitle}
                </Typography>
            </Paper>
        </ThemeProvider>
    )
}