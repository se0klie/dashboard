import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import "../App.css"

interface NavbarProps {
    city: string;
  }

export default function Navbar({city}: NavbarProps) {
    return (
        <>
            <AppBar position="fixed" sx={{background: '#067bc2'}}>
                <Toolbar sx={{alignItems: 'center', height:'10vh'}}>
                    <Typography variant="h3" sx={{ fontFamily: "'Nunito', sans-serif"}}>
                        {city}'s Weather
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
    );
};