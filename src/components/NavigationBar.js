import React, { Component } from 'react';

import { Link } from 'react-router-dom'

class NavigationBar extends Component {
    render() {
        return (
            // mb-3 设置与下面模块的距离
            <nav className="navbar navbar-expand-sm navbar-light  mb-4" style={{ height: 55, background: '#E6E6E6'}}>
                <div className="container">
                    <Link className="navbar-brand" to="/">Home</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample03"
                            aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExample03">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/signup">注册</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">登陆</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default NavigationBar;