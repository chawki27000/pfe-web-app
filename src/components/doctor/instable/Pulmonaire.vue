<template>
<div class="row row1">

  <div class="col-md-6">
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
                <option value="normal">Normal</option>
                <option value="decreased">Decreased</option>
                <option value="increased">Increased</option>
                <option value="null">Null</option>
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
                <option value="increased">Periodic</option>
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

      <button type="submit" class="btn btn-primary col-md-3 col-md-offset-4">Submit</button>

    </form>
  </div>

  <div class="col-md-6">
      {{data}}
  </div>

</div>
</template>

<script>
export default {
    data () {
        return {
            data: {
                doctor: localStorage.getItem('user_id'),
                child: localStorage.getItem('child_id'),
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
            }
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
