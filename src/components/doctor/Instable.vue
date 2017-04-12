<template>
<div class="row instable">
  <div class="row" v-if="emergency">
    <section>
      <h2>Signe d'urgence</h2>
      <p class="alert">Les enfants présentant des signes d'urgence nécessitent un traitement  immédiat si l'on veut éviter leur décès.</p>
      <p>administrer un (des) traitement(s),  faire un prélèvement de sang pour des examens de laboratoire en urgence (glycémie, frottis sanguin/goutte épaisse, hémoglobine)</p>
    </section>
  </div>
  <div class="row" v-if="airway">
    <section>
      <h2>Voie aérienne</h2>
      <p class="alert">Cyanose ou détresse respiratoire sévère</p>
      <div class="row photo">
          <p>Dégager les voies aériennes</p>
          <img src="../../../static/img/instable/diag_4.png">
      </div>
      <div class="row photo">
          <p>Administrer de l'oxygène</p>
          <img src="../../../static/img/instable/diag_5.png">
      </div>
      <p class="parag">Garder l'enfant au chaud</p>
    </section>
  </div>
  <div class="row" v-if="trc">
    <section>
      <h2>Temps de recoloration</h2>
      <div class="row photo">
          <p>Administrer de l'oxygène</p>
          <img src="../../../static/img/instable/diag_5.png">
      </div>
      <p class="parag">Garder l'enfant au chaud </p>
      <div class="row photo">
          <p>Rechercher une veine et commencer à  administrer rapidement des liquide </p>
          <img src="../../../static/img/instable/diag_7.png">
      </div>
      <p class="alert">Rappel: S'il n'est pas possible de poser une voie IV périphérique, placer une perfusion dans la jugulaire externe ou en intra-osseuse</p>
    </section>
  </div>
  <div class="row" v-if="neuro">
    <section>
      <h2>Etat neurologique</h2>
      <p></p>
    </section>
  </div>
    <div class="row btns">
        <a @click="send('improve')">Amélioration</a>
        <a @click="send('complication')">Complication</a>
        <a @click="send('fail')">Echec</a>
    </div>

</div>
</template>

<script>
export default {
    data() {
        return {
            emergency: false,
            airway: false,
            trc: false,
            neuro: false
        }
    },
    mounted () {
        var resource_result = this.$resource('result/query{/id}')
        var result_id = localStorage.getItem('result_id')

        // extract Result DATA
        resource_result.get({id: result_id}).then(response => {
            // emergency state
            var cynose = localStorage.getItem('pleuro_cynose')
            if (response.body.data.hemo.fc === "Bradycardie" ||
                response.body.data.hemo.fc === "Tachycardie" ||
                cynose) {
                    this.emergency = true
            }

            // airway state
            var rythme = localStorage.getItem('pleuro_rythme')
            if (rythme === "sighs" || rythme === "irregular") {
                this.airway = true
            }

            // TRC state
            var trc = localStorage.getItem('hemo_trc')
            if (trc > 3) {
                this.trc = 3
            }

            // neuro state
            // TODO: Neuro
        })
    },
    methods: {
        back() {
            this.$parent.$data.next = 1
        },
        send(feedback) {
            if (feedback === 'improve'){
                this.$router.push({name: 'Stable'})
            }
            else if (feedback === 'complication' || feedback === 'fail') {
                console.log("abdeka");
                this.back()
            }
            // var result_id = localStorage.getItem('result_id')
            // var resource_result = this.$resource('result/update{/id}{/param}')
            //
            // resource_result.get({id: result_id, param: feedback}).then(response => {
            //     console.log(response);
            //     if (response.body.success){
            //         console.log("SUCESS");
            //     }
            //     else {
            //         console.log("FAIL");
            //     }
            // })

        }
    }
}
</script>

<style>
.instable h2 {
    margin: 0 auto;
    width: 100%;
    color: black;
}

section {
    margin: 15px;
    margin-bottom: 30px;
    border: 2px solid grey;
    padding-top: 20px;
    border-radius: 4px;
    text-align: center;
}

.alert {
    margin: 15px auto;
    border: 1px solid #e74c3c;
    width: 70%;
    background-color: rgba(231, 76, 60,0.2);
}

.instable p {
    font-size: 110%;
}


.photo img {
    display: inline-block;
    width: 550px;
}

.photo p {
    display: inline-block;
    vertical-align: middle;
    width: 40%;
    font-size: 180%;
    border: 1px solid black;
    padding: 10px 0;
    border-radius: 5px;
    margin-right: 15px;
}

.parag {
    display: block;
    width: 40%;
    font-size: 180%;
    border: 1px solid black;
    padding: 10px 0;
    border-radius: 5px;
    margin: 15px auto;
}

.btn-signin
.btn-signin:link,
.btn-signin:visited {
    display: block;
    background-color: #ccc;
    text-decoration: none !important;
    border-radius: 3px;
    border: 1px solid #555;
    padding: 10px 30px;
    font-size: 120%;
    border: none;
    box-shadow: 0 4px 4px rgba(0, 0, 0, .2);
    color: #555;
    font-weight: 400;
    align-self: center;
    transition: background-color 0.2s;
    width: 50%;
    margin: 35px auto 15px auto;
    text-align: center;

}

.btns {
    margin: 20px 0;
    text-align: center;
}

.btns a {
    background-color: #ccc;
    text-decoration: none !important;
    border-radius: 3px;
    border: 1px solid #555;
    padding: 10px 30px;
    font-size: 120%;
    border: none;
    box-shadow: 0 4px 4px rgba(0, 0, 0, .2);
    color: #555;
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
    background: #f6f7f9;
}

</style>
