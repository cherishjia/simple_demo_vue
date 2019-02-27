
import axios from 'axios';

let config = {
    baseURL:'http://wjjkq.dsjdeve.xbwq.com.cn/dsj_wjjkq_show/api',
    timeout:1000,
};

const _axios = axios.create(config);
export default _axios;