<template>
    <div class="row">
        <div class="row child-info">
            <div class="title">Information</div>
            <div>
                <h3>Age :</h3> <p>{{child_d.age}} {{child_d.types}}</p><br>
                <h3>Poids :</h3> <p>{{child_d.weight}} kg</p><br>
                <h3>Sexe :</h3> <p>{{child_d.gender}}</p>
            </div>
        </div>
        <div class="row">
          <div class="col-md-8">
            <section class="hemo">
              <h2>Resultat Hedomynamique</h2>
              <div class="info">
                <h3>FC : </h3>
                <p>{{hemo.fc}}</p>
              </div>
              <div class="info">
                <h3>TA : </h3>
                <p>{{hemo.ta}}</p>
              </div>
              <div class="info">
                <h3>Temperature : </h3>
                <p>{{hemo.temp}}</p>
              </div>
            </section>

            <section class="pleuro">
              <h2>Resultat Pleuro-pulmonaire</h2>
              <div class="info">
                <h3>FC : </h3>
                <p>{{pleuro.fr}}</p>
              </div>
              <div class="info">
                <h3>Amplitude : </h3>
                <p>{{pleuro.ampl}}</p>
              </div>
              <div class="info">
                <h3>Resp : </h3>
                <p>{{pleuro.resp}}</p>
              </div>
            </section>

            <section class="neuro">
              <h2>Resultat neurologique</h2>
              <div class="info">
                <h3>Score : </h3>
                <p>{{neuro.res}}</p>
              </div>
            </section>

          </div>
          <div class="col-md-4">
              <div class="row">
                  <div class="row info-exam">
                      <h3>Examen Hemodynamique</h3>
                      <p>Pouls : {{this.hemo_d.pouls}}</p>
                      <p>TA : {{this.hemo_d.ta}}</p>
                      <p>Marbrure : {{this.hemo_d.marbrure}}</p>
                      <p>TRC : {{this.hemo_d.trc}}</p>
                      <p>Temperature des extremités : {{this.hemo_d.extr_temp}}</p>
                      <p>Temperature : {{this.hemo_d.temp}}</p>
                      <p>Turgescence jugulaire : {{this.hemo_d.turg_jugul}}</p>
                      <p>Reflux hépato-jugulaire : {{this.hemo_d.hepat_jugul}}</p>
                      <p>PVC : {{this.hemo_d.pres_vein}}</p>
                      <p>Diurèse : {{this.hemo_d.diurese}}</p>
                      <p>Cardiac Auscultation : {{this.hemo_d.auscu_card}}</p>
                  </div>
                  <div class="row info-exam">
                      <h3>Examen Pleuro-pulmonaire</h3>
                      <p>FR : {{this.pleuro_d.fr}}</p>
                      <p>Amplitude : {{this.pleuro_d.amplitude}}</p>
                      <p>SpO2 : {{this.pleuro_d.spo2}}</p>
                      <p>FiO2 : {{this.pleuro_d.fio2}}</p>
                      <p>Rythme Respiratoire : {{this.pleuro_d.rythme}}</p>
                      <p>Cyanose : {{this.pleuro_d.cyanose}}</p>
                      <p>Signes de lutte : {{this.pleuro_d.sign_lutte}}</p>
                      <p>Sueur : {{this.pleuro_d.sueur}}</p>
                      <p>Bruit : {{this.pleuro_d.bruit}}</p>
                      <p>Toux : {{this.pleuro_d.toux}}</p>
                  </div>
                  <div class="row info-exam">
                      <h3>Examen Neurologique</h3>
                      <p>Ouverture des yeux : {{this.neuro_d.param1}}</p>
                      <p>Meilleure réaction verbale : {{this.neuro_d.param2}}</p>
                      <p>Meilleure réaction motrice : {{this.neuro_d.param3}}</p>
                  </div>
              </div>
          </div>
        </div>
        <div class="row">
            <div class="row stable" v-if="!hemo && !pleuro" @click="stable">
              <i class="ion-android-happy"></i>
              <p>Stable</p>
            </div>

            <div class="row instable" v-if="hemo || pleuro" @click="instable">
              <i class="ion-android-sad"></i>
              <p>Instable</p>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  data() {
    return {
      hemo: {
        fc: '',
        ta: '',
        temp: '',
      },
      pleuro: {
        fr: '',
        resp: '',
        ampl: ''
      },
      neuro: {
        res: localStorage.getItem('neuro'),
      },
      child_d: {},
      hemo_d: {},
      pleuro_d: {},
      neuro_d: {},
    }
  },
  mounted() {
    // Hemodynamic expert
    var resource = this.$resource('expert/on/1')
    resource.save({
      child_id: localStorage.getItem('child_id'),
      hemo_id: localStorage.getItem('hemo_id')
    }).then(response => {
      console.log(response.body);
      this.hemo.fc = response.body.fc;
      this.hemo.ta = response.body.ta;
      this.hemo.temp = response.body.temp;
    }, response => {
      console.error(response)
    })

    // Pleuro-pulmonaire expert
    var resource2 = this.$resource('expert/on/2')
    resource2.save({
      child_id: localStorage.getItem('child_id'),
      pleuro_id: localStorage.getItem('pleuro_id'),
    }).then(response => {
      console.log(response)
      var object = JSON.parse(response.body.body)
      this.pleuro.fr = object.fr
      this.pleuro.resp = object.resp
      this.pleuro.ampl = response.body.ampl
    }, response => {
      console.error(response)
    })

    // Child data
    this.child_d = JSON.parse(localStorage.getItem('child_data'))
    this.hemo_d = JSON.parse(localStorage.getItem('hemo_data'))
    this.pleuro_d = JSON.parse(localStorage.getItem('pleuro_data'))
    this.neuro_d = JSON.parse(localStorage.getItem('neuro_data'))
  },
  computed: {
    hemo() {
      if (this.hemo.fc !== "Normal" || this.hemo.temp !== "Normal") {
        return true
      } else {
        return false
      }
    },
    pleuro() {
      if (this.pleuro.fr !== "Normal") {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    send() {
      var resource = this.$resource('result/insert');
      resource.save({
        doctor: localStorage.getItem('user_id'),
        child: localStorage.getItem('child_id'),
        hemo_id: localStorage.getItem('hemo_id'),
        pleuro_id: localStorage.getItem('pleuro_id'),
        neuro_id: localStorage.getItem('neuro_id'),
        fc: this.hemo.fc,
        ta: this.hemo.ta,
        temp: this.hemo.temp,
        fr: this.pleuro.fr,
        resp: this.pleuro.resp,
        ampl: this.pleuro.ampl,
      }).then(response => {
        localStorage.setItem('result_id', response.body.id)
      }, response => {
        console.error(response)
      })
    },
    stable() {
      this.send()
      // Next
      this.$router.push({
        name: 'Stable'
      })
    },
    instable() {
      this.send()
      // Next
      this.$router.push({
        name: 'Instable'
      })
    }
  }

}
</script>

<style scoped>
section {
  margin: 15px;
  margin-bottom: 30px;
  height: 50vh;
  border: 2px solid grey;
  padding-top: 20px;
  border-radius: 4px;
  box-shadow: 4px 4px 4px grey;
}

.hemo {}

.pleuro {}

.neuro {}

h2 {
  margin: 0 auto;
  width: 40%;
  font-size: 200%;
  font-weight: 300;
  text-align: center;
  color: black;
  border-radius: 6px;
}

.hemo h2 {
  color: #c0392b;
  border: 2px solid #c0392b;
}

.pleuro h2 {
  color: #f39c12;
  border: 2px solid #f39c12;
}

.neuro h2 {
  color: #2980b9;
  border: 2px solid #2980b9;
}

.info {
  text-align: center;
}

.info h3,
.info p {
  display: inline-block;
}

.info h3 {
  font-weight: 300;
}

.info p {
  font-size: 140%;
}

.stable,
.instable {
  display: block;
  width: 30%;
  margin: 15px auto;
  font-size: 400%;
  border-radius: 4px;
  text-align: center;
  transition: background-color 0.2s;
}

.stable {
  border: 5px solid #27ae60;
  color: #27ae60;
}

.stable:hover,
.stable:active {
  background-color: #27ae60;
  color: #fff;
}

.instable {
  border: 5px solid #c0392b;
  color: #c0392b;
}

.instable:hover,
.instable:active {
  color: #fff;
  background-color: #c0392b;
}

.stable i,
.instable i {
  font-size: 200%;
}

.stable p,
.instable p {
  font-weight: 300;
  font-size: 80%;
}

.child-info h3, .child-info p{
    display: inline-block;
    margin: 8px auto;
}

.child-info h3 {
    color: #95a5a6;
    margin-right: 15px;
}

.child-info {
    width: 50%;
    margin: 0 auto;
    text-align: center;
    font-size: 120%;
    border: 5px solid #3498db;
    border-radius: 8px;
}

.child-info div {
    display: inline-block;
    vertical-align: middle;
    margin: 0 5%;
}

.child-info .title {
    display: inline-block;
    height: 100%;
    color: #3498db;
    font-size: 180%;
}

.info-exam {
    margin: 10px auto;
    width: 80%;
    font-size: 110%;

}

.info-exam:nth-child(1){
    border: 3px solid #c0392b;
    border-radius: 5px;
}

.info-exam:nth-child(2){
    border: 3px solid #f39c12;
    border-radius: 5px;
}

.info-exam:nth-child(3){
    border: 3px solid #2980b9;
    border-radius: 5px;
}

.info-exam p {
    padding-left: 10px;
}
</style>
