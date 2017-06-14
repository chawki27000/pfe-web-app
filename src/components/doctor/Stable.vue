<template>
<div>
  <h3>Information Toxicité</h3>

  <div class="row">
    <div class="col-md-12">
      <form class="form-horizontal">

        <div class="form-group">
          <label class="col-md-3 control-label">Heure passée</label>
          <div class="col-md-2">
            <input type="number" min="0" max="23" class="form-control input-md" required="true" v-model.number="taken_hour.hour">
          </div>
          <div class="col-md-2">
            <input type="number" min="0" max="59" class="form-control input-md" required="true" v-model.number="taken_hour.minute">
          </div>
        </div>

        <div class="form-group">
          <label class="col-md-3 control-label">Place de la prise</label>
          <div class="col-md-6">
            <select name="selectbasic" class="form-control" v-model="taken_place">
                    <option value="cuisine">Cuisine</option>
                    <option value="sdb">Salle de bain</option>
                    <option value="ecole">Ecole</option>
                    <option value="rue">Rue</option>
                </select>
          </div>
        </div>

        <div class="form-group">
          <label class="col-md-3 control-label">Seul (non surveillé)</label>
          <div class="col-md-6">
            <input type="checkbox" class="form-control input-md" v-model="alone">
          </div>
        </div>

        <div class="form-group">
          <label class="col-md-3 control-label">Medicament</label>
          <div class="col-md-6">
            <button class="btn-ajout" type="button" name="button" data-toggle="modal" data-target="#drugModal"><i class="ion-android-add-circle"></i></button>
          </div>
        </div>

        <div class="form-group">
          <label class="col-md-3 control-label">Signes</label>
          <div class="col-md-6">
            <button class="btn-ajout" type="button" name="button" data-toggle="modal" data-target="#signModal"><i class="ion-android-add-circle"></i></button>
          </div>
        </div>

      </form>

    </div>
  </div>


  <div class="row">
    <div class="col-md-12">
      <a class="btn-next" @click="submit">Next<i class="ion-arrow-right-a"></i></a>
      <a class="btn-next" @click="toxifunc" data-toggle="modal" data-target="#toxidromeModal">Medicament Inconnu</a>
    </div>
  </div>

  <!-- Modal Declaration -->
  <!-- Modal -->
  <div class="modal fade" id="drugModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div style="width: 48%;" class="modal-dialog" role="document">
      <div style="width: 112%;" class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="myModalLabel">Ajouter un medicament</h4>
        </div>
        <div class="modal-body">

          <table class="table table-striped">
            <thead>
              <tr>
                <th>Selection</th>
                <th>Nom</th>
                <th>Masse</th>
                <th>Categorie</th>
                <th>Quantité</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="d in drugs" :key="d._id">
                <td><input type="checkbox" @click="addDrug(d._id)"></td>
                <td>{{d.name}}</td>
                <td>{{d.masse}} mg</td>
                <td>{{d.category}}</td>
                <td>
                  <input v-bind:id="'quantite_'+d._id" type="number" min="0" value="0">
                </td>
                <td>
                </td>
              </tr>
            </tbody>
          </table>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" data-dismiss="modal" @click="submitDrug">Submit</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Declaration -->
  <!-- Modal -->
  <div class="modal fade" id="signModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="myModalLabel">Ajouter un signe</h4>
        </div>
        <div class="modal-body">

          <table class="table table-striped">
            <thead>
              <tr>
                <th>Selection</th>
                <th>Nom</th>
                <th>Gravité</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="s in sign">
                <td><input type="checkbox" @click="addSign(s)"></td>
                <td>{{s}}</td>
                <td>
                  <select name="selectbasic" class="form-control" v-bind:id="'sign_'+s">
                                  <option value="1">Faible</option>
                                  <option value="2">Medéré</option>
                                  <option value="3">Sévère</option>
                                  <option value="4">Très sévère</option>
                              </select>
                </td>
              </tr>
            </tbody>
          </table>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" data-dismiss="modal" @click="submitSign">Submit</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Toxidrome -->
  <!-- Modal -->
  <div class="modal fade" id="toxidromeModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div style="width: 48%;" class="modal-dialog" role="document">
      <div style="width: 112%;" class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="myModalLabel">Toxidromes Associés</h4>
        </div>
        <div class="modal-body">

          <table class="table table-striped">
            <thead>
              <tr>
                <th>Toxidrome</th>
                <th>Score</th>
                <th>Selection</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="t in toxidrome">
                <td>{{t.toxidrome}}</td>
                <td>{{t.score}}</td>
                <td><a @click="toxiselect(t.toxidrome)" data-dismiss="modal"><i class="ion-ios-bolt"></i></a></td>
              </tr>
            </tbody>
          </table>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import gql from 'graphql-tag'
