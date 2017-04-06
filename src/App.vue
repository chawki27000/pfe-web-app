<template>
  <div id="app">
          <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    margin: 0;
}

html {
    height: 100%;
    background-color: #fff;
    color: #555;
    font-family: 'Lato', 'Arial', sans-serif;
    font-weight: 400;
    font-size: 15px;
    text-rendering: optimizeLegibility;
}

html * {
    font-family: 'Lato', 'Arial', sans-serif;
    font-weight: 400;
    text-rendering: optimizeLegibility;
}
</style>
