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

      <div class="row row2" v-show="!next">
          <div class="col-md-2 col-md-offset-5">
              <a class="btn btn-success" @click="send" data-toggle="modal" data-target="#myModal">Next <span class="glyphicon glyphicon-arrow-right"></span></a>
          </div>
      </div>


      <!-- MODAL DECLARATION -->

      <!-- Modal -->
      <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title" id="myModalLabel">Choice</h4>
            </div>
            <div class="modal-body">

                <div class="row">
                    <div class="col-md-6">
                        <i class="ion-android-happy"></i>
                        <a class="btn-choice btn-stable" data-dismiss="modal" @click="stable">Stable</a>
                    </div>
                    <div class="col-md-6">
                        <i class="ion-android-sad"></i>
                        <a class="btn-choice btn-instable" data-dismiss="modal" @click="instable">Instable</a>
                    </div>
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
      age: 0,
      types: '',
      weight: 0,
      lev_father: '',
      lev_mother: '',
      address: '',
      // behavior variables
      next: false
    }
  },

  methods: {
    send() {
      const ag = this.age
      const ty = this.types
      const wi = this.weight
      const sm = this.lev_father
      const sf = this.lev_mother
      const ad = this.address
      this.$apollo.mutate({
        mutation: gql `
            mutation($ag: Int!, $ty: String!,$wi: Float!, $sm: String!, $sf: String!, $ad: String){
              addChild(data:{age:{num: $ag, types: $ty}, weight: $wi, school_mother: $sm, school_father: $sf, address_parent: $ad}){
                _id
              }
          }`,
        variables: {
          ag,
          ty,
          wi,
          sm,
          sf,
          ad
        }
      }).then((response) => {
        if (response.data.addChild._id) {
          localStorage.setItem('child_id', response.data.addChild._id)
          // redirect
          this.next = true
        }
      }).catch((error) => {
        console.error(error);
      })
    },
    stable() {
      this.$router.push({
        name: 'Stable'
      })
    },
    instable() {
      this.$router.push({
        name: 'Instable'
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

.modal-body {
    margin: 20px;
}

.btn-choice,
.btn-choice:link,
.btn-choice:visited {
    background-color: #ccc;
    text-decoration: none !important;
    border-radius: 3px;
    border: 1px solid #555;
    padding: 15px 70px;
    font-size: 120%;
    border: none;
    box-shadow: 0 4px 4px rgba(0, 0, 0, .2);
    color: #fff;
    font-weight: 100;
    align-self: center;
    transition: background-color 0.2s;
    width: 100%;
    text-align: center;
}

.btn-choice:hover,
.btn-choice:active {
    text-decoration: none !important;
    background: #f6f7f9;
    color: #fff;
}

.btn-stable,
.btn-stable:link,
.btn-stable:visited {
    background-color: #27ae60;
}

.btn-stable:hover,
.btn-stable:active {
    background-color: #1e8449;
}

.btn-instable,
.btn-instable:link,
.btn-instable:visited {
    background-color: #c0392b;
}

.btn-instable:hover,
.btn-instable:active {
    background-color: #962d22;
}

.modal-body .row .col-md-6 a,
.modal-body .row .col-md-6 i {
    display: inline-block;
}

.modal-body .row .col-md-6 i {
    font-size: 700%;
    width: 100%;
    text-align: center;
}

</style>
