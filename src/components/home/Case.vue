
<template lang="html">

<div>
<table class="table table-striped">
    <thead>
      <tr>
        <th>Age</th>
        <th>Weight</th>
        <th>Gender</th>
        <th>Detail</th>
      </tr>
    </thead>
    <tbody>
            <tr v-for="child in childs" :key="child._id">

              <td>{{child.age.num}} {{child.age.types}}</td>
              <td>{{child.weight}}</td>
              <td>{{child.gender}}</td>
              <td><a @click="detail(child._id)"><i class="ion-ios-pulse-strong"></i></a></td>
            </tr>
    </tbody>
  </table>

  <hemodynamic></hemodynamic>
  <pulomonaire></pulomonaire>

</div>

</template>

<script>
import gql from 'graphql-tag';
import store from '../../store/store'

export default {

  data() {
    return {
      token: localStorage.getItem('token'),
      username: localStorage.getItem('username'),
      childs: []
    }
  },
  mounted() {
      var resource = this.$resource('child/all')
      resource.get().then(response => {
          console.log(response.body.data);
          this.childs = response.body.data
      })
  },

  methods: {
    detail(id) {
      // Save child_id in localStorage
      localStorage.setItem('detail_id', id)

      // Redirect
      this.$router.push('/child')
    }
  }

}
</script>

<style lang="css">

</style>
