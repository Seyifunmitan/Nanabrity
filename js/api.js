//the app back engine
//where i make all fetch and return a callback function to render the dom in app.js file
//this file contains the convertable wp class
//THE CONTROLLER FILE

//NANABRITY.COM V0.1. 0

class WpApp {
  constructor() {
    this.url = `http://newsite.local/wp-json/wp/v2/posts`;
    navBar.onToggle();
    this.location = location.href;
    this.homeNo = 1;
  }

  appRoute() {
    //console.log(this.location);
    if (this.location === `http://127.0.0.1:5501/`) {
      this.page = "home";
    }

    if (
      this.location === `http://127.0.0.1:5501/page/album.html` ||
      this.location === `http://127.0.0.1:5501/page/music.html` ||
      this.location === `http://127.0.0.1:5501/page/video.html` ||
      this.location === `http://127.0.0.1:5501/page/video.html`
    ) {
      this.page = "page";
    }

    if (this.location === `http://127.0.0.1:5501/singlepost.html`) {
      this.page = "single";
    }
  }

  //fetch post and generate post card
  fetchPosts(fun) {
    fetch(`${this.url}?page=${this.homeNo}`)
      .then(res => res.json())
      .then(data => {
        data.map(post => {
          return fun(post);
        });
      });
  }

  nextPage(fun) {
    this.homeNo = this.homeNo + 1;
    fetch(`${this.url}?page=${this.homeNo}`)
      .then(res => res.json())
      .then(data => {
        data.map(post => {
          return fun(post);
        });
      });
  }

  prevPage(fun) {
    this.homeNo = this.homeNo - 1;
    if (this.homeNo < 1) {
      this.homeNo = 1
      fetch(`${this.url}?page=${this.homeNo}`)
      .then(res => res.json())
      .then(data => {
        data.map(post => {
          return fun(post);
        });
      });
    } else {
      fetch(`${this.url}?page=${this.homeNo}`)
      .then(res => res.json())
      .then(data => {
        data.map(post => {
          return fun(post);
        });
      });
    }
  }

  //Sidebar function
  sideBar(fun) {
    fetch("http://newsite.local/wp-json/wp/v2/posts?page=1")
      .then(res => res.json())
      .then(data => {
        let firstFive = data.splice(0, 7);
        //console.log(firstFive)
        firstFive.filter(post => {
          return fun(post);
        });
      });
  }

  //Loading Page Posts
  pageLoad(dom) {
    fetch("http://newsite.local/wp-json/wp/v2/posts?page=1")
      .then(res => res.json())
      .then(data => {
        data.map(post => {
          return dom(post);
        });
      });
  }

  //load post image by id
  loadImage(id, fun) {
    fetch(`http://newsite.local/wp-json/wp/v2/media/${id}`)
      .then(res => res.json())
      .then(function(data) {
        let src = data.guid.rendered;
        return fun(src);
      });
  }

  //load single post
  loadSinglePost(view) {
    let id = single.getSession();
    fetch(`http://newsite.local/wp-json/wp/v2/posts/${id}`)
      .then(res => res.json())
      .then(post => {
        return view(post);
      });
  }

  loadRelated(vue) {
    fetch("http://newsite.local/wp-json/wp/v2/posts?page=1")
      .then(res => res.json())
      .then(data => {
        let rand = Math.floor(Math.random() * 3);
        let four = data.splice(rand, 4);
        four.map(post => {
          vue(post);
        });
      });
  }

  jamLoad(view) {
    fetch(this.url).then(res => res.json()).then(data => {
      let five = data.splice(0, 5)
      view(five)
    })
  }

}



//Single Pages Methods
//make use of sessions
//load pages accordingly
const single = {
  id: null,

  openPost: function(id) {
    this.storeSession(id);
    console.log(single);
    location.href = "../singlepost.html";
  },

  storeSession: function(id) {
    sessionStorage.setItem("current-post", id);
    this.id = id;
  },

  getSession: function() {
    return sessionStorage.getItem("current-post");
  }
};
