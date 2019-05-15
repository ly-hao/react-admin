import React, {Component} from 'react';
import {Menu, Icon} from 'antd';
import {Link, withRouter} from 'react-router-dom';

import './index.less';
import menuList from '../../configs/menuConfig';
import logo from '../../assets/images/logo.png';

const SubMenu = Menu.SubMenu;

/*
左侧导航
 */
class LeftNav extends Component {

  /*
  返回包含n个<Item>和<SubMenu>的数组
  */
  getMenuNodes = (list) => {

    // 得到当前请求的path
    const path = this.props.location.pathname;

    return list.reduce((pre, item) => {
      if (!item.children) {
        pre.push((
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon}/>
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        ))
      } else {
        pre.push((
          <SubMenu key={item.key} title={<span><Icon type={item.icon}/><span>{item.title}</span></span>}>
            {
              this.getMenuNodes(item.children)
            }
          </SubMenu>
        ));

        if(item.children.find(cItem => path.indexOf(cItem.key)===0)) {
          this.openKey = item.key;
        }
      }
      return pre;
    }, [])
  };

  componentWillMount () {
    this.menuNodes = this.getMenuNodes(menuList);
  }

  render() {

    let selectKey = this.props.location.pathname;
    const {openKey} = this;

    return (
      <div className='left-nav'>

        <Link className='logo-link' to='/'>
          <img src={logo} alt="logo"/>
          <h1>硅谷后台</h1>
        </Link>

        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[selectKey]}
          defaultOpenKeys={[openKey]}
        >
          {
            this.menuNodes
          }
        </Menu>
      </div>
    )
  }
}

export default withRouter(LeftNav);
/*
1. 默认选中当前菜单项
2. 默认展开二级菜单(如果选中是二级菜单项)
 */
