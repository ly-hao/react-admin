import React,{ Component } from 'react';
import {Redirect} from 'react-router-dom';
import { Form, Icon, Input, Button, message } from 'antd';

import './login.less';
import logo from './images/logo.png';
import { reqLogin } from '../../api/ajax';
//存储数据
import memoryUtils from '../../uitls/memoryUtils';
import localStoreUtils from '../../uitls/localStoreUtils';

/*暴露模块*/
class Login extends Component{
  //对表单进行验证
  handleSubmit = (ev) => {
    //取消默认行为
    ev.preventDefault();
    //用户和密码统一验证
    /*
    * 使用async和await 更好的处理promiseduixiang
    * */
    this.props.form.validateFields(async (err, values) => {
      //校验成功
      if (!err) {
        //请求登录
        const {username,password} = values;
        /*
        * 获取请求返回的结果数据
        * */
        const result = await reqLogin(username,password);
        //判断请求成功 登录成功/失败
        if (result.status === 0){
          message.success('登录成功！');

         //保存user
          const user = result.data;
          memoryUtils.user = user;
          localStoreUtils.saveUser(user);

          //  跳转到管理首页
          this.props.history.replace('/');
        }else {
        //  登录失败 提示错误信息
          message.error(result.msg);
        }
      }else{
        console.log('登录失败！');
      }
    });
  };

  render() {
    // 如果用户已经登陆, 自动跳转到管理界面
    const user = memoryUtils.user;
    if (user && user._id) {
      return <Redirect to='/'/>
    }

    /*const form = this.props.form;*/
    const { getFieldDecorator } = this.props.form;
    return <div className="login">
      <header className="login-header">
        <img src= {logo} alt="logo"/>
        <h1>React项目: 后台管理系统</h1>
      </header>
      <section className= "login-content">
        <h2>用户登录</h2>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [
                { required: true, message: '请输入用户名！' },
                { min: 3, message: '输入的用户名不能小于3位字符！' },
                { max: 11, message: '输入的用户名不能大于12位字符!' },
                { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
                ],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="用户名"
              />,
            )}

          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: '请输入密码!' },
                { min: 5, message: '输入的密码不能小于6位字符！' },
                { max: 12, message: '输入的密码不能大于12位字符!' },
                { pattern: /^[a-zA-Z0-9_]+$/, message: '密码必须是英文、数字或下划线组成' },

                ],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="密码"
              />,
            )}

          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  }
}
const WrapLogin = Form.create()(Login);
export default WrapLogin;