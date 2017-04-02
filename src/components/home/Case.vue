
<template lang="html">

<div>
<table class="table table-striped">
    <thead>
      <tr>
        <th>Age</th>
        <th>Weight</th>
        <th>Mother's school level</th>
        <th>Father's school level</th>
      </tr>
    </thead>
    <tbody>
            <tr v-for="child in childs" :key="child._id">
              <td>{{child.age.num}} {{child.age.types}}</td>
              <td>{{child.weight}}</td>
              <td>{{child.school_mother}}</td>
              <td>{{child.school_father}}</td>
            </tr>
    </tbody>
  </table>
</div>

</template>




<script>
import gql from 'graphql-tag';
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
