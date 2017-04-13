<template>
<div class="row row1">
  <h3>Examen Pleuro-pulmonaire</h3>
  <div class="col-md-6 col-md-offset-3">
    <form class="form-horizontal">

      <div class="form-group">
        <label class="col-md-3 control-label">FR (mn)</label>
        <div class="col-md-6">
          <input type="number" min="0" class="form-control input-md" required="true" v-model.number="data.fr">
        </div>
      </div>

      <div class="form-group">
        <label class="col-md-3 control-label">Amplitude</label>
        <div class="col-md-6">
          <select name="selectbasic" class="form-control" v-model="data.amplitude">
                        <option value="1">Normal</option>
                        <option value="2">Decreased</option>
                        <option value="3">Increased</option>
                        <option value="0">Null</option>
                    </select>
        </div>
      </div>

      <div class="form-group">
        <label class="col-md-3 control-label">SpO2 (%)</label>
        <div class="col-md-6">
          <input type="number" min="0" max="100" class="form-control input-md" required="true" v-model.number="data.spo2">
        </div>
      </div>

      <div class="form-group">
        <label class="col-md-3 control-label">FiO2 (%)</label>
        <div class="col-md-6">
          <input type="number" min="0" max="100" class="form-control input-md" required="true" v-model.number="data.fio2">
        </div>
      </div>

      <div class="form-group">
        <label class="col-md-3 control-label">Respiration rhythm</label>
        <div class="col-md-6">
          <select name="selectbasic" class="form-control" v-model="data.rythme">
                        <option value="normal">Normal</option>
                        <option value="sighs">Sighs</option>
                        <option value="periodic">Periodic</option>
                        <option value="irregular">Irregular</option>
                    </select>
        </div>
      </div>

      <div class="form-group">
        <label class="col-md-3 control-label">Cyanose</label>
        <div class="col-md-6">
          <input type="checkbox" class="form-control input-md" required="true" v-model="data.cyanose">
        </div>
      </div>

      <div class="form-group">
        <label class="col-md-3 control-label">Signes de lutte</label>
        <div class="col-md-6">
          <select name="selectbasic" class="form-control" multiple v-model="data.sign_lutte">
                        <option value="tirage">Tirage</option>
                        <option value="battement">Battement des ailes du nez</option>
                        <option value="epuisement">Epuisement</option>
                        <option value="balancement">Balancement thoraco-abdominal</option>
                    </select>
        </div>
      </div>

      <div class="form-group">
        <label class="col-md-3 control-label">Sueur</label>
        <div class="col-md-6">
          <input type="checkbox" class="form-control input-md" required="true" v-model="data.sueur">
        </div>
      </div>

      <h4>Auscultation pleuro pulmonaire</h4>

      <div class="form-group">
        <label class="col-md-3 control-label">Bruit</label>
        <div class="col-md-6">
            <select name="selectbasic" class="form-control" v-model="data.bruit">
                <option value="absent">Absent</option>
                <option value="stridor">Stridor</option>
                <option value="cornage">Cornage</option>
                <option value="wheezing">Wheezing</option>
            </select>
        </div>
      </div>

      <div class="form-group">
        <label class="col-md-3 control-label">Toux</label>
        <div class="col-md-6">
            <select name="selectbasic" class="form-control" v-model="data.toux">
                <option value="absent">Absent</option>
                <option value="seche">Sèche</option>
                <option value="aigue">Aiguë</option>
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
import store from '../../../store/store'
export default {
  data() {
    return {
      data: {
        doctor: localStorage.getItem('user_id'),
        child: store.state.child_id,
        fr: 0,
        amplitude: '',
        spo2: 0,
        fio2: 0,
        rythme: '',
        cyanose: false,
        sign_lutte: [],
        sueur: false,
        bruit: '',
        toux: ''
      },
      success: false,
    }
  },
  methods: {
    submit() {
      var resource = this.$resource('pulmonaire/insert');
      resource.save({
        doctor: this.data.doctor,
        child: this.data.child,
        fr: this.data.fr,
        amplitude: this.data.amplitude,
        spo2: this.data.spo2,
        fio2: this.data.fio2,
        rythme: this.data.rythme,
        cyanose: this.data.cyanose,
        sign_lutte: this.data.sign_lutte,
        sueur: this.data.sueur,
        bruit: this.data.bruit,
        toux: this.data.toux,
      }).then(response => {

        this.success = true
        // Save data
        store.commit('PLEURO', {
            pleuro_id: response.body.id,
            pleuro_cynose: this.data.cyanose,
            pleuro_rythme: this.data.rythme
        })
        // Increment
        this.$parent.$data.next++
          console.log(response)
      }, response => {
        console.log(response)
      })
    }
  }
}
</script>

<style lang="css">
.row1 {
    margin-top: 2%;
    margin-bottom: 3%
}
</style>
