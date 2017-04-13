<template lang="html">

    <div id="wrapper">

        <!-- Navigation -->
        <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#/dash">Alpha Project</a>
            </div>
            <!-- Top Menu Items -->
            <ul class="nav navbar-right top-nav">

                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-user"></i> {{user[0].firstName}} {{user[0].lastName}} <b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <li>
                            <router-link :to="{name: 'Information'}"><i class="ion-person"></i> Profile</router-link>
                        </li>

                        <li class="divider"></li>
                        <li>
                            <a @click="logout" href=""><i class="ion-power"></i> Log Out</a>
                        </li>
                    </ul>
                </li>
            </ul>
            <!-- Sidebar Menu Items - These collapse to the responsive navigation menu on small screens -->
            <div class="collapse navbar-collapse navbar-ex1-collapse">
                <ul class="nav navbar-nav side-nav">
                    <!-- Doctor Feature -->
                    <li v-if="user[0].role== 'Doctor'">
                        <a href="#/clinical"><i class="ion-ios-pulse-strong"></i>Clinical</a>
                    </li>
                    <li v-if="user[0].role== 'Doctor'">
                        <a href="#/case"><i class="ion-medkit"></i> Case</a>
                    </li>
                    <!-- Admin Feature -->
                    <li v-if="user[0].role == 'Admin'">
                        <a href="#/user"><i class="ion-person"></i> User</a>
                    </li>
                    <li v-if="user[0].role == 'Admin'">
                        <a href="#/hospital"><i class="ion-ios-medkit"></i> Hospital</a>
                    </li>
                    <li v-if="user[0].role == 'Admin'">
                        <a href="#/drug"><i class="ion-ios-flask"></i> Drug</a>
                    </li>

                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </nav>

        <div id="page-wrapper">
            <div class="container-fluid">
                <router-view></router-view>
            </div>
        </div>


    </div>
    <!-- /#wrapper -->

</template>

<script>
import gql from 'graphql-tag';
import store from '../store/store'
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
      query: gql `
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
      localStorage.clear()
      this.$router.push({
        path: '/',
        params: {
          logout: true
        }
      })
    }
  }

}
</script>

<style lang="css">
.navbar {
    box-shadow: 2px 2px 6px grey;
    background-color: #f5f5f5;
    border-color: transparent;
}
.side-nav {
    box-shadow: 4px 2px 10px grey;
}

.side-nav li a:hover,
.side-nav li a:active{
    background-color: #111 !important;
    color: white !important;
}

.side-nav li a:link,
.side-nav li a:visited{
    background-color: #222 !important;
    color: white !important;
}

#page-wrapper {
    margin-top: 60px;
}

</style>
