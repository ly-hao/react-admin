

import axios from 'axios';
import {message} from 'antd';

export default function ajax(url, data={}, type='GET') {

  return new Promise((resolve, reject) => {
    let promise;
    if (type === 'GET') {
      promise = axios.get(url,{ // 配置对象
        params: data // 指定请求参数
      });
    }else {
      promise = axios.post(url,data);
    }

    //如果成功了，调用resolve(value)
    promise.then(response =>{
      resolve(response.data);
      // 如果失败了, 不调用reject(reason), 而是提示异常信息
    }).catch(error => {
      message.error('请求出错了： '+error.message);
    })


  });

}