export default {
  data() {
    return {
      // Other data
      taken_hour: {
        hour: 0,
        minute: 0
      },
      taken_place: '',
      alone: false,
      // Drug Data
      drugs: [],
      select_drug: [],
      drug_tab: [],
      // Sign data
      sign: ['Coma', 'Convulsions', 'Myosis', 'Mydriase', 'Agitation', 'Hallucinations', 'Fièvre',
        'Myoclonies', 'Tremblements', 'Dysarthrie', 'Confusion', 'Paralysie', 'Céphalées',
        'Insomnie', 'Hyperréfléxie', 'Hypokaliémie', 'Palpitation', 'Bronchorrhée', 'Bronchospasme',
        'Bloc auriculo-ventriculaire', 'QT long', 'Trouble de rythme', 'Insuffisance cardiaque', 'Vomissements', 'Diarrhées', 'Douleurs Abdominales', 'Constipation', 'Frisson', 'Rétention Urinaire', 'IRA', 'Insuffisance hépatique', 'Hypoglycémie',
        'Hyperglycémie', 'Alcalose', 'Acidose', 'Hypokaliémie', 'Somnolence', 'Ictère cutano muqueux'
      ],
      select_sign: [],
      sign_tab: [],
      toxidrome: [],
    }
  },
  created() {
    for (var i = 0; i < this.drugs.length; i++) {
      this.drugs[i].value = 0
    }
  },
  apollo: {
    drugs: {
      query: gql `
              query Drugs{drugs {
                _id
                category
                name
                format
                masse
              }}`
    }
  },
  methods: {
    addDrug(id) {

      if (this.select_drug.includes(id)) {
        var index = this.select_drug.indexOf(id)
        console.log("INDEX : " + index);
        this.select_drug.splice(index, 1)
      } else {
        this.select_drug.push(id)
      }
    },
    submitDrug() {
      this.drug_tab = []
      var e = ''
      var str = ''
      for (var i = 0; i < this.select_drug.length; i++) {
        // bluid a drug tab
        e = document.getElementById('dose_' + this.select_drug[i]);

        this.drug_tab.push({
          id: this.select_drug[i],
          val: document.getElementById('quantite_' + this.select_drug[i]).value,
        })
      }
    },
    addSign(sign) {
      if (this.select_sign.includes(sign)) {
        var index = this.select_sign.indexOf(sign)
        this.select_sign.splice(index, 1)
      } else {
        this.select_sign.push(sign)
      }
    },
    submitSign() {
      this.sign_tab = []
      var e = ''
      var str
      for (var i = 0; i < this.select_sign.length; i++) {
        // retreive
        e = document.getElementById('sign_' + this.select_sign[i]);
        str = e.options[e.selectedIndex].value;
        // bluid a drug tab
        this.sign_tab.push({
          sign: this.select_sign[i],
          val: parseInt(str)
        })
      }

    },
    submit() {
      var resource = this.$resource('case/insert');
      resource.save({
        doctor: localStorage.getItem('user_id'),
        child: localStorage.getItem('detail_id'),
        hour: this.taken_hour.hour,
        minute: this.taken_hour.minute,
        taken_place: this.taken_place,
        alone: this.alone,
        drugs: this.drug_tab,
        sign: this.sign_tab,
      }).then(response => {
        // Redirect
        this.$router.push({
          name: 'Paracetamol'
        })
      }, response => {
        console.error(response)
      })
    },
    toxifunc() {
      console.log("Toxidrome");
      var resource = this.$resource('toxidrome/get');
      resource.save({
        child: localStorage.getItem('detail_id'),
        sign: this.sign_tab,
      }).then(response => {
        this.toxidrome = response.body
      }, response => {

      })
    },
    toxiselect(toxidrome) {
        var resource = this.$resource('toxidrome/compare');
        resource.save({
            toxidrome: toxidrome,
            child: localStorage.getItem('child_id')
        }).then(response => {
            console.log(response.body[0].id);
            localStorage.setItem('candidat_id', response.body[0].id)
            this.$router.push({
              name: 'Candidat'
            })
        }, response => {

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

.btn-ajout {
    display: inline-block;
    width: 100%;
    background-color: #2ecc71;
    border: 0;
    color: white;
    border-radius: 3px;
}
</style>
