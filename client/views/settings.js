var html = require('choo/html')
const NavBar = require('../components/navbar');

module.exports = view



function view (state, emit) {

  function showSettings(){
    if(state.user.authenticated){
      return html`
        <section>
          <form class="w-100">
              <fieldset class="br1 mb2">
                <legend class="br-pill f7 pa1 ba">description</legend>
                <input class="w-100" value="" placeholder="user description">
              </fieldset>
              <fieldset class="br1 mb2">
                <legend class="br-pill f7 pa1 ba">profile image</legend>
                <input class="w-100" value="" placeholder="user description">
              </fieldset>
              <input type="submit" value="save changes">
          </form>
        </section>
      `
    }else{
      return html`
        <section>
          <p>Hey! Looks like you're either not logged in or you haven't made an account.</p>
          <p>Go to <a href="/login">login</a> or create a <a href="/signup">new account</a></p>
        </section>
      `
    }
  }


  return html`
  <body class="w-100 h-100 code lh-copy bg-white ma0 flex flex-column items-center">
  <!-- NavBar Top -->
  ${state.cache(NavBar, "NavBar", state, emit).render()}
  <!-- MAIN -->
  <main class="w-100 h-100 flex flex-column items-center mw8 pa4">
    <section class="flex flex-column w-100 h-100">
      <h2>Settings</h2>
      ${showSettings()}
    </section>
  </main>
</body>   
  `
}