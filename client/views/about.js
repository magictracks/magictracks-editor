var html = require('choo/html')

var NavBar = require('../components/navbar')

module.exports = view

function view (state, emit) {
  return html`
    <body class="w-100 h-100 code lh-copy bg-white ma0 flex flex-column items-center">
      <!-- NavBar Top -->
      ${state.cache(NavBar, "NavBar", state, emit).render()}
      <!-- MAIN -->
      <main class="w-100 h-100 flex flex-column items-center mw8">
      <!-- row1 -->
      <section class="flex-m flex-l flex-ns flex-column items-start justify-center flex-wrap-l flex-wrap-m pt4 pl4">
          <!-- left -->
          <section class="pb2 pt2 flex flex-column bg-white w-50-l w-100-m w-100-ns justify-center">
            <h1 class="pa0 ma0 f1 lh-solid">What makes your idea magical?</h1>
          </section>
          <!-- right -->
          <section class="pa0 flex flex-row bg-white w-100-l w-100-m w-100-ns justify-center pt4 flex-wrap">
            <div class="w-50-l w-100-m w-100-ns pr4">
              <p>The Magic Tracks project is a community and webspace of creatives and curious makers dedicated to curating playlists for learning.</p>
              <p>This open educational experiment aims to help people understand what it means to turn an idea into reality and to uncover the magic behind those ideas.</p>
              <p>Whether you're new to a topic or an expert, sometimes it's hard to know how to puzzle together all of the pieces that make up an idea. It's also hard to know what you need to know when approaching a new idea.</p>
              <p>The Magic Tracks project is a web application and methodology for you and your collaborators to reuse and organize existing web references - e.g. tutorials, videos, etc - into playlists that help you to learn all the things you need to make your unique idea come true.</p>
            </div>
            <div class="w-50-l w-100-m w-100-ns pl2 pr2">
              
              <p>Why do we need another app for this? The reality is that we don't. However, here at ITP, we're looking at new ways to enhance sharing and reuse of the learning materials that our students, faculty, residents, and staff are producing and/or have found useful from our friends across the web.</p>
              <p>We're excited to see how Magic Tracks can help you learn!</p>
              <p>- Joey, Dan, Shawn, and friends</p>

              <small>Interested to know more about the project? Read our <a href="#">blog post about the project (coming soon)</a></small>
            </div>
          </section>
      </section> <!-- row1 -->

      <!-- row2 -->
      <section class="w-100 flex-m flex-l flex-ns flex-column items-start justify-center flex-wrap-l flex-wrap-m pt4 pl4 mt4">
          <!-- left -->
          <section class="pb2 pt2 flex flex-column bg-white w-100 w-50-l w-100-m w-100-ns justify-center">
            <h1 class="pa0 ma0 f1 lh-solid">How does it work?</h1>
          </section>
          <!-- right -->
          <section class="pa0 flex flex-row bg-white w-100 w-100-l w-100-m w-100-ns justify-center pt4 flex-wrap">
            <div class="w-100 w-50-l w-100-m w-100-ns pr4">
                <p>Here's a little video about how to use the Magic Tracks.</p>
                <p>
                  <ol>
                    <li>Create a new playlist for your idea</li>
                    <li>Search for sections that speak to your idea or create new ones</li>
                    <li>Add collaborators to your playlist for help</li>
                    <li>Fill in your sections with resources found within Magic Tracks and across the web</li>
                    <li>Update and edit titles, descriptions, tags, to tie your references together.</li>
                    <li>Make all the things!</li>
                  </ol>
                </p>
            </div>
            <div class="w-100 w-50-l w-100-m w-100-ns pl2 pr2">
                <div class="w-100 h-100 bg-pink flex justify-center center items-center flex-column">video coming soon!</div>
            </div>
          </section>
      </section> <!-- row2 -->

      <!-- row2 -->
      <section class="w-100 flex-m flex-l flex-ns flex-column items-start justify-center flex-wrap-l flex-wrap-m pt4 pl4 mt4">
          <!-- left -->
          <section class="pb2 pt2 flex flex-column bg-white w-100 w-50-l w-100-m w-100-ns justify-center flex-wrap">
            <h1 class="pa0 ma0 f1 lh-solid">Support & Acknowledgements</h1>
          </section>
          <!-- right -->
          <section class="pa0 flex flex-row bg-white w-100 w-100-l w-100-m w-100-ns justify-start pt4">
          <div class="w-100 w-50-l w-100-m w-100-ns pr4">
            <p>The Magic Tracks is supported and maintained by NYU's Intertelecommunications Program. The project was materialized by Joey Lee and friends through ITP's <a href="https://tisch.nyu.edu/itp/itp-people/faculty/somethings-in-residence-sirs" target="_blank">Something in Residence Program</a> under the supervision of Shawn Van Every, Dan Shiffman, and Dan O'Sullivan.</p>
            <p>Contributions and support by Rik Smith & Alejandro Matamala.</p>
            </div>
          </section>
      </section> <!-- row2 -->
      </main>
    </body>
  `
}