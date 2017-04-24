import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import Navbar from './components/navbar';
import NotFound from './components/not-found';
import TheatersContainer from './containers/theaters-container';
import Top250Container from './containers/top250-container';
import SearchContainer from './containers/search-container';
import FavoritesContainer from './containers/favorites-container';
import './App.css';

class App extends Component {
    render() {
        return (
            <ConnectedRouter history={this.props.history}>
                <div className='App'>
                    <Switch>
                        <Route exact path='/' component={TheatersContainer} />
                        <Route path='/top250' component={Top250Container} />
                        <Route path='/search/:keyword?' component={SearchContainer} />
                        <Route path='/favorites' component={FavoritesContainer} />
                        <Route component={NotFound} />
                    </Switch>
                    <Navbar />
                </div>
            </ConnectedRouter>
        );
    };
}

export default App;