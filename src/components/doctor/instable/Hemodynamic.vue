<template>
<div class="row row1">
  <h3>Examen Hemodynamique</h3>
  <div class="col-md-6 col-md-offset-3">

    <form class="form-horizontal">

      <div class="form-group">
        <label class="col-md-3 control-label">Pouls (mn)</label>
        <div class="col-md-6">
          <input type="number" min="0" class="form-control input-md" required="true" v-model.number="data.pouls">
        </div>
      </div>

      <div class="form-group">
        <label class="col-md-3 control-label">TA (mmHg)</label>
        <div class="col-md-6">
          <input type="number" min="0" class="form-control input-md" required="true" v-model.number="data.ta">
        </div>
      </div>

      <div class="form-group">
        <label class="col-md-3 control-label">Marbrures</label>
        <div class="col-md-6">
          <input type="checkbox" class="form-control input-md" v-model="data.marbrure">
        </div>
      </div>

      <div class="form-group">
        <label class="col-md-3 control-label">Recolour Time (s)</label>
        <div class="col-md-6">
          <input type="number" min="0" class="form-control input-md" required="true" v-model.number="data.trc">
        </div>
      </div>

      <div class="form-group">
        <label class="col-md-3 control-label">Temperature of the extremities (Cold)</label>
        <div class="col-md-6">
          <input type="checkbox" class="form-control input-md" v-model="data.extr_temp">
        </div>
      </div>

      <div class="form-group">
        <label class="col-md-3 control-label">Temperature (C°)</label>
        <div class="col-md-6">
          <input type="number" min="0" class="form-control input-md" required="true" v-model.number="data.temp">
        </div>
      </div>

      <div class="form-group">
        <label class="col-md-3 control-label">Turgescence jugulaire</label>
        <div class="col-md-6">
          <input type="checkbox" class="form-control input-md" v-model="data.turg_jugul">
        </div>
      </div>

      <div class="form-group">
        <label class="col-md-3 control-label">Reflux hépato-jugulaire</label>
        <div class="col-md-6">
          <input type="checkbox" class="form-control input-md" v-model="data.hepat_jugul">
        </div>
      </div>

      <div class="form-group">
        <label class="col-md-3 control-label">Pression veineuse centrale (PVC)</label>
        <div class="col-md-6">
          <input type="number" min="0" class="form-control input-md" required="true" v-model.number="data.pres_vein">
        </div>
      </div>

      <div class="form-group">
        <label class="col-md-3 control-label">Diurèse</label>
        <div class="col-md-6">
          <select name="selectbasic" class="form-control" v-model="data.diurese">
                        <option value="polyurie">Polyurie</option>
                        <option value="oligurie">Oligurie</option>
                        <option value="anurie">Anurie</option>
                    </select>
        </div>
      </div>

      <div class="form-group">
        <label class="col-md-3 control-label">Cardiac Auscultation</label>
        <div class="col-md-6">
          <select name="selectbasic" class="form-control" v-model="data.auscu_card">
            <option value="normal">Normal</option>
            <option value="abnormal">Abnormal</option>
        </select>
        </div>
      </div>

    </form>

  </div>

  <div class="row">
    <div class="col-md-12">
      <a class="btn-next" @click="submit">Next<i class="ion-arrow-right-a"></i></a>
    </div>
  </div>

</div>
</template>

<script>

export default {
  data() {
    return {
      data: {
        doctor: localStorage.getItem('user_id'),
        child: localStorage.getItem('child_id'),
        pouls: 0,
        ta: 0,
        marbrure: false,
        trc: 0,
        extr_temp: false,
        temp: 0,
        turg_jugul: false,
        hepat_jugul: false,
        pres_vein: 0,
        diurese: '',
        auscu_card: ''
      },
      success: false,
      expert: {
        card_freq: '',
        ta: '',
        temp: '',
      }
    }
  },
  methods: {
    submit() {
      var resource = this.$resource('hemodynamic/insert');
      resource.save({
        doctor: this.data.doctor,
        child: this.data.child,
        pouls: this.data.pouls,
        ta: this.data.ta,
        marbrure: this.data.marbrure,
        trc: this.data.trc,
        extr_temp: this.data.extr_temp,
        temp: this.data.temp,
        turg_jugul: this.data.turg_jugul,
        hepat_jugul: this.data.hepat_jugul,
        pres_vein: this.data.pres_vein,
        diurese: this.data.diurese,
        auscu_card: this.data.auscu_card,
      }).then(response => {
        // save some data for traitment result
        localStorage.setItem('hemo_trc', this.data.trc)

        this.success = true
        // Save data in localStorage
        localStorage.setItem('hemo_data', JSON.stringify(this.data))
        localStorage.setItem('hemo_id', response.body.id)
        // Increment
        this.$parent.$data.next++
          console.log(response)
      }, response => {
        console.log(response)
      })
    },
  }
}
</script>

<style lang="css">
.row1 {
    margin-top: 2%;
    margin-bottom: 3%
}
</style>
