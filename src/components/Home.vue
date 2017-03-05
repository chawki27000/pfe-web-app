<template lang="html">
  <div >
      <h1>{{token}}</h1>
      <h1>dfgdf</h1>
  </div>
</template>

<script>
export default {

    data () {
        return {
            token: localStorage.getItem('token')
        }
    }

}
</script>

<style lang="css">
</style>
