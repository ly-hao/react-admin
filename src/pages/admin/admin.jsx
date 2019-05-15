import React,{ Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';

import memoryUtils from '../../uitls/memoryUtils';
import LaftNav from '../../components/laftNav';
import Header from '../../components/header';
// import Footer from '../../components/footer';

import Home from '../home/home';
import Category from '../category/category';
import Product from '../product/product';
import Role from '../role/role';
import User from '../user/user';
import Bar from '../charts/bar';
import Line from '../charts/line';
import Pie from '../charts/pie';

//定义元素
const {Sider, Content, Footer} = Layout;

/*暴露模块*/
export default class Admin extends Component{
  render() {
    const user = memoryUtils.user;
    if (!user || !user._id) {
      return <Redirect to= '/login' />
    }
    return (
      <Layout style={{minHeight: '100%'}}>
        <Sider>
          <LaftNav />
        </Sider>
        <Layout>
          <Header/>
          <Content style={{background: '#aaaaaa'}}>
            <Switch>
              <Route path='/home' component={Home}/>
              <Route path='/category' component={Category}/>
              <Route path='/product' component={Product}/>
              <Route path='/user' component={User}/>
              <Route path='/role' component={Role}/>
              <Route path="/charts/bar" component={Bar}/>
              <Route path="/charts/pie" component={Pie}/>
              <Route path="/charts/line" component={Line}/>
              <Redirect to='/home'/>
            </Switch>
          </Content>
          <Footer style={{textAlign:'center',color:'#aaa'}}>
            推荐使用谷歌浏览器，可以获得更佳页面操作体验
          </Footer>
        </Layout>
      </Layout>
        )
  }
}