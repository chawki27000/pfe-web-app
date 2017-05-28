<template>
<div>

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
    <div class="btn-step">
      <a>Yes</a>
      <a>No</a>
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
  </div>

  <div class="step" v-if="step.two && input.parac_hours >= 8 && input.parac_hours < 24">
    <div class="txt-step">
      <p>Start treatment with i.v. N-acetylcysteine. See treatment box for doses</p>
      <img src="../../../../static/img/parac/treatment.png">
    </div>
    <div class="txt-step">
      <p>Take blood for baseline INR, LFTs, creatinine and venous bicarbonate (if bicarbonate abnormal then check arterial blood gases)</p>
    </div>
  </div>

  <div class="step" v-if="step.two && input.parac_hours > 24">
    <div class="txt-step">
      <p>Start treatment with i.v. N-acetylcysteine. See treatment box for doses</p>
      <img src="../../../../static/img/parac/treatment.png">
    </div>
    <div class="txt-step">
      <p>Take blood for baseline INR, LFTs, creatinine and venous bicarbonate (if bicarbonate abnormal then check arterial blood gases)</p>
    </div>
  </div>

</div>
</template>

<script>
export default {

  data() {
    return {
      input: {
        parac_dose: localStorage.getItem('parac_dose'),
        parac_hours: localStorage.getItem('parac_hours')
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
  }
}
</script>

<style lang="css">
</style>
