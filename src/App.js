import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Album from './pages/Album';
import Login from './pages/Login';
import Search from './pages/Search';
import Favorites from './pages/Favorites';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" component={ Login } />
        <Route path="/search" component={ Search } />
        <Route path="/album/:id" component={ Album } />
        <Route path="/favorites" component={ Favorites } />
      </BrowserRouter>
    );
  }
}

export default App;
