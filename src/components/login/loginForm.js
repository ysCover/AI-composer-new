import React, {Component} from 'react';

class LoginForm extends Component {
    // 绑定数据
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
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
            // autocomplete="off"实现Chrome浏览器取消INPUT自动记忆下拉框
            <form onSubmit={ this.onSubmit } autocomplete="off">
                <h3>用户登陆</h3>

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
                    <button className="btn btn-primary btn-lg ">
                        登陆
                    </button>
                </div>
            </form>
        );
    }
}

export default LoginForm