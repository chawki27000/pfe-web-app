<template lang="html">
  <div>
      <div class="row row1" v-if="next == 0">
          <h3>Information préliminaire</h3>
              <form class="form-horizontal">
                  <div class="form-group">
                      <label class="col-md-4 control-label" for="age">Age of child</label>
                      <div class="col-md-2">
                          <input id="age" name="age" type="number" placeholder="Age" class="form-control input-md" required="true" v-model.number="age">
                      </div>
                      <div class="col-md-2">
                          <select class="form-control" v-model="types">
                              <option value="mounth">mounth</option>
                              <option value="years">years</option>
                          </select>
                      </div>
                  </div>

                  <div class="form-group">
                      <label class="col-md-4 control-label" for="weight">Weight of child</label>
                      <div class="col-md-2">
                          <input id="weight" name="weight" type="number" placeholder="weight" class="form-control input-md" required="" v-model.number="weight">

                      </div>
                  </div>


                  <div class="form-group">
                      <label class="col-md-4 control-label" for="selectbasic">Gender of child</label>
                      <div class="col-md-4">
                          <select id="selectbasic" name="selectbasic" class="form-control" v-model="gender">
                        <option value="Mal">Mal</option>
                        <option value="Female">Female</option>
                      </select>
                      </div>
                  </div>
              </form>

              <div class="row">
                  <div class="col-md-12">
                      <a class="btn-next" @click="send">Next<i class="ion-arrow-right-a"></i></a>
                  </div>
              </div>

      </div>

      <div class="row">
          <a><i class="ion-ios-arrow-back"></i></a>
          <a><i class="ion-ios-arrow-forward"></i></a>
      </div>

      <div class="row row1" v-if="next == 1">
          <hemodynamic></hemodynamic>
      </div>

      <div class="row row1" v-if="next == 2">
          <pulmonaire></pulmonaire>
      </div>

      <div class="row row1" v-if="next == 3">
          <neurological></neurological>
      </div>

      <div class="row row1" v-if="next == 4">
          <result></result>
      </div>

          <!-- <div class="col-md-2 col-md-offset-5">
              <a class="btn btn-success" @click="send" data-toggle="modal" data-target="#myModal">Next <span class="glyphicon glyphicon-arrow-right"></span></a>
          </div> -->

  </div>
</template>

<script>
import gql from 'graphql-tag';
import hemodynamic from '../doctor/instable/Hemodynamic'
import pulmonaire from '../doctor/instable/Pulmonaire'
import neurological from '../doctor/instable/Neurological'
import result from '../doctor/instable/Result'
export default {
  components: {
    hemodynamic,
    pulmonaire,
    neurological,
    result
  },
  data() {
    return {
      age: 0,
      types: "years",
      weight: 0,
      gender: 'Mal',
      // behavior variables
      next: 0
    }
  },

  methods: {
    send() {
      const ag = this.age
      const ty = this.types
      const wi = this.weight
      const ge = this.gender

      this.$apollo.mutate({
        mutation: gql `
            mutation($ag: Int!, $ty: String!,$wi: Float!, $ge: String!){
              addChild(data:{age:{num: $ag, types: $ty}, weight: $wi, gender: $ge}){
                _id
                age {
                  num
                  types
                }
                createdAt
              }
          }`,
        variables: {
          ag,
          ty,
          wi,
          ge
        }
      }).then((response) => {
        if (response.data.addChild._id) {
          // Sava data in localStorage
          localStorage.setItem('child_id', response.data.addChild._id)
          localStorage.setItem('child_data', JSON.stringify({
              age: this.age,
              types: this.types,
              weight: this.weight,
              gender: this.gender,
              time: response.data.addChild.createdAt
          }))
          // Increment
          this.next++
        }
      }).catch((error) => {
        console.error(error);
      })
    }
  }

}
</script>

<style lang="css">

.row1 {
    margin-top: 7%
}
.row2 {
    margin-top: 3%
}

.btn-choice:hover,
.btn-choice:active {
    text-decoration: none !important;
    background: #f6f7f9;
    color: #fff;
}

h3 {
    text-align: center;
    margin: 20px;
}

.btn-next,
.btn-next:link,
.btn-next:visited {
    display: block;
    text-align: center;
    padding: 12px 0;
    border: 2px solid #4F8EF7;
    border-radius: 2px;
    background-color: white;
    text-decoration: none;
    width: 15%;
    margin: 15px auto;
    color: #4F8EF7;
    font-size: 140%;

}

.btn-next i {
    margin-left: 10px;
    font-size: 120%;
    vertical-align: middle;
}

.btn-next:hover,
.btn-next:active {
    text-decoration: none;
    background: #4F8EF7;
    color: white;
}

</style>
