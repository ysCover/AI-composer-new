import React, {Component} from 'react';

class SignupForm extends Component {
    // 绑定数据
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: ''
        }
    }

    // uername 改变事件
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    //提交事件
    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
    }

    render() {
        return (
            <form onSubmit={ this.onSubmit } autocomplete="off">
                <h3>AI composer 注册</h3>

                <div className="form-group">
                    <label className="control-label">用户名</label>
                    <input
                        value={ this.state.username }
                        onChange={ this.onChange }
                        type="text"
                        name="username"
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label className="control-label">邮箱</label>
                    <input
                        value={ this.state.email }
                        onChange={ this.onChange }
                        type="email"
                        name="email"
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label className="control-label">密码</label>
                    <input
                        value={ this.state.password }
                        onChange={ this.onChange }
                        type="password"
                        name="password"
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label className="control-label">密码确认</label>
                    <input
                        value={ this.state.passwordConfirmation }
                        onChange={ this.onChange }
                        type="password"
                        name="passwordConfirmation"
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <button className="btn btn-primary btn-lg ">
                        注册
                    </button>
                </div>
            </form>
        );
    }
}

export default SignupForm