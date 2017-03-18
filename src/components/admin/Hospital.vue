<template>
<div>

  <div class="row">
    <div class="col-md-4 col-md-offset-4">
      <div class="alert alert-danger" role="alert" v-show="error"><strong>Error</strong> the hospital wasn't registered</div>
      <div class="alert alert-success" role="alert" v-show="success"><strong>Success</strong> the hospital was registered.<br> id: {{id_success}}</div>
    </div>
  </div>

  <div class="row">

    <div class="col-md-6">
      <div class="panel panel-primary">
        <div class="panel-heading">
          <h3 class="panel-title">Add Hospital</h3>
        </div>
        <div class="panel-body">
          <div class="form-group">
            <label for="username">Name</label>
            <input type="text" class="form-control" placeholder="Name" v-model="hospital.name">
          </div>
          <div class="form-group">
            <label for="username">Address</label>
            <input type="text" class="form-control" placeholder="Address" v-model="hospital.address">
          </div>
          <div class="form-group">
            <label for="username">Coordinate (lat)</label>
            <input type="number" class="form-control" placeholder="lat" v-model="hospital.lat">
          </div>
          <div class="form-group">
            <label for="username">Coordinate (lon)</label>
            <input type="number" class="form-control" placeholder="lon" v-model="hospital.lon">
          </div>
          <a class="btn btn-primary" @click="send">Submit</a>
        </div>
      </div>
    </div>

    <div class="col-md-6">
      <div class="list-group" v-for="h in hospitals">
        <a class="list-group-item active">{{h._id}}</a>
        <a class="list-group-item"><strong>Name : </strong>{{h.name}}</a>
        <a class="list-group-item"><strong>Address : </strong>{{h.address}}</a>
        <a class="list-group-item"><strong>lat : </strong>{{h.coordinates.lat}}</a>
        <a class="list-group-item"><strong>lon : </strong>{{h.coordinates.lon}}</a>
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
      hospital: {
        name: '',
        address: '',
        lat: 0,
        lon: 0,
      },
      hospitals: [],
      success: false,
      error: false,
      id_success: ''
    }
  },
  apollo: {
    hospitals: {
      query: gql `
      query Hospitals {
        hospitals {
          _id
          name
          address
          coordinates {
            lat
            lon
          }
        }
      }`
    }
  },
  methods: {
    send() {
      const name = this.hospital.name
      const ad = this.hospital.address
      const lat = this.hospital.lat
      const lon = this.hospital.lon

      this.$apollo.mutate({
        mutation: gql `
        mutation ($name: String!, $ad: String!, $lat: Float!, $lon: Float!) {
          addHospital(data: {name: $name, address: $ad, coordinates: {lat: $lat, lon: $lon}}){
            _id
          }
        }`,
        variables: {
          name,
          ad,
          lat,
          lon
        }
      }).then((response) => {
          if (response.data.addHospital._id) {
              this.success = true
              this.id_success = response.data.addHospital._id
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
