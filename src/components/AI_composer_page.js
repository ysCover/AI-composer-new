/* eslint-disable */
import React, { Component } from 'react';
import { Select, Button } from 'semantic-ui-react';
import MusicPlayer from './AI-composer_items/ComposerPlayer';
import imgLogo from '../static_files/images/ComposerLogo.JPG'

const StyleOptions = [
    { value: 'Jazz', text: '爵士乐（Jazz）' },
    { value: 'Classic', text: '古典乐（Classic）' },
    { value: 'Rock', text: '摇滚乐（Rock）' },
];
const TimeOptions = [
    { value: '10s-20s', text: '10s - 20s' },
    { value: '20s-40s', text: '20s - 40s' },
    { value: '40s-60s', text: '40s - 60s' },
];
const InstrumentOptions = [
    { value: 'Piano', text: '钢琴（Piano）' },
    { value: 'Guitar', text: '吉他（Guitar）' },
    { value: 'Saxophone', text: '萨克斯（Saxophone）' },
    { value: 'Violin', text: '小提琴(Violin)'},
    { value: 'Flute', text: '长笛(Flute)'}
];
//
// function handleChange(value) {
//   // console.log(`selected ${value}`);
//     this.setState({value: event.target.value});
// }
 /* eslint-disable */
class AI_composer_page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            style_value: StyleOptions[0].value,
            time_value: TimeOptions[0].value,
            instr_value: InstrumentOptions[0].value,
        };

        // this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // handleSubmit =(request)=> {
    //     alert('音乐风格: ' + this.state.style_value + '\n' + '时间: ' + this.state.time_value + '\n' + '乐器: ' + this.state.instr_value);
        // e.preventDefault();
        // const keyword = e.target.keyword.value;
        //
        // 只有当搜索关键字发生改变时才触发
        // if ( keyword !== this.props.keyword ) {
        //     this.props.onKeywordChange(keyword);
        // }

        // var f = document.getElementsByTagName("form")[0];
	    // f.action=f.action+"&process=1";
        //
        // request = new XMLHttpRequest();
        // request.open("POST", 'http://127.0.0.1:5000/composing', true);
        //
        // request.setRequestHeader('content-type', 'application/json');
        // let data = {"style": "1", "time": "2", "instrument": ""};
        // request.send(data);
        //
        // request.onreadystatechange = function () {
        //     if (request.readyState === 4) {
        //
        //         alert(request.responseText);
        //         // let register  = '已生成新的编曲!'+'<span xss=removed>+name+</span>'+'的记录!';
        //         // alert(data);
        //         // alert("已生成新的编曲!")
        //     }
        // };
        // request.send()
    // };

    // 提交表单，实现前后端交互接口(编曲)
    handleSubmit (e) {
        // alert('音乐风格: ' + this.state.style_value + '\n' + '时间: ' + this.state.time_value + '\n' + '乐器: ' + this.state.instr_value);
        e.preventDefault();
        let url = 'http://127.0.0.1:5000/composing';
        fetch(url,{
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                 'content-type': 'application/json'
            }
        }).then((response) => {
            return response.json();
        })
        .then((response) => {
            alert(JSON.stringify(response));
            console.log('Success:', JSON.stringify(response))   // 拿到数据进行页面渲染
        })
        .catch((error) => {
            alert(error);
            console.error('Error:', error);    //出错信息
        });
    };


    render () {
        const { keyword } = this.props;
        const NewRoot = require('./AI-composer_items/ComposerPlayer').default;
        return (
            <div className='composer-div' >
                 {/*<Form className='search-form' onSubmit={this.handleSubmit.bind(this)}>*/}
                     {/*<Form.Input*/}
                         {/*fluid*/}
                         {/*name='keyword'*/}
                         {/*size="large"*/}
                         {/*icon='search'*/}
                         {/*placeholder='搜索音乐'*/}
                         {/*defaultValue={keyword}*/}
                        {/*/>*/}
                 {/*</Form>*/}
                {/*<img src='../static_files/images/ComposerLogo.png' />*/}
                <div className='logo-image-1' >
                    <div className='logo-image-2'>
                        <div className='logo-image-3'>
                            {/*<img src={imgLogo} alt="ComposerLogo" style={{ width: 800, height: 200, margin_left: 40}}/>*/}
                            <img className='logo-image' src={imgLogo} alt="ComposerLogo" />
                        </div>
                    </div>
                </div>

                {/*编曲偏好选项*/}
                <div className='composer-music-select' >
                    <div className="ui vertical header"> 选择编曲风格</div>
                    {/*<Select placeholder='Select your style' options={StyleOptions} defaultValue="Jazz" style={{ width: 250 }} onChange={this.handleChange}/>*/}
                    <Select placeholder='Select your style' options={StyleOptions} defaultValue={this.state.style_value}
                            style={{ width: 250 }} onChange={(e, { value }) => this.state.style_value=value}/>
                    <div className="ui vertical header"> 选择编曲时长</div>
                    <Select placeholder='Select your country' options={TimeOptions} defaultValue={this.state.time_value}
                            style={{ width: 250 }} onChange={(e, { value }) => this.state.time_value=value}/>
                    <div className="ui vertical header"> 选择编曲乐器</div>
                    <Select placeholder='Select your country' options={InstrumentOptions} defaultValue={this.state.instr_value}
                            style={{ width: 250 }} onChange={(e, { value }) => this.state.instr_value=value}/>
                    <div className="ui vertical header"> </div>
                    <Button id='arranging-start' className='composer-button1'
                            onClick={this.handleSubmit}
                    >开始编曲</Button>
                </div>

                <div className='composer-music-player'>
                    <div className='composer-root'>
                        <MusicPlayer {...this.props}/>
                    </div>
                </div>
            </div>
        );
    };
}

export default AI_composer_page;