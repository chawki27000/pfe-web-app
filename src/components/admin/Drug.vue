<template>
<div>
  <div class="row">
    <div class="col-md-4 col-md-offset-4">
      <div class="alert alert-danger" role="alert" v-show="error"><strong>Error</strong> the user wasn't registered</div>
      <div class="alert alert-success" role="alert" v-show="success"><strong>Success</strong> the user was registered. <br>id: {{id_success}}</div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-6">
      <div class="panel panel-primary">
        <div class="panel-heading">
          <h3 class="panel-title">Add Drug</h3>
        </div>

        <div class="panel-body">
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
            <select  name="selectbasic" class="form-control" v-model="drug.format">
                <option value="pilule">pilule</option>
                <option value="gelule">gelule</option>
              </select>
          </div>

          <div class="form-group">
            <label for="username">Masse</label>
            <input type="number" class="form-control" placeholder="Masse" v-model="drug.masse">
          </div>

          <a class="btn btn-primary" @click="send">Submit</a>

        </div>
      </div>
    </div>

    <div class="col-md-6">
      <div class="list-group" v-for="d in drugs">
        <a class="list-group-item active">{{d._id}}</a>
        <a class="list-group-item"><strong>Name : </strong>{{d.name}}</a>
        <a class="list-group-item"><strong>Category : </strong>{{d.category}}</a>
        <a class="list-group-item"><strong>Format : </strong>{{d.format}}</a>
        <a class="list-group-item"><strong>Masse : </strong>{{d.masse}}</a>
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
