<template>
<div>


  <div class="row">
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
      <h3>Cause d'Intoxication</h3>
      <p>Place de l'ingestion : {{intox.taken_place}}</p>
      <p>Seul : {{intox.alone}}</p>
      <p>Toxidrome associé : {{intox.toxidrome}}</p>
      <p>Duree relative de l'ingestion : {{intox.taken_hour.hour}} heure(s) et {{intox.taken_hour.minute}} minute(s)</p>
      <p>Signes : <span v-for="s in intox.sign">{{s.types}} | </span></p>
{{drug}}
      <p v-for="m in intox.drugs">

          Médicaments : {{m.id}}<br>
          quantité : {{m.quantity}}<br>
          dose : {{m.dose}}
      </p>

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
      intox: {},
      drug: {}
    }
  },
  created() {
    console.log('created');
    this.detail_id = localStorage.getItem('candidat_id')
    this.getRes(this.detail_id)

  },
  mounted() {

  },

  methods: {
    getRes(id) {
        this.getHemo(id)
        this.getPleuro(id)
        this.getNeuro(id)
        this.getIntox(id)
    },

    getHemo(id) {
      var resource = this.$resource('hemodynamic/query/cod{/id}');
      resource.get({
        id: id
      }).then(response => {
        this.hemo = response.body.data[0]
      })
    },
    getPleuro(id) {
      var resource = this.$resource('pulmonaire/query/cod{/id}');
      resource.get({
        id: id
      }).then(response => {
        this.pleuro = response.body.data[0]
      })
    },
    getNeuro(id) {
      var resource = this.$resource('neurologic/query/cod{/id}');
      resource.get({
        id: id
      }).then(response => {
        this.neuro = response.body.data[0]
      })
    },
    medoc(id) {
        var resource = this.$resource('drug/find');
        resource.save({
          medoc: id
        }).then(response => {
          this.drug = response.body.data
          console.log(response);
        })
    },
    getIntox(id) {
        var resource = this.$resource('case/find{/id}');
        resource.save({
          child: id
        }).then(response => {
          this.intox = response.body.data[0]
          medoc(this.intox.drugs[0].id)
          console.log(response);
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
