import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" component={ Login } />
      </BrowserRouter>
    );
  }
}

export default App;
