import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import './App.css';
import Router from './Router';
import { RecoilRoot } from 'recoil';


function App() {
  const theme = createTheme();

  return (
    <main className='app'>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router />
        </ThemeProvider>
      </RecoilRoot>
    </main>
  );
}

export default App;
