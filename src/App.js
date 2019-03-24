import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import Navbar from './components/navbar';
import LoginNavbar from './components/NavigationBar';
import NotFound from './components/not-found';
import TheatersContainer from './containers/theaters-container';
import Top250Container from './containers/top250-container';
import SearchContainer from './containers/search-container';
import FavoritesContainer from './containers/favorites-container';
import FooterPlayer from './components/Music_play/Footer'
import './App.css';
// import '../src/components/AI-Composer/player.scss'

// import Footer from '@components/Footer'

// 登陆注册组件
import SignupPage from './components/signup/signupPage'
import LoginPage from './components/login/loginPage'

class App extends Component {
    render() {
        return (
            <ConnectedRouter history={this.props.history}>
                <div className='App'>
                    <LoginNavbar/>
                    <Switch>
                        <Route exact path='/' component={TheatersContainer} />
                        <Route exact path="/signup" component={ SignupPage }/>
                        <Route path="/login" component={ LoginPage }/>
                        <Route path='/top250' component={Top250Container} />
                        <Route path='/search/:keyword?' component={SearchContainer} />
                        <Route path='/favorites' component={FavoritesContainer} />
                        <Route component={NotFound} />
                        <Route path='/playlistinfo' component={ FooterPlayer }/>
                    </Switch>
                    <Navbar />
                </div>
            </ConnectedRouter>
        );
    };
}

export default App;