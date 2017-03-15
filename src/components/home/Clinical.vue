<template lang="html">
  <div>
      <div class="row row1">
          <div class="col-md-6">
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
                      <label class="col-md-4 control-label" for="weight">weight of child</label>
                      <div class="col-md-2">
                          <input id="weight" name="weight" type="number" placeholder="weight" class="form-control input-md" required="" v-model.number="weight">

                      </div>
                  </div>

                  <div class="form-group">
                      <label class="col-md-4 control-label" for="selectbasic">Level of father</label>
                      <div class="col-md-4">
                          <select id="selectbasic" name="selectbasic" class="form-control" v-model="lev_father">
                        <option value="0">Sans scolarité</option>
                        <option value="1">1ere primaire</option>
                        <option value="2">2eme primaire</option>
                        <option value="3">3eme primaire</option>
                        <option value="4">4eme primaire</option>
                        <option value="5">5eme primaire</option>
                        <option value="6">6eme primaire</option>
                        <option value="7">1ere moyen</option>
                        <option value="8">2eme moyen</option>
                        <option value="9">3ere moyen</option>
                        <option value="10">4ere moyen</option>
                        <option value="11">1ere secondaire</option>
                        <option value="12">2eme secondaire</option>
                        <option value="13">3eme secondaire</option>
                        <option value="14">Université</option>
                      </select>
                      </div>
                  </div>

                  <div class="form-group">
                      <label class="col-md-4 control-label" for="Level of mother">Level of mother</label>
                      <div class="col-md-4">
                          <select id="Level of mother" name="Level of mother" class="form-control" v-model="lev_mother">
                        <option value="0">Sans scolarité</option>
                        <option value="1">1ere primaire</option>
                        <option value="2">2eme primaire</option>
                        <option value="3">3eme primaire</option>
                        <option value="4">4eme primaire</option>
                        <option value="5">5eme primaire</option>
                        <option value="6">6eme primaire</option>
                        <option value="7">1ere moyen</option>
                        <option value="8">2eme moyen</option>
                        <option value="9">3ere moyen</option>
                        <option value="10">4ere moyen</option>
                        <option value="11">1ere secondaire</option>
                        <option value="12">2eme secondaire</option>
                        <option value="13">3eme secondaire</option>
                        <option value="14">Université</option>
                      </select>
                      </div>
                  </div>

                  <div class="form-group">
                      <label class="col-md-4 control-label" for="address">Address</label>
                      <div class="col-md-4">
                          <textarea class="form-control" id="address" name="address" v-model="address"></textarea>
                      </div>
                  </div>

              </form>
          </div>

          <div class="col-md-6">
              <ul class="list-group">
                  <li class="list-group-item"><strong>Age : {{age}} {{types}}</strong></li>
                  <li class="list-group-item"><strong>Weight : {{weight}} kg</strong></li>
                  <li class="list-group-item"><strong>Level of Father : {{lev_father}}</strong></li>
                  <li class="list-group-item"><strong>Level of mother : {{lev_mother}}</strong></li>
                  <li class="list-group-item"><strong>Address : {{address}}</strong></li>
            </ul>
          </div>
      </div>

      <div class="row row2">
          <div class="col-md-2 col-md-offset-5">
              <a class="btn btn-success" @click="send">Next <span class="glyphicon glyphicon-arrow-right"></span></a>
          </div>
      </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
export default {
    data () {
        return {
            age: 0,
            types: '',
            weight:0,
            lev_father: '',
            lev_mother: '',
            address: ''
        }
    },
    mounted () {
        this.$child = this.$resource('child/insert')
    },
    methods: {
      send() {
        this.$child.save({
            num: this.age,
            types: this.types,
            weight: this.weight,
            school_mother: this.lev_mother,
            school_father: this.lev_father,
            address_parent: this.address,
        }).then(function (response) {
            if (response.body.success)
            {
                console.log("id : "+response.body.id);
                localStorage.setItem('child_id', response.body.id)
                // redirect to complete information

            }
        }, function(response) {
            console.log('error : ' + response)
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
</style>
