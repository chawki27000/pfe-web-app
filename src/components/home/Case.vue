
<template lang="html">

<div>
<table class="table table-striped">
    <thead>
      <tr>
        <th>Age</th>
        <th>Weight</th>
        <th>Gender</th>
      </tr>
    </thead>
    <tbody>
            <tr v-for="child in childs" :key="child._id">
              <td>{{child.age.num}} {{child.age.types}}</td>
              <td>{{child.weight}}</td>
              <td>{{child.gender}}</td>
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
      childs: {}
    }
  },

  apollo: {
    childs: {
      query: gql `
            query Childs{
                childs {
                    _id
                    age {
                          num
                          types
                        }
                    weight
                    gender
                    school_mother
                    school_father
                    address_parent
                }
            }`
    },
  }

}
</script>

<style lang="css">

</style>
