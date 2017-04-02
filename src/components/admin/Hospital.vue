<template>
<div>

  <div class="row">
    <div class="col-md-4 col-md-offset-4">
      <div class="alert alert-danger" role="alert" v-show="error"><strong>Error</strong> the hospital wasn't registered</div>
      <div class="alert alert-success" role="alert" v-show="success"><strong>Success</strong> the hospital was registered.<br> id: {{id_success}}</div>
    </div>
  </div>

  <div class="row row-btn">
    <a class="btn-add" data-toggle="modal" data-target="#myModal"><i class="ion-plus"></i>Add Hospital</a>
  </div>

  <div class="row">

    <table class="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>lat</th>
          <th>lon</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="h in hospitals" :key="h._id">
          <td>{{h.name}}</td>
          <td>{{h.address}}</td>
          <td>{{h.coordinates.lat}}</td>
          <td>{{h.coordinates.lon}}</td>
          <td><a @click="remove(h._id)"><i class="ion-minus-circled"></i></a></td>
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
          <h4 class="modal-title" id="myModalLabel">Add Hospital</h4>
        </div>
        <div class="modal-body">
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
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" data-dismiss="modal" @click="send">Submit</button>
        </div>
      </div>
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
    addArray(obj) {
      this.hospitals.splice(this.hospitals.length, 0, obj)
    },
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
          // add in local array
          this.addArray({
              _id: response.data.addHospital._id,
              name: name,
              address: ad,
              coordinates: {
                  lat: lat,
                  lon: lon
              }
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
            removeHospital(
              id: $id
            )
        }`,
        variables: {
          id
        }
      }).then((response) => {
        if (response.data.removeHospital) {
          console.log("VRAI");
          this.hospitals = this.hospitals.filter(function(obj) {
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
</style>
