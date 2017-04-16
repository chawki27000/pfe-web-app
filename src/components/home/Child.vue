<template>
<div>

  <div class="row">
    <div class="row info-exam" v-for="h in hemo" :key="h._id">
      <h3>Examen Hemodynamique <span>{{h.createdAt}}</span></h3>
      <p>Pouls : {{h.pouls}}</p>
      <p>TA : {{h.ta}}</p>
      <p>Marbrure : {{h.marbrure}}</p>
      <p>TRC : {{h.trc}}</p>
      <p>Temperature des extremités : {{h.extr_temp}}</p>
      <p>Temperature : {{h.temp}}</p>
      <p>Turgescence jugulaire : {{h.turg_jugul}}</p>
      <p>Reflux hépato-jugulaire : {{h.hepat_jugul}}</p>
      <p>PVC : {{h.pres_vein}}</p>
      <p>Diurèse : {{h.diurese}}</p>
      <p>Cardiac Auscultation : {{h.auscu_card}}</p>
    </div>
    <div class="row info-exam" v-for="p in pleuro" :key="p._id">
      <h3>Examen Pleuro-pulmonaire <span>{{p.createdAt}}</span></h3>
      <p>FR : {{p.fr}}</p>
      <p>Amplitude : {{p.amplitude}}</p>
      <p>SpO2 : {{p.spo2}}</p>
      <p>FiO2 : {{p.fio2}}</p>
      <p>Rythme Respiratoire : {{p.rythme}}</p>
      <p>Cyanose : {{p.cyanose}}</p>
      <p>Signes de lutte : {{p.sign_lutte}}</p>
      <p>Sueur : {{p.sueur}}</p>
      <p>Bruit : {{p.bruit}}</p>
      <p>Toux : {{p.toux}}</p>
    </div>
    <div class="row info-exam" v-for="n in neuro" :key="n._id">
      <h3>Examen Neurologique <span>{{n.createdAt}}</span></h3>
      <p>Ouverture des yeux : {{n.param1}}</p>
      <p>Meilleure réaction verbale : {{n.param2}}</p>
      <p>Meilleure réaction motrice : {{n.param3}}</p>
    </div>
  </div>

  <div class="row btns">
      <a @click="exam">Exam <i class="ion-android-refresh"></i></a>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      detail_id: '',
      result: [],
      hemo: [],
      pleuro: [],
      neuro: [],
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
      var resource = this.$resource('result/query{/id}');
      resource.get({
        id: id
      }).then(response => {
        this.result = response.body.data
        console.log("before loop, ", this.result.length);
        // for loop to explore the result tab
        for (var i = 0; i < this.result.length; i++) {
          this.getHemo(this.result[i].hemo_id)
          this.getPleuro(this.result[i].pleuro_id)
          this.getNeuro(this.result[i].neuro_id)
        }
      })
    },
    getHemo(id) {
      var resource = this.$resource('hemodynamic/query{/id}');
      resource.get({
        id: id
      }).then(response => {
        this.hemo.push(response.body.data)
      })
    },
    getPleuro(id) {
      var resource = this.$resource('pulmonaire/query{/id}');
      resource.get({
        id: id
      }).then(response => {
        this.pleuro.push(response.body.data)
      })
    },
    getNeuro(id) {
      var resource = this.$resource('neurologic/query{/id}');
      resource.get({
        id: id
      }).then(response => {
        this.neuro.push(response.body.data)
      })
  },
  exam () {
      // Save data in localStorage
      localStorage.setItem('child_id', this.result[0].child)
      localStorage.setItem('exam', 1)
      // Redirect
      this.$router.push({
        name: 'Clinical'
      })
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

.btns {
    margin: 20px 0;
    text-align: center;
    font-size: 130%;
}

.btns a {
    background-color: #e67e22 !important;
    text-decoration: none !important;
    border-radius: 3px;
    border: 1px solid #e67e22;
    padding: 10px 30px;
    font-size: 120%;
    border: none;
    box-shadow: 0 4px 4px rgba(0, 0, 0, .2);
    color: white !important;
    font-weight: 400;
    align-self: center;
    transition: background-color 0.2s;
    width: 50%;
    margin: 35px 20px 15px 20px;
    text-align: center;
}

.btns a:hover,
.btns a:active {
    text-decoration: none;
    background: #bf6516 !important;
}

i {
    margin-left: 5px;
}
</style>
