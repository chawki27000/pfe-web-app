<template>
<div>
  <div class="step">
    <div class="txt-step">
      <p><span class="title-treat">Paracetamole : </span>{{output.paracetamol}} mg</p>
      <p><span class="title-treat">Aspirine : </span>{{output.aspirine}} mg</p>
      <p><span class="title-treat">Ibuprofene : </span>{{output.ibuprofene}} mg</p>
    </div>
  </div>


  <div class="treatment">
    <h4>Paracetamol</h4>
    <p><span class="title-treat">Diagnostic</span> : {{paracetamol.diag}}</p>
    <p><span class="title-treat">Complementaire</span> : {{paracetamol.complementaire}}</p>
    <p><span class="title-treat">Traitement</span> : {{paracetamol.treatment}}</p>
  </div>

  <div class="treatment">
    <h4>Aspirine</h4>
    <p><span class="title-treat">Diagnostic</span> : {{aspirine.diag}}</p>
    <p><span class="title-treat">Complementaire</span> : {{aspirine.complementaire}}</p>
    <p><span class="title-treat">Traitement</span> : {{aspirine.treatment}}</p>
  </div>

  <div class="treatment">
    <h4>Ibuprofene</h4>
    <p><span class="title-treat">Diagnostic</span> : {{ibuprofene.diag}}</p>
    <p><span class="title-treat">Traitement</span> : {{ibuprofene.treatment}}</p>
  </div>

  <div style="text-align: center" v-show="!show_desaprove">
    <a class="btn-approve" @click="approve">Approuver <i class="ion-thumbsup"></i></a>
    <a class="btn-deapprove" @click="deapprove">Désapprouver <i class="ion-thumbsdown"></i></a>
  </div>


  <div class="row" style="text-align: center" v-show="show_desaprove">
    <textarea name="name" rows="8" cols="80" v-model="comment" placeholder="Traitement proposé par le medecin"></textarea><br>
    <a class="btn-approve" @click="send">Valider <i class="ion-android-done"></i></a>
  </div>

</div>
</template>

<script>
export default {

  data() {
    return {
      comment: '',
      show_desaprove: false,
      child_id: localStorage.getItem('detail_id'), // TODO: or replace by child_id
      output: {
        paracetamol: 0,
        aspirine: 0,
        ibuprofene: 0
      },
      input: {
        parac_dose: localStorage.getItem('parac_dose'),
        parac_hours: localStorage.getItem('parac_hours'),
      },
      aspirine: {
        complementaire: "",
        diag: "",
        treatment: ""
      },
      paracetamol: {
        complementaire: "",
        diag: "",
        treatment: ""
      },
      ibuprofene: {
        diag: "",
        treatment: ""
      },
      step: {
        single: true,
        stagged: true,
        single_risk: true,
        stagged_risk: true,
        stagged_risk_sup: true,
        six: true,
        seven: true,
        eight: true,
        nine: true,
        ten: true,
      }
    }
  },

  mounted() {
    var resource = this.$resource('expert/toxicity/');
    resource.save({
      child_id: this.child_id
    }).then(response => {
      console.log(response.body);
      this.output.paracetamol = response.body.paracetamol
      this.output.aspirine = response.body.aspirine
      this.output.ibuprofene = response.body.ibuprofene

      var resource = this.$resource('expert/toxicity/expert/');
      resource.save({
        child_id: this.child_id,
        aspirine: this.output.aspirine,
        ibuprofene: this.output.ibuprofene,
        paracetamol: this.output.paracetamol,
      }).then(response => {
        console.log(response.body);
        this.aspirine.complementaire = response.body.aspirine.complementaire
        this.aspirine.diag = response.body.aspirine.diag
        this.aspirine.treatment = response.body.aspirine.treatment

        this.paracetamol.complementaire = response.body.paracetamol.complementaire
        this.paracetamol.diag = response.body.paracetamol.diag
        this.paracetamol.treatment = response.body.paracetamol.treatment

        this.ibuprofene.diag = response.body.ibuprofene.diag
        this.ibuprofene.treatment = response.body.ibuprofene.treatment
      }, response => {

      })
    }, response => {

    })
  },
  methods: {
    approve() {
      console.log("approve");
      var resource = this.$resource('case/approve/');
      resource.save({
        id: this.child_id,
        approve: true
      }).then(response => {
          this.$router.push({
            name: 'Case'
          })
      }, response => {

      })
    },
    deapprove() {
      console.log("deapprove");
      this.show_desaprove = true

    },
    send() {
      var resource = this.$resource('case/approve/');
      resource.save({
        id: this.child_id,
        approve: false,
        proposition: this.comment
      }).then(response => {
          if (response.body.success) {
              this.$router.push({
                name: 'Case'
              })
          }
      }, response => {

      })
    }
  }
}
</script>

<style lang="css">

.step {
    border: 2px solid #2980b9;
    text-align: center;
    margin: 10px auto;
    padding-top: 10px;
    padding-bottom: 10px;
}

.step a {
    text-decoration: none;
    color: black;
    border: 1px solid black;
    padding: 2px 6px;
    margin: auto 5px;
}

.step a:hover,
.step a:active {
    background-color: black;
    color: white;
}

.treatment {
    border: 4px solid #d35400;
    border-radius: 4px;
    margin: 20px auto;
    padding: 10px;
}

.treatment h4 {
    text-align: center;
    font-size: 150%;
    color: #2c3e50;
}

.title-treat {
    font-weight: bold;
    color: #c0392b;
}

.btn-approve {
    display: inline-block;
    text-decoration: none !important;
    color: #27ae60;
    border: 3px solid #27ae60;
    margin: 5px 30px;
    border-radius: 5px;
    text-align: center;
    font-size: 150%;
    padding: 10px;
}

.btn-approve:hover,
.btn-approve:active {
    background-color: #27ae60;
    color: white;
}

.btn-deapprove {
    display: inline-block;
    text-decoration: none !important;
    color: #e74c3c;
    border: 3px solid #e74c3c;
    border-radius: 5px;
    text-align: center;
    font-size: 150%;
    padding: 10px;
}

.btn-deapprove:hover,
.btn-deapprove:active {
    background-color: #e74c3c;
    color: white;
}

</style>
