import React, { Component } from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

class Navbar extends Component {
    render () {
        return (
            <Menu fixed="bottom" icon='labeled' inverted widths={4}>
                <Menu.Item exact as={NavLink} to='/' name='theaters' color='blue' link>
                    <Icon name='film' />
                    正在上映
                </Menu.Item>

                <Menu.Item as={NavLink} to='/top250' name='top250' color='blue' link>
                    <Icon name='list' />
                    高分榜单
                </Menu.Item>

                <Menu.Item as={NavLink} to='/search' name='search' color='blue' link>
                    <Icon name='search' />
                    电影搜索
                </Menu.Item>

                <Menu.Item as={NavLink} to='/favorites' name='favorites' color='blue' link>
                    <Icon name='star' />
                    我的收藏
                </Menu.Item>
            </Menu>
        );
    };
}

export default Navbar;