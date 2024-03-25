import { ThemeProvider } from '@emotion/react';
import React from 'react';
import Theme from './styles/Theme';
import GlobalStyle from './styles/GlobalStyle';
import SignUp from './pages/SignUp';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
