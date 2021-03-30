import Vue from 'vue';
import Button from 'ant-design-vue/lib/button';
import Input from 'ant-design-vue/lib/input';
import Form from 'ant-design-vue/lib/form';
import Modal from 'ant-design-vue/lib/modal';
import Message from 'ant-design-vue/lib/message';
import 'ant-design-vue/dist/antd.css';
import App from './App';
import axios from 'axios'

Vue.prototype.$axios= axios
Vue.prototype.$message= Message

Vue.use(Button);
Vue.use(Input);
Vue.use(Form);
Vue.use(Modal);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');