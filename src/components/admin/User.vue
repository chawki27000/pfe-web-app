<template>
<div>
  <div class="row">
    <div class="col-md-4 col-md-offset-4">
      <div class="alert alert-danger" role="alert" v-show="error"><strong>Error</strong> the user wasn't registered</div>
      <div class="alert alert-success" role="alert" v-show="success"><strong>Success</strong> the user was registered.<br> id: {{id_success}}</div>
    </div>
  </div>

  <div class="row row-btn">
    <a class="btn-add" data-toggle="modal" data-target="#myModal"><i class="ion-person-add"></i>Add User</a>
  </div>

  <div class="row">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>FirstName</th>
          <th>LastName</th>
          <th>Role</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="us in users" :key="us._id">
          <td>{{us.username}}</td>
          <td>{{us.email}}</td>
          <td>{{us.firstName}}</td>
          <td>{{us.lastName}}</td>
          <td>{{us.role}}</td>
          <td><a @click="remove(us._id)"><i class="ion-minus-circled"></i></a></td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- MODAL DECLARATION -->

  <!-- Modal -->
  <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="myModalLabel">Add User</h4>
        </div>
        <div class="modal-body">
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
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" data-dismiss="modal" @click="send">Submit</button>
        </div>
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
    addArray(obj) {
      this.users.splice(this.users.length, 0, obj)
    },
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
          // add in local array
          this.addArray({
            _id: response.data.addUser._id,
            username: un,
            email: em,
            firstName: fn,
            lastName: ln,
            role: rl
          })
        } else {
          this.error = true
        }
      }).catch((error) => {
        console.error(error);
      })
    },
    remove(id) {
      this.$apollo.mutate({
        mutation: gql `
          mutation ($id: String!){
            removeUser(
              id: $id
            )
        }`,
        variables: {
          id
        }
      }).then((response) => {
        if (response.data.removeUser) {
          console.log("VRAI");
          this.users = this.users.filter(function(obj) {
            return obj._id !== id
          })
        }
      }).catch((error) => {
        console.log("FAUX");
      })
    }
  }
}
</script>

<style lang="css">

.btn-add,
.btn-add:link,
.btn-add:visited {
    text-decoration: none;
    border: 1px solid #3498db;
    padding: 30px;
    font-size: 120%;
    border-radius: 3px;
    background-color: #3498db;
    color: #fff;
    transition: background-color 0.2s;
}
.btn-add:hover,
.btn-add:active {
  text-decoration: none;
  color: #fff;
  background-color: #2487c9;
}

.row-btn {
    margin-top: 20px;
    margin-bottom: 50px;
    width: 100%;
    text-align:center;
}


tr td a,
tr td a:link,
tr td a:visited {
    text-decoration: none;
    font-size: 140%;
    color: #f44336;
    transition: color 0.2s;
}

tr td a:hover,
tr td a:active {
    text-decoration: none;
    color: #ca180b;
}

</style>
