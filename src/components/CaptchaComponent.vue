<template>
    <div id="app">
      <div id="captcha-div"></div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue"
  import "@/assets/captcha/css/tianai-captcha.css"
  import '@/assets/captcha/js/jquery.min'
  import { initRandomCaptcha } from '@/assets/captcha/js/tianai-captcha'
  
  export default {
    name: 'CaptchaComponent',
    setup() {
      const captcha = ref(null)
  
      onMounted(() => {
        captcha.value = initRandomCaptcha("#captcha-div", {
          genCaptchaUrl: "/gen?type=SLIDER",
          validUrl: "/check",
          validSuccessCallback: (res, c) => {
            console.log("Captcha validation successful", res);
            c.destroyWindow();
          }
        }, {
          btnUrl: require("/src/assets/captcha/images/move-btn.png"),
          bgUrl: require("/src/assets/captcha/images/bg-black.jpg"),
          moveTrackMaskBgColor: "#f7b645",
          moveTrackMaskBorderColor: "#ef9c0d",
          logoUrl: require("/src/assets/captcha/images/logo.png")
        });
        captcha.value.loadCaptcha();
      });
  
      return {
        captcha
      }
    }
  }
  </script>
  
  <style>
  #app {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f0f0f0;
  }
  </style>
  