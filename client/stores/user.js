const feathersClient = require('../feathersClient.js');

module.exports = store

store.storeName = 'user'
function store (state, emitter) {
  const auth = new Auth();

  state.user = {
    username: "",
    id: "",
    authenticated:""
  }

  state.events.user_signup = 'user:signup';
  state.events.user_login = 'user:login';
  state.events.user_logout = 'user:logout';


  // LISTENERS
  emitter.on('DOMContentLoaded', function () {
    // SIGNUP
    emitter.on(state.events.user_signup, auth.signup);
    // LOGIN
    emitter.on(state.events.user_login, auth.login);
    // LOGOUT
    emitter.on(state.events.user_logout, auth.logout);
  })

  // AUTH FUNCTIONS
  function Auth(){
    // SIGNUP
    this.signup = function(_formData){
      let credentials = {
        username: _formData.get("username"),
        email: _formData.get("email"),
        password: _formData.get("password")
      }
      feathersClient.service('users').create(credentials).then( () =>{
        console.log("sign up successful yo!")
        emitter.emit(state.events.user_login, _formData)
      }).catch(err => {
        console.log("sign up unsuccessful! something went wrong!")
        return error;
      });
    };

    // LOGIN
    this.login = function(_formData){
      if (!_formData) {
        feathersClient.authenticate().then( authResponse => {
          // try to auth using JWT from local Storage
          state.user.username = authResponse.username;
          state.user.id = authResponse._id;
          state.user.authenticated = true;
          emitter.emit("pushState", "/edit")
        }).catch(err => {
          console.log("not auth'd friend!")
          state.user.authenticated = false;
          emitter.emit("pushState", "/login")
        });
    } else {
      // If we get login information, add the strategy we want to use for login
        let credentials = {
          username: _formData.get("username"),
          email: _formData.get("email"),
          password: _formData.get("password")
        }
        // create the payload
        const payload = Object.assign({
          strategy: 'local'
        }, credentials);

        feathersClient.authenticate(payload).then(authResponse => {
          state.user.authenticated = true;
          state.user.username = authResponse.username;
          state.user.id = authResponse._id;
          emitter.emit("pushState", "/edit")
        }).catch(err => {
          // Show login page (potentially with `e.message`)
          console.log('Authentication error', err);
          state.user.authenticated = false;
          emitter.emit("pushState", "/")
        });
      }
    };

    // LOGOUT
    this.logout = function(){
      feathersClient.logout();
      // TODO: clear the state of data, etc
      emitter.emit('pushState',  "/");
    };

  } // end Auth()
}