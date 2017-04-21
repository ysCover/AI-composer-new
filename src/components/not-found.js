import React from 'react';
import { Link } from 'react-router-dom';
import { Message, Button } from 'semantic-ui-react';

const NotFound = ({location}) => (
    <div>
        <Message
            icon='frown'
            color='red'
            header='抱歉，未找到您访问的页面'
            content={`请检查您访问的地址(${location.pathname})是否正确！`}
        />
        <Button as={Link} to='/' fluid primary>返回主页</Button>
    </div>
);

export default NotFound;