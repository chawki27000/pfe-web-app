
<template lang="html">

  <div>
      <div class="row">
          <div class="col-md-6 col-md-offset-3">

            <div class="list-group" v-for="child in childs">
                <a class="list-group-item active">{{child._id}}</a>
                <a class="list-group-item"><strong>Weight : </strong>{{child.weight}}</a>
                <a class="list-group-item"><strong>Mother's school level : </strong>{{child.school_mother}}</a>
                <a class="list-group-item"><strong>Father's school level : </strong>{{child.school_father}}</a>
                <a class="list-group-item"><strong>Address : </strong>{{child.address_parent}}</a>
          </div>
          </div>

      </div>
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
