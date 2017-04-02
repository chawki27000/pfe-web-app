<template>
<div>
  <div class="row">
    <div class="col-md-4 col-md-offset-4">
      <div class="alert alert-danger" role="alert" v-show="error"><strong>Error</strong> the user wasn't registered</div>
      <div class="alert alert-success" role="alert" v-show="success"><strong>Success</strong>it's  was registered. <br>id: {{id_success}}</div>
    </div>
  </div>

  <div class="row row-btn">
    <a class="btn-add" data-toggle="modal" data-target="#myModal"><i class="ion-plus"></i>Add Drug</a>
  </div>

  <div class="row">

    <table class="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Format</th>
          <th>Masse</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="d in drugs" :key="d._id">
          <td>{{d.name}}</td>
          <td>{{d.category}}</td>
          <td>{{d.format}}</td>
          <td>{{d.masse}}</td>
          <td><a @click="remove(d._id)"><i class="ion-minus-circled"></i></a></td>
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
          <h4 class="modal-title" id="myModalLabel">Add Drug</h4>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="username">Name</label>
            <input type="text" class="form-control" placeholder="Name" v-model="drug.name">
          </div>
          <div class="form-group">
            <label for="username">Category</label>
            <input type="text" class="form-control" placeholder="Category" v-model="drug.category">
          </div>
          <div class="form-group">
            <label class="control-label" for="selectbasic">Format</label>
            <select name="selectbasic" class="form-control" v-model="drug.format">
                  <option value="pilule">pilule</option>
                  <option value="gelule">gelule</option>
                </select>
          </div>

          <div class="form-group">
            <label for="username">Masse</label>
            <input type="number" class="form-control" placeholder="Masse" v-model="drug.masse">
          </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary"  data-dismiss="modal"@click="send">Submit</button>
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
      drug: {
        name: '',
        category: '',
        format: '',
        masse: 0,
      },
      drugs: [],
      error: false,
      success: false,
      id_success: ''
    }
  },
  apollo: {
    drugs: {
      query: gql `
            query Drugs{drugs {
              _id
              category
              name
              format
              masse
            }}`
    }
  },
  methods: {
    send() {
      const nm = this.drug.name
      const categ = this.drug.category
      const fm = this.drug.format
      const ms = this.drug.masse
      this.$apollo.mutate({
        mutation: gql `
        mutation ($nm: String!, $categ: String!, $fm: String!, $ms: Int!) {
          addDrug(data: {name: $nm, category: $categ, format: $fm, masse: $ms}){
            _id
          }
        }`,
        variables: {
          nm,
          categ,
          fm,
          ms
        }
      }).then((response) => {
        if (response.data.addDrug._id) {
          this.success = true
          this.id_success = response.data.addDrug._id
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
          removeDrug(
            id: $id
          )
      }`,
        variables: {
          id
        }
      }).then((response) => {
        if (response.data.removeDrug) {
          console.log("VRAI");
          this.drugs = this.drugs.filter(function(obj) {
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
