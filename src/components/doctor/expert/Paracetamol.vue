<template>
<div>
    <div class="step">
        <div class="txt-step">
          <p><strong>Paracetamole : </strong>{{output.paracetamol}} mg</p>
          <p><strong>Aspirine : </strong>{{output.aspirine}} mg</p>
          <p><strong>Ibuprofene : </strong>{{output.ibuprofene}} mg</p>
        </div>
    </div>
  <div class="step">
    <div class="txt-step">
      <p>Single or staggered overdose?</p>
    </div>
    <div class="btn-step">
      <a>Single</a>
      <a>staggered</a>
    </div>
  </div>

  <div class="step" v-if="step.single || step.stagged">
    <div class="txt-step">
      <p>Risk box<br> Some patients may be at risk of liver damage from lower levels of plasma paracetamol.<br> 1 - Regular ethanol consumption in excess of 21 units/week in males, 14 units/week in females<br> 2 - Regular use of enzyme-inducing drugs (carbamazepine
        phenytoin, phenobarbitone rifampacin)<br> 3 - Conditions causing glutathione depletion (malnutrition, HIV, eating disorders, cystic fibrosis)</p>
    </div>
    <div class="btn-step">
      <a>Yes</a>
      <a>No</a>
    </div>
  </div>

  <div class="step" v-if="step.single && step.sigle_risk">
    <div class="txt-step">
      <p v-if="parac_dose < 75">Discharge the patient if sure of the dose ingested</p>
    </div>
  </div>

  <div class="step" v-if="step.single && !step.sigle_risk">
    <div class="txt-step">
      <p v-if="parac_dose < 150">Discharge the patient if sure of the dose ingested</p>
    </div>
  </div>

  <div class="step" v-if="step.single && step.stagged_risk">
    <div class="txt-step">
      <p v-if="parac_dose < 75">Discharge the patient if sure of the dose ingested</p>
      <p v-else>Call National Poisons Information Service</p>
    </div>
  </div>

  <div class="step" v-if="step.single && !step.stagged_risk">
    <div class="txt-step">
      <p v-if="parac_dose < 150">Discharge the patient if sure of the dose ingested</p>
    </div>
    <div class="btn-step">
      <a>Yes</a>
      <a>No</a>
    </div>
  </div>

  <div class="step" v-if="step.single && step.stagged_risk_sup">
    <div class="txt-step">
      <p>Start treatment with i.v. N-acetylcysteine. See treatment box for doses</p>
      <img src="../../../../static/img/parac/treatment.png">
    </div>
    <div class="txt-step">
      <p>Take blood for baseline INR, LFTs, creatinine and venous bicarbonate (if bicarbonate abnormal then check arterial blood gases)</p>
    </div>
  </div>

  <!-- BY TIME -->

  <div class="step" v-if="step.two && input.parac_hours < 1">
    <div class="txt-step">
      <p>Start treatment with i.v. N-acetylcysteine. See treatment box for doses</p>
      <img src="../../../../static/img/parac/treatment.png">
    </div>
    <div class="txt-step">
      <p>Take blood for baseline INR, LFTs, creatinine and venous bicarbonate (if bicarbonate abnormal then check arterial blood gases)</p>
    </div>
  </div>

  <div class="step" v-if="step.two && input.parac_hours >= 1 && input.parac_hours < 4">
    <div class="txt-step">
      <p>Start treatment with i.v. N-acetylcysteine. See treatment box for doses</p>
      <img src="../../../../static/img/parac/treatment.png">
    </div>
    <div class="txt-step">
      <p>Take blood for baseline INR, LFTs, creatinine and venous bicarbonate (if bicarbonate abnormal then check arterial blood gases)</p>
    </div>
  </div>

  <div class="step" v-if="step.two && input.parac_hours >= 4 && input.parac_hours < 8">
    <div class="txt-step">
      <p>Start treatment with i.v. N-acetylcysteine. See treatment box for doses</p>
      <img src="../../../../static/img/parac/treatment.png">
    </div>
    <div class="txt-step">
      <p>Take blood for baseline INR, LFTs, creatinine and venous bicarbonate (if bicarbonate abnormal then check arterial blood gases)</p>
    </div>
    <div class="txt-step">
      <p>Will level be available before 8 hours ?</p>
    </div>
    <div class="btn-step">
      <a>Yes</a>
      <a>No</a>
    </div>
    <div class="txt-step">
      <p>Start treatment with i.v. N-acetylcysteine See treatment box for doses</p>
    </div>
    <div class="txt-step">
      <p>Check paracetamol level result and plot on the treatment nomogram</p>
      <img src="../../../../static/img/parac/level.png">
    </div>
  </div>

  <div class="step" v-if="step.two && input.parac_hours >= 8 && input.parac_hours < 24">
    <div class="txt-step">
      <p>Start treatment with i.v. N-acetylcysteine. See treatment box for doses</p>
      <img src="../../../../static/img/parac/treatment.png">
    </div>
    <div class="txt-step">
      <p>Take blood for baseline INR, LFTs, creatinine and venous bicarbonate (if bicarbonate abnormal then check arterial blood gases)</p>
    </div>
    <div class="txt-step">
      <p>Check paracetamol level result and plot on the treatment nomogram</p>
      <img src="../../../../static/img/parac/level.png">
    </div>
    <div class="txt-step">
      <p>Is the paracetamol level above the treatment line ?</p>
    </div>
    <div class="txt-step">
      <p>Check INR, creatinine and venous bicarbonate results (if bicarbonate abnormal then check arterial blood gases)</p>
    </div>
    <div class="txt-step">
      <p>Are the lab tests abnormal ?</p>
    </div>
    <div class="txt-step">
      <p>Start treatment with i.v. N-acetylcysteine 11 38 39 (see treatment box for doses), if not already started. Call National Poisons Information Service</p>
    </div>
  </div>

  <div class="step" v-if="step.two && input.parac_hours > 24">
    <div class="txt-step">
      <p>Start treatment with i.v. N-acetylcysteine. See treatment box for doses</p>
      <img src="../../../../static/img/parac/treatment.png">
    </div>
    <div class="txt-step">
      <p>Take blood for baseline INR, LFTs, creatinine and venous bicarbonate (if bicarbonate abnormal then check arterial blood gases)</p>
      <p>Is the patient symptomatic or are the lab tests abnormal?</p>
    </div>
    <div class="btn-step">
      <a>Yes</a>
      <a>No</a>
    </div>
  </div>

  <div class="treatment">
      <h4>Aspirine</h4>
      <p>Diagnostic : {{aspirine.diag}}</p>
      <p>Complementaire : {{aspirine.complementaire}}</p>
      <p>Traitement : {{aspirine.treatment}}</p>
  </div>

  <div class="treatment">
      <h4>Ibuprofene</h4>
      <p>Diagnostic : {{ibuprofene.diag}}</p>
      <p>Traitement : {{ibuprofene.treatment}}</p>
  </div>

</div>
</template>

<script>
export default {

  data() {
    return {
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
          }).then(response => {
              console.log(response.body);
              this.aspirine.complementaire = response.body.aspirine.complementaire
              this.aspirine.diag = response.body.aspirine.diag
              this.aspirine.treatment = response.body.aspirine.treatment

              this.ibuprofene.diag = response.body.ibuprofene.diag
              this.ibuprofene.treatment = response.body.ibuprofene.treatment
          }, response => {

          })
      }, response => {

      })
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

</style>
