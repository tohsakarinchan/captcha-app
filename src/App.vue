<template>
  <div id="app">
    <!--
    <nav>
      <router-link to="/">Login</router-link>
      <router-link to="/protected">Protected Page</router-link>
    </nav>
    -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
nav {
  margin-bottom: 10px;
}
nav a {
  margin-right: 10px;
}
</style>
