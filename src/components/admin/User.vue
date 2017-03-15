<template>
<div>
    <div class="row">
        <div class="col-md-4 col-md-offset-4">
            <div class="alert alert-danger" role="alert" v-show="error"><strong>Error</strong> the user wasn't registered</div>
            <div class="alert alert-success" role="alert" v-show="success"><strong>Success</strong> the user was registered</div>
        </div>
    </div>
  <div class="row">
    <div class="col-md-6">
      <div class="panel panel-primary">
        <div class="panel-heading">
          <h3 class="panel-title">Add user</h3>
        </div>
        <div class="panel-body">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" class="form-control" id="username" placeholder="Username" v-model="user.username">
          </div>
          <div class="form-group">
            <label for="username">Email</label>
            <input type="text" class="form-control" id="username" placeholder="Email" v-model="user.email">
          </div>
          <div class="form-group">
            <label for="username">First Name</label>
            <input type="text" class="form-control" id="username" placeholder="FirstName" v-model="user.firstName">
          </div>
          <div class="form-group">
            <label for="username">Last Name</label>
            <input type="text" class="form-control" id="username" placeholder="LastName" v-model="user.lastName">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Password" v-model="user.password">
          </div>
          <div class="form-group">
            <label class=" control-label" for="selectbasic">Role</label>
            <select id="selectbasic" name="selectbasic" class="form-control" v-model="user.role">
                <option value="Doctor">Doctor</option>
                <option value="Patient">Patient</option>
                <option value="Admin">Admin</option>
              </select>
          </div>
          <a class="btn btn-primary" @click="send">Submit</a>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="list-group" v-for="us in users">
          <a class="list-group-item active">{{us._id}}</a>
          <a class="list-group-item"><strong>Username : </strong>{{us.username}}</a>
          <a class="list-group-item"><strong>Email : </strong>{{us.email}}</a>
          <a class="list-group-item"><strong>FirstName : </strong>{{us.firstName}}</a>
          <a class="list-group-item"><strong>LastName : </strong>{{us.lastName}}</a>
          <a class="list-group-item"><strong>Role : </strong>{{us.role}}</a>
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
      user: {
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        role: '',
      },
      users: [],
      success: false,
      error: false
    }
  },
  apollo: {
    users: {
      query: gql `
            query Users{users {
                _id
                username
                email
                firstName
                lastName
                role
            }}`
    }
  },
  methods: {
    send() {
        const un = this.user.username
        const em = this.user.email
        const ps = this.user.password
        const fn = this.user.firstName
        const ln = this.user.lastName
        const rl = this.user.role
        this.$apollo.mutate({
            mutation: gql`
            mutation ($un: String!, $em: String!,$ps: String!, $fn: String!, $ln: String!, $rl: String!){
              addUser(data:{username:$un, email:$em, firstName:$fn, lastName: $ln, password:$ps, role:$rl})

            }`,
            variables: {
                    un,
                    em,
                    ps,
                    fn,
                    ln,
                    rl
                }
        }).then((response) => {
            if (response.data.addUser) {
                this.success = true
                var length = this.users.length
                this.users[length] = this.user
            }
            else {
                this.error = true
            }
        }).catch((error) => {
            console.error(error);
        })
    }
  }
}
</script>

<style lang="css">
</style>
