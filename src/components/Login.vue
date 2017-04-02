<template>
<div>
  <header>
    <div class="container">
      <div class="row">
        <h2>Alpha Project</h2>
      </div>

      <div class="row form-div">
          <p v-show="alert">Username and password do not match.</p>
        <form class="form-login">
          <label for="username"><i class="ion-person"></i> Username</label>
          <input type="text" name="username" placeholder="Your username" v-model="username">

          <label for="password"><i class="ion-locked"></i> Password</label>
          <input type="password" name="password" placeholder="Your password" v-model="password">
        </form>
            <a href="#" class="btn-signin" @click="submit"><i class="ion-lock-combination"></i>Sign in</a>
      </div>


    </div>
  </header>
</div>
</template>

<script>
import router from '../router/index'

export default {
  data() {
    return {
      username: '',
      password: '',
      alert: false,
    }
  },
  methods: {
    submit: function() {
      console.log("username: " + this.username + " | password: " + this.password);
      this.$http.options.emulateJSON = true;

      var obj = {
        username: this.username,
        password: this.password
      }

      this.$http.post("http://localhost:3000/auth/login/", obj, {
        emulateJSON: true,
      }).then(function(response) {
        if (!response.data.success) {
          this.alert = true
        } else {
          this.alert = false
          console.log(response.data);
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('username', this.username)
          localStorage.setItem('user_id', response.data.id)
          this.$router.push('/dash')
        }
      }, function(response) {
        console.log("error : " + JSON.stringify(response));
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
header {
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('../../static/img/doctor.jpg');
  /*background-color: #3498db;*/
  background-size: cover;
}

h2 {

  display: block;
  width: 23%;
  margin: 80px auto;
  font-size: 250%;
  letter-spacing: 3px;
  word-spacing: 2px;
  font-weight: 100;
  color: #fff;
  border: 1px solid #fff;
  padding: 8px;
  border-radius: 3%;
}

.form-div {
  height: auto;
  width: 320px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.55);
  padding: 20px;
  margin: 0 auto;
}

label[for=username]{
    margin-top: 20px;
}

input,
label {
  margin: 0 auto;
  display: block;
}

.form-login input {
  width: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .2);
  border-radius: 3px;
  border: 1px solid #d4d8e3;
  padding: 8px;
  color: #83888e;
  height: 38px;
  margin-bottom: 13px;
}

.form-login label {
  margin-bottom: 3px;
  color: #7b8087;
  line-height: 22px;
  font-weight: 400;
}


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

i {
    margin-right: 5px;
}

.btn-signin:hover,
.btn-signin:active {
    background: #f6f7f9;
}

.form-div p {
    background-color: rgba(254,70,77,.2);
    border-color: #fe464d;
    color: #aa0107;
    padding: 9px 10px;
    margin: 20px;
    border-style: solid;
    border-width: 1px;
    border-radius: 3px;
    overflow: hidden;
    line-height: 1.3em;
    text-align: center;
}

</style>
