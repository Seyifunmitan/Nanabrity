//WP IS THE DB
//THIS FILE IS THE VIEW
//APP.JS CONTROLS THE VIEW OF THIS APP BASED ON THE METHODS
//AND FUNCTION FROM THE CONTROLLER API.JS FILE

//SERVICE WORKER 
//service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
  .then (function (reg) {
    console.log('SW REGISTERED   --PWA RUNNING')
  }).catch(function (err) {
    console.error(err)
  })
}

//NAV TOGGLE
let menuToggle = document.getElementById("menu-toggle");
menuToggle.style.display = "none";
const navBar = {
  toggle: true,
  hamBtn: document.getElementById("ham"),

  onToggle: function() {
    this.hamBtn.addEventListener("click", () => {
      if (this.toggle == true) {
        menuToggle.style.display = "flex";
        menuToggle.style.transition = "width ease-in 0.2s";
        this.toggle = false;
      } else {
        menuToggle.style.display = "none";
        this.toggle = true;
      }
    });
  }
};

//INIT APP
let app = new WpApp();

//GET ALL ROUTES
app.appRoute();

if (app.page === "home") {
  //FETCH ALL POST AND RENDER IT TO THE DOM
  app.fetchPosts(({ id, featured_media, title }) => {
    app.loadImage(featured_media, src => {
      let postCard = `
          <div onclick="single.openPost(${id})" class="card">
            <div class="card-image">
                <img src=${src} alt="image" />
            </div>
            <h1 onclick="single.openPost(${id})">${title.rendered}</h1>
            <span>By Nana Time</span>
          </div>
          `;

      document.getElementById("post-wrapper").innerHTML += postCard;
    });
  });

  let nextBtn = document.getElementById("next");
  nextBtn.addEventListener("click", () =>
    app.nextPage(({ id, featured_media, title }) => {
      document.getElementById("post-wrapper").innerHTML = "";
      app.loadImage(featured_media, src => {
        let postCard = `
          <div onclick="single.openPost(${id})" class="card">
            <div class="card-image">
                <img src=${src} alt="image" />
            </div>
            <h1 onclick="single.openPost(${id})">${title.rendered}</h1>
            <span>By Nana Time</span>
          </div>
          `;
        document.getElementById("post-wrapper").scrollTop
        document.getElementById("post-wrapper").innerHTML += postCard;
      });
    })
  );


  let prevBtn = document.getElementById("prev");
  prevBtn.addEventListener("click", () =>
    app.prevPage(({ id, featured_media, title }) => {
      document.getElementById("post-wrapper").innerHTML = "";
      app.loadImage(featured_media, src => {
        let postCard = `
          <div onclick="single.openPost(${id})" class="card">
            <div class="card-image">
                <img src=${src} alt="image" />
            </div>
            <h1 onclick="single.openPost(${id})">${title.rendered}</h1>
            <span>By Nana Time</span>
          </div>
          `;
        document.getElementById("post-wrapper").scrollTop
        document.getElementById("post-wrapper").innerHTML += postCard;
      });
    })
  );


  app.jamLoad((data) => {
    let c = 0
    let jam = document.getElementById('jam')
    //console.log(data[0].title.rendered)
     jam.innerHTML = data[c].title.rendered
    setInterval(() => {
       c += 1
      jam.innerHTML = data[c].title.rendered
      if (c == 4) {
        c = 0
      }
    }, 5000)
  })
}



if (app.page === "page") {
  //PAGE LOAD METHOD
  app.pageLoad(({ id, title, categories, featured_media }) => {
    let cont = document.getElementById("post-wrap");
    //let temp = `<img src="${src}" alt="image" />`;
    //console.log(categories)
    if (categories[0] == 5 || categories[0] == 1) {
      app.loadImage(featured_media, src => {
        //console.log(src)
        let template = `
     <div onclick="single.openPost(${id})" class="home-post">
        <div class="home-post-card-image" id="post-card-img">
           <img src="${src}" alt="image" />
        </div>
        <div class="home-post-card-content">
            <h1 onclick="single.openPost(${id})">${title.rendered}</h1>
        </div>
    </div>
  `;
        cont.innerHTML += template;
      });
    }
  });
}

if (app.page === "single") {
  //single post
  app.loadSinglePost(({ featured_media, title, content }) => {
    app.loadImage(featured_media, src => {
      let wrapper = document.getElementById("wrapper");
      let singlePostCard = `
       <div class="single-post-container">
          <div class="single-image" id="image-wrap">
            <img src="${src}" alt="single post image" />
          </div>
          <div class="single-content">
              <div class="content-space">
                  <h1>${title.rendered}</h1>
                  ${content.rendered}
              </div>
              <div class="plugin-one"></div>
          </div>
      </div>
      `;
      wrapper.innerHTML += singlePostCard;
    });
  });

  app.loadRelated(({ id, title, featured_media }) => {
    app.loadImage(featured_media, src => {
      let relatedWrap = document.getElementById("related-wrap");
      let temp = `
        <div onclick="single.openPost(${id})" class="related-card">
          <div class="related-card-image">
              <img src="${src}" alt="related">
          </div>
          <div class="related-card-content">
              <h4>${title.rendered}</h4>
          </div>
        </div>
    `;
      relatedWrap.innerHTML += temp;
    });
  });

  app.loadRelated(({ id, title, featured_media }) => {
    app.loadImage(featured_media, src => {
      let relatedWrapTwo = document.getElementById('related-wrap-two')
      let temp = `
        <div onclick="single.openPost(${id})" class="related-card">
          <div class="related-card-image">
              <img src="${src}" alt="related">
          </div>
          <div class="related-card-content">
              <h4>${title.rendered}</h4>
          </div>
        </div>
    `;
      relatedWrapTwo.innerHTML += temp
    });
  });
}

//SIDEBAR VIEWS
let sideBarDiv = document.getElementById("sidebar-wrapper-lm");
let sideBarDivLa = document.getElementById("sidebar-wrapper-la");
let sideBarDivG = document.getElementById("sidebar-wrapper-g");

//CALL SIDEBAR METHODS AND RENDER THE VIEW
app.sideBar(latestPost => {
  const { id, title, categories } = latestPost;

  if (categories[0] === 1 || categories[0] === 5) {
    let li = `<li><a onclick="single.openPost(${id})" href="#">${title.rendered}</a></li>`;
    sideBarDiv.innerHTML += li;
  }

  if (categories[0] === 5 || categories[0] === 4) {
    let li = `<li><a onclick="single.openPost(${id})" href="#">${title.rendered}</a></li>`;
    sideBarDivLa.innerHTML += li;
  }

  if (categories[0] === 4 || categories[0] === 3) {
    let li = `<li><a onclick="single.openPost(${id})" href="#">${title.rendered}</a></li>`;
    sideBarDivG.innerHTML += li;
  }
});