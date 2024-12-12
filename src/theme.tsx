import { createTheme} from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark", 
    background: {
      paper: "#1e1e1e", 
    },
    text: {
      primary: "#ffffff", 
      secondary: "#bdbdbd",
    },
  },
  components: {
    MuiTableContainer: {
      styleOverrides: {
        root: {
          backgroundColor: "#2e2e2e", 
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#424242",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: "#ffffff", 
          borderBottom: "1px solid #444", 
        },
        head: {
          fontWeight: "bold", 
        },
      },
    },
  },
});

export default darkTheme;
