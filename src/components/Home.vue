<template lang="html">
    <div>

        <nav class="navbar navbar-inverse">
            <div class="container-fluid">
                <div class="navbar-header">
                  <router-link class="navbar-brand" :to="{name: 'Home'}">Alpha Project</router-link>
                </div>

                <ul class="nav navbar-nav">
                    <!-- Doctor feature -->
                  <li class="active"> <router-link :to="{name: 'Information'}">Information</router-link> </li>
                      <li v-if="user[0].role== 'Doctor'"> <router-link :to="{name: 'Clinical'}">Clinical</router-link> </li>
                      <li v-if="user[0].role== 'Doctor'"> <router-link :to="{name: 'Case'}">Case</router-link> </li>

                      <!-- Admin feature -->
                      <li v-if="user[0].role == 'Admin'"> <router-link :to="{name: 'User'}">User</router-link> </li>
                      <li v-if="user[0].role == 'Admin'"> <router-link :to="{name: 'Hospital'}">Hospital</router-link> </li>
                      <li v-if="user[0].role == 'Admin'"> <router-link :to="{name: 'Drug'}">Drug</router-link> </li>
                </ul>

                <ul class="nav navbar-nav navbar-right">
                  <li> <a @click="logout">Logout</a> </li>
                </ul>
            </div>
        </nav>
        <router-view></router-view>
    </div>
</template>

<script>
import gql from 'graphql-tag';
export default {

  data() {
    return {
      token: localStorage.getItem('token'),
      username: localStorage.getItem('username'),
      user: {},
    }
  },

  apollo: {
    user: {
      query: gql`
          query User($username: String!){
              user(username: $username){
                _id
                email
                firstName
                lastName
                role
            }
        }`,
      variables() {
        return {
          username: this.username
        }
      }
    },
  },

  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({path: '/', params: {logout: true}})
    }
  }

}
</script>

<style lang="css">
</style>
