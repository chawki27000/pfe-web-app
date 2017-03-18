<template>
<div>
  <div class="row">
    <div class="col-md-4 col-md-offset-4">
      <div class="alert alert-danger" role="alert" v-show="error"><strong>Error</strong> the user wasn't registered</div>
      <div class="alert alert-success" role="alert" v-show="success"><strong>Success</strong> the user was registered.<br> id: {{id_success}}</div>
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
            <input type="text" class="form-control" placeholder="Username" v-model="user.username">
          </div>
          <div class="form-group">
            <label for="username">Email</label>
            <input type="text" class="form-control" placeholder="Email" v-model="user.email">
          </div>
          <div class="form-group">
            <label for="username">First Name</label>
            <input type="text" class="form-control" placeholder="FirstName" v-model="user.firstName">
          </div>
          <div class="form-group">
            <label for="username">Last Name</label>
            <input type="text" class="form-control" placeholder="LastName" v-model="user.lastName">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" placeholder="Password" v-model="user.password">
          </div>
          <div class="form-group">
            <label class=" control-label" for="selectbasic">Role</label>
            <select name="selectbasic" class="form-control" v-model="user.role">
                <option value="Doctor">Doctor</option>
                <option value="Patient">Patient</option>
                <option value="Admin">Admin</option>
              </select>
          </div>

          <div v-if="user.role=='Doctor'">
            <div class="form-group">
              <label for="password">Speciality</label>
              <input type="text" class="form-control" placeholder="Speciality" v-model="doctor.speciality">
            </div>
            <div class="form-group">
              <label for="password">Service</label>
              <input type="text" class="form-control" placeholder="Service" v-model="doctor.service">
            </div>

            <div class="form-group">
              <label class=" control-label" for="selectbasic">Hospital</label>
              <select name="selectbasic" class="form-control" v-model="doctor.work">
                  <option v-for="h in hospitals" v-bind:value="h._id">{{h.name}}</option>
                </select>
            </div>
          </div>
          <a class="btn btn-primary submit-btn" @click="send">Submit</a>

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
import doctor from './Doctor';

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
      doctor: {
        user: '',
        speciality: '',
        service: '',
        work: ''
      },
      hospitals: [],
      users: [],
      success: false,
      error: false,
      id_success: ''
    }
  },
  components: {
    doctor
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
    },
    hospitals: {
      query: gql `
        query Hospitals {
          hospitals {
            _id
            name
          }
        }`
    }

  },
  methods: {
    sendDoc(usid, spec, serv, work) {
      this.$apollo.mutate({
        mutation: gql `
        mutation ($usid: ID!, $spec: String!, $serv: String!, $work: ID!) {
          addDoctor(data: {user: $usid, speciality: $spec, service: $serv, work: $work}) {
            _id
          }
        }`,
        variables: {
          usid,
          spec,
          serv,
          work
        }
      }).then((response) => {
        // success
      }).catch((error) => {
        // fail
      })
    },
    send() {
      const un = this.user.username
      const em = this.user.email
      const ps = this.user.password
      const fn = this.user.firstName
      const ln = this.user.lastName
      const rl = this.user.role
      this.$apollo.mutate({
        mutation: gql `
        mutation ($un: String!, $em: String!, $ps: String!, $fn: String!, $ln: String!, $rl: String!) {
          addUser(data: {username: $un, email: $em, firstName: $fn, lastName: $ln, password: $ps, role: $rl}) {
            _id
          }
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
        if (response.data.addUser._id) {
          this.success = true
          this.id_success = response.data.addUser._id
          if (this.user.role === 'Doctor') {
              this.sendDoc(response.data.addUser._id, this.doctor.speciality,
              this.doctor.service, this.doctor.work)
          }
        } else {
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
