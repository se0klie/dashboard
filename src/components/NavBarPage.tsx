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
            <AppBar position="fixed" sx={{background: '#3f3f3f'}}>
                <Toolbar sx={{alignItems: 'center', height:'10vh'}}>
                    <Typography variant="h5" sx={{fontFamily: "'BoldFont', sans-serif",color:'#ffd99e'}}>
                        {city}'s Weather
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
    );
};