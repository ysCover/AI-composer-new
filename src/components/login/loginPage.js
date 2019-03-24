import React, {Component} from 'react';
import LoginForm from './loginForm'

class SignupPage extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <LoginForm></LoginForm>
                </div>
                <div className="col-md-3"></div>
            </div>
        );
    }
}

export default SignupPage;