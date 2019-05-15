
/*
* 入口
* */
import React from 'react';
import ReactDOM from 'react-dom';
//引入app组件
import App from './App';
import memoryUtils from './uitls/memoryUtils';
import localStoreUtils from './uitls/localStoreUtils';

// 读取local中保存user, 保存到内存中
const user = localStoreUtils.getUser();
memoryUtils.user = user;

ReactDOM.render(<App/>,document.getElementById('root'));