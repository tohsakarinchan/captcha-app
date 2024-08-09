<!-- eslint-disable vue/multi-word-component-names -->
<!-- Menu.vue -->
<template>
  <div>
    <h1>Menu Page</h1>
    <button @click="getProtectedData">Get Protected Data</button>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    const getProtectedData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Token is missing, please login again.');
        router.push('/login'); // Redirect to login page
        return;
      }

      try {
        const response = await axios.get('/api/protected', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('Protected data:', response.data);
        
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert('Session expired, please login again.');
          localStorage.removeItem('token');
          router.push('/login'); // Redirect to login page
        } else {
          console.error('Failed to get protected data:', error);
        }
      }
    };

    return {
      getProtectedData
    };
  }
}
</script>
