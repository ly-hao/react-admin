import React,{ Component } from 'react';
import { Redirect } from 'react-router-dom';

import memoryUtils from '../../uitls/memoryUtils';
/*暴露模块*/
export default class Admin extends Component{
  render() {
    const user = memoryUtils.user;
    if (!user || !user._id) {
      return <Redirect to= '/login' />
    }
    return <div>
      hello {user.username}
    </div>
  }
}