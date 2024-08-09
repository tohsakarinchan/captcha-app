<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <el-form ref="formRef" class="form" :model="formLogin" :rules="formLoginRules">
    <el-form-item prop="username">
      用户名：<el-input type="text" v-model="formLogin.username"/>
    </el-form-item>
    <el-form-item prop="password">
      密码：<el-input type="password" v-model="formLogin.password" @keyup.enter="login"/>
    </el-form-item>
  </el-form>
  <a href="javascript:" @click="login">登录</a>
  <div class="authBoxModal" v-if="showAuthBox">
    <div class="authBox">
      <CaptchaComponent @captcha-success="onCaptchaSuccess"/>
    </div>
  </div>
</template>

<script>
import { reactive, ref, nextTick } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import 'element-plus/es/components/message/style/css';
import CaptchaComponent from './CaptchaComponent.vue';
import CryptoJS from 'crypto-js';
import router from '@/router';

export default {
  components: {
    CaptchaComponent
  },
  setup() {
    const formLogin = reactive({
      username: '',
      password: ''
    });
    const formLoginRules = reactive({
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
      ]
    });
    const showAuthBox = ref(false);
    const formRef = ref();

    const checkAuth = () => {
      showAuthBox.value = true;
    };

    const login = async () => {
      await nextTick();
      formRef.value.validate(valid => {
        if (valid) {
          checkAuth();
        } else {
          console.log('error submit!!');
          ElMessage.error('请填写完整的登录信息');
          return false;
        }
      });
    };

    const onCaptchaSuccess = async () => {
      console.log('Captcha verified successfully');
      showAuthBox.value = false;
      try {
          const response = await axios.post('/login', {
              userName: formLogin.username,
              userPassword: CryptoJS.MD5(formLogin.password).toString()
          });
          if (response.status === 200) {
              const token = response.data.token;
              localStorage.setItem('token', token);
              ElMessage.success('Login successful');
              router.push('/menu');
              // 处理登录成功逻辑
          } else {
              ElMessage.error('Login failed');
              // 处理登录失败逻辑
          }
      } catch (error) {
          console.error('Login request failed:', error);
          ElMessage.error('Login request failed, your username or password may be wrong');
      }
    };

    return {
      formLogin,
      formLoginRules,
      showAuthBox,
      formRef,
      checkAuth,
      login,
      onCaptchaSuccess
    };
  }
}
</script>

<style scoped>
.form {
  margin-bottom: 20px;
}
.authBoxModal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.authBox {
  background: #fff;
  padding: 20px;
  border-radius: 5px;
}
</style>
