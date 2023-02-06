import { Container, CssBaseline, Paper, ThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ChooseScreen from './screens/ChooseScreen';
import HomeScreen from './screens/HomeScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentScreen from './screens/PaymentScreen';
import ReviewScreen from './screens/ReviewScreen';
import SelectPaymentScreen from './screens/SelectPaymentScreen';

const theme = createTheme({
  typography: {
    h1: {
      fontWeight: 'bold'
    },
    h2: {
      fontSize: '2rem',
      color: 'black',
      fontWeight: 'bold'
    },
    h3: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: 'white'
    },
    body2: {
      fontWeight: 'bold'
    }
  },
  palette: {
    primary: { main: '#ff1744' },
    secondary: { main: '#118e16', contrastText: '#ffffff' }
  }
});

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="sm">
          <Paper>
            <Routes>
              <Route path="/" element={<HomeScreen />} exact></Route>
              <Route path="/choose" element={<ChooseScreen />} exact></Route>
              <Route path="/order" element={<OrderScreen />} exact></Route>
              <Route path="/review" element={<ReviewScreen />} exact></Route>
              <Route path="/select-payment" element={<SelectPaymentScreen />} exact></Route>
              <Route path="/payment" element={<PaymentScreen />} exact></Route>
            </Routes>
          </Paper>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
