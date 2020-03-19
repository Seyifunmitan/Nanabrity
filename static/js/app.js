//service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
  .then (function (reg) {
    console.log('SW REGISTERED   --PWA RUNNING')
  }).catch(function (err) {
    console.error(err)
  })
}



function sel(el) {
  let le = document.getElementById(el)
  return le
}

let app = document.getElementById('app')
let game = document.getElementById('game')
let welcome = document.getElementById('welcome')

game.style.display = 'none'

//app
welcome.style.transition = '0.3s ease-in'

let playBtn = document.getElementById('play')
playBtn.addEventListener('click', togglePage)


let prog = sel('progress')
prog.style.width = '0%'

//static/player/Hee.jpeg
questions = [
  {"que": "did you know him ?", "src": "static/player/alan.jpg", "ans": "alan", "q1": "Wong", "q2": "Keane", "q3": "Daves E"},
  {"que": "question three", "src": "static/player/azpli.jpg","ans": "azpli", "q1": "zapacosta", "q2": "invanovic", "q3": "cidwell"},
  {"que": "question three", "src": "static/player/brooks.jpg","ans": "brooks", "q1": "podwell", "q2": "Crooks", "q3": "cidwell"},
  {"que": "question three", "src": "static/player/digne.png","ans": "digne", "q1": "costa", "q2": "godson", "q3": "johnson"},
  {"que": "question two", "src": "static/player/feran.jpg","ans": "feran", "q1": "pedro", "q2": "vera", "q3": "vela"},
  {"que": "question three", "src": "static/player/fushc.jpeg","ans": "fusch", "q1": "oslo", "q2": "invanovic", "q3": "hughes"},
  {"que": "question four", "src": "static/player/gomes.jpg","ans": "gomes", "q1": "gomez", "q2": "andres", "q3": "Dave"},
  {"que": "question three", "src": "static/player/haller.jpg","ans": "haller", "q1": "alex", "q2": "boye", "q3": "rodwell"},
  {"que": "question three", "src": "static/player/harazrd2.jpg","ans": "hazard", "q1": "t.hazard", "q2": "kovavic", "q3": "forlan"},
  {"que": "did you know him ?", "src": "static/player/Hee.jpeg", "ans": "Hee", "q1": "alan smith", "q2": "Keane", "q3": "Digne"},
  {"que": "did you know him ?", "src": "static/player/long.webp", "ans": "longstaff", "q1": "Wong", "q2": "Hee", "q3": "allen"},
  {"que": "did you know him ?", "src": "static/player/jame.jpg", "ans": "Lauren Jame", "q1": "Wong", "q2": "Keane", "q3": "salah"},
  {"que": "did you know him ?", "src": "static/player/hazard.jpg", "ans": "hazard", "q1": "Wong", "q2": "Keane", "q3": "Daves E"}
]



//option btns
let opt1 = sel('one')
let opt2 = sel('two')
let opt3 = sel('three')
let opt4 = sel('four')
let h = sel('h')
let img = sel('img')

let scoreBar = sel('score')


let play
//play btn
function togglePage () {
  game.style.transition = '0.3s ease-in'
  game.style.display = 'flex'
  welcome.style.display = 'none'
  location.href = '/#game'
  play = new Play()
  play.view()
  play.button()

  opt1.addEventListener('click', function() {
    let value = this.innerHTML
    play.update(value)
  })

  opt2.addEventListener('click', function() {
    let value = this.innerHTML
    play.update(value)
  })


  opt3.addEventListener('click', function() {
    let value = this.innerHTML
    play.update(value)
  })


  opt4.addEventListener('click', function() {
    let value = this.innerHTML
    play.update(value)
  })
}

scoreBar.style.color = 'white'
class Play {
  constructor() {
    this.count = 0
    this.score = 0
  }

  view () {
    h.innerHTML = questions[this.count].que
    img.setAttribute('src', questions[this.count].src)
    scoreBar.innerHTML = this.score
  }

  button () {
    let num = Math.floor(Math.random() * 4)
    this.switchBtn(num)
  }

  point () {
    this.point = this.score * 10 
    let p = sel('point')
    p.innerHTML = `${this.point} pts`
  }

  end () {
    console.log(`game over ${this.score}`)
    let end = sel('end')
    end.style.transition = '0.2s ease-in'
    end.style.display = 'block'
    this.point()
  }

  check (value) {
    if (value == questions[this.count].ans) {
      console.log('correct')
      this.score = this.score + 1
      game.style.backgroundColor = 'lightgreen'
      setTimeout(function(){
        game.style.backgroundColor = 'white'
      }, 200)
    }else {
      game.style.backgroundColor = 'red'
      setTimeout(function(){
        game.style.backgroundColor = 'white'
      }, 200)
    }
  }

  update (value) {
    this.check(value)
    this.count = this.count + 1
    this.view()
    this.button()
    if (this.count == questions.length - 1) {
      this.end()
    }
  }

  switchBtn(num) {
    if (num == 1) {
      opt1.innerHTML = questions[this.count].q1
      opt2.innerHTML = questions[this.count].ans
      opt3.innerHTML = questions[this.count].q2
      opt4.innerHTML = questions[this.count].q3
    }else if(num == 2) {
      opt1.innerHTML = questions[this.count].ans
      opt2.innerHTML = questions[this.count].q1
      opt3.innerHTML = questions[this.count].q2
      opt4.innerHTML = questions[this.count].q3
    }else if(num == 3) {
      opt1.innerHTML = questions[this.count].q1
      opt2.innerHTML = questions[this.count].q3
      opt3.innerHTML = questions[this.count].q2
      opt4.innerHTML = questions[this.count].ans
    }else {
      opt1.innerHTML = questions[this.count].q2
      opt2.innerHTML = questions[this.count].q1
      opt3.innerHTML = questions[this.count].q3
      opt4.innerHTML = questions[this.count].ans
    }
    
  }

  

}