<template>
    <div class="row row1">
      <div class="col-md-6">
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h3 class="panel-title">Information</h3>
          </div>
          <div class="panel-body">
            <div class="list-group">

              <p class="list-group-item"><strong>First Name : </strong>{{user[0].firstName}}</p>
              <p class="list-group-item"><strong>Last Name : </strong>{{user[0].lastName}}</p>
              <p class="list-group-item"><strong>Email : </strong>{{user[0].email}}</p>
              <p class="list-group-item"><strong>Function : </strong>{{user[0].role}}</p>
            </div>
          </div>

        </div>
      </div>

      <div class="col-md-6">
        <div class="panel panel-success" v-if="user[0].role == 'Doctor'">
          <div class="panel-heading">
            <h3 class="panel-title">About doctor</h3>
          </div>
          <div class="panel-body">
            <div class="list-group">
              <p class="list-group-item"><strong>Speciality : </strong>{{doctor[0].speciality}}</p>
              <p class="list-group-item"><strong>Service : </strong>{{doctor[0].service}}</p>
              <p class="list-group-item"><strong>Hospital name : </strong>{{hospital[0].name}}</p>
              <p class="list-group-item"><strong>Hospital address : </strong>{{hospital[0].address}}</p>
            </div>
          </div>
        </div>
      </div>

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
      user: {},
      doctor: {},
      hospital: {}
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

    doctor: {
      query: gql`
          query Doc($id: String!){
              doctor(id: $id){
                  speciality
                  service
                  work
              }
          }`,
      variables() {
        return {
          id: this.user[0]._id
        }
      }
    },
    hospital: {
      query: gql`
            query Hospital($id: String!){
                hospital(id: $id){
                    name
                    address
                }
            }`,
      variables() {
        return {
          id: this.doctor[0].work
        }
      }
    }
  }

}
</script>

<style lang="css">
</style>
