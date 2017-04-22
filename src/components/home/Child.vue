<template>
<div>


  <div class="row">
      <div class="row info-exam result">
          <h3>Resultat</h3><br>
          <p>Date : {{result.createdAt}}</p><br>
          <p>Etat : {{result.feedback}}</p><br>
          <p>Commentaire : {{result.comment}}</p><br>
          <p>Explication : {{result.explanation}}</p>
      </div>
    <div class="row info-exam hemo">
      <h3>Examen Hemodynamique</h3>
      <p>Pouls : {{hemo.pouls}}</p>
      <p>TA : {{hemo.ta}}</p>
      <p>Marbrure : {{hemo.marbrure}}</p>
      <p>TRC : {{hemo.trc}}</p>
      <p>Temperature des extremités : {{hemo.extr_temp}}</p>
      <p>Temperature : {{hemo.temp}}</p>
      <p>Turgescence jugulaire : {{hemo.turg_jugul}}</p>
      <p>Reflux hépato-jugulaire : {{hemo.hepat_jugul}}</p>
      <p>PVC : {{hemo.pres_vein}}</p>
      <p>Diurèse : {{hemo.diurese}}</p>
      <p>Cardiac Auscultation : {{hemo.auscu_card}}</p>
    </div>
    <div class="row info-exam pleuro">
      <h3>Examen Pleuro-pulmonaire</h3>
      <p>FR : {{pleuro.fr}}</p>
      <p>Amplitude : {{pleuro.amplitude}}</p>
      <p>SpO2 : {{pleuro.spo2}}</p>
      <p>FiO2 : {{pleuro.fio2}}</p>
      <p>Rythme Respiratoire : {{pleuro.rythme}}</p>
      <p>Cyanose : {{pleuro.cyanose}}</p>
      <p>Signes de lutte : {{pleuro.sign_lutte}}</p>
      <p>Sueur : {{pleuro.sueur}}</p>
      <p>Bruit : {{pleuro.bruit}}</p>
      <p>Toux : {{pleuro.toux}}</p>
    </div>
    <div class="row info-exam neuro">
      <h3>Examen Neurologique</h3>
      <p>Ouverture des yeux : {{neuro.param1}}</p>
      <p>Meilleure réaction verbale : {{neuro.param2}}</p>
      <p>Meilleure réaction motrice : {{neuro.param3}}</p>
    </div>
  </div>

</div>
</template>

<script>
export default {
  data() {
    return {
      detail_id: '',
      result: {},
      hemo: {},
      pleuro: {},
      neuro: {},
    }
  },
  created() {
    console.log('created');
    this.detail_id = localStorage.getItem('detail_id')
    this.getRes(this.detail_id)

  },
  mounted() {

  },

  methods: {
    getRes(id) {
      var resource = this.$resource('result/query/id{/id}');
      resource.get({
        id: id
      }).then(response => {
        this.result = response.body.data
        // get other clinal information
          this.getHemo(this.result.hemo_id)
          this.getPleuro(this.result.pleuro_id)
          this.getNeuro(this.result.neuro_id)

      })
    },
    getHemo(id) {
      var resource = this.$resource('hemodynamic/query{/id}');
      resource.get({
        id: id
      }).then(response => {
        this.hemo = response.body.data
      })
    },
    getPleuro(id) {
      var resource = this.$resource('pulmonaire/query{/id}');
      resource.get({
        id: id
      }).then(response => {
        this.pleuro = response.body.data
      })
    },
    getNeuro(id) {
      var resource = this.$resource('neurologic/query{/id}');
      resource.get({
        id: id
      }).then(response => {
        this.neuro = response.body.data
      })
    },
    fetch_date(date) {
      var foo = new Date("2012-07-14T01:00:00+01:00")
      return foo
    }

  }
}
</script>

<style lang="css">
.info-exam {
    margin: 10px auto;
    width: 80%;
    font-size: 110%;

}

.info-exam.hemo{
    border: 3px solid #c0392b;
    border-radius: 5px;
}

.info-exam.pleuro {
    border: 3px solid #f39c12;
    border-radius: 5px;
}

.info-exam.neuro{
    border: 3px solid #2980b9;
    border-radius: 5px;
}

.info-exam p {
    padding-left: 10px;
}

.info-exam h3 {
    word-spacing: 3px;
    letter-spacing: 2px;
    font-weight: 300;
}
.info-exam span {
    display: block;
    font-weight: 300;
    font-size: 70%;
}

.result h3, .result p{
    display: inline-block;
    margin: 8px auto;
}

.result h3 {
    color: #95a5a6;
    margin-right: 15px;
}

.result {
    width: 50%;
    margin: 0 auto;
    text-align: center;
    font-size: 120%;
    border: 5px solid #3498db;
    border-radius: 8px;
}

.result div {
    display: inline-block;
    vertical-align: middle;
    margin: 0 5%;
}

.result .title {
    display: inline-block;
    height: 100%;
    color: #3498db;
    font-size: 180%;
}
</style>
