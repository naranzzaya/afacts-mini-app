import './index.css'
import Cookies from 'js-cookie'

// Cookies.remove('jwt')

function initSubscriptionFrom() {
  const form = document.getElementById('subscription_form')
  const input = form.querySelector('input[type="email"]')
  const submit = form.querySelector('input[type="submit"]')
  const url = form.action

  submit.addEventListener('click', (e) => {
    e.preventDefault()

    const params = {
      subscriber: {
        email: input.value
      }
    }

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('SUBSCRIBE RESPONSE:', data)

        //старый код
        // const container = document.createElement('div')

        // const message = document.createElement('p')
        // message.innerText = data.messages
        // message.style.marginTop = '20px'
        // message.style.fontSize = '2rem'

        // const link = document.createElement('a')
        // link.innerText = 'Посмотрите последние Q&A'
        // link.href = '/preview.html'

        // container.appendChild(message)
        // container.appendChild(link)
        // form.replaceWith(container)

        //-------
        const container = document.createElement('div')
        container.className = 'M_SubscribeResult'

        const message = document.createElement('p')
        message.className = 'A_SubscribeResultText'

        if (data.success) {
          message.innerText = data.success_text
        } else {
          message.innerText = data.error_text
        }

        const link = document.createElement('a')
        link.className = 'A_SubscribeResultLink'
        link.innerText = 'Посмотреть последние Q&A'
        link.href = '/preview.html'

        container.appendChild(message)

        if (data.success) {
          container.appendChild(link)
        }

        form.replaceWith(container)
        //-----------------
      })
      .catch((error) => {
        console.error('Ошибка при запросе:', error)
      })
  })
}
//старый код function authorizeUser()
// function authorizeUser() {
//   const jwt = Cookies.get('jwt')

//   if (jwt) {
//     fetch('http://localhost:3000/api/v1/authorize_by_jwt.json', {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${jwt}`
//       }
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data)

//         if (data.is_success) {
//           const element = document.createElement('div')
//           element.innerText = `Welcome, ${data.email}`
//           document.body.appendChild(element)
//           // Cookies.set('jwt', data.jwt, { path: '/' })
//         }
//       })
//       .then((data) => {})
//   } else {
//     initLoginForm()
//   }
// }
//-------------
function authorizeUser() {
  const jwt = Cookies.get('jwt')

  if (!jwt) {
    initLoginForm()
    initSignupForm()
    return
  }

  fetch('http://localhost:3000/api/v1/authorize_by_jwt.json', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })
    .then((response) => response.json())
    .then((data) => {
      //старый
      // if (data.is_success) {
      //   showWelcome(data.email)
      // } else {
      //   Cookies.remove('jwt')
      //   initLoginForm()
      // }
      //-----
      console.log('AUTH RESPONSE:', data)

      if (data.is_success) {
        showWelcome(data.email)
        showSignOut(jwt)
      } else {
        Cookies.remove('jwt')
        initLoginForm()
        initSignupForm()
      }
    })
}
//-------------
function initLoginForm() {
  const form = document.getElementById('login_form')
  const url = form.action
  // form.classList.remove('hidden')
  console.log('texttext')

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    const formData = new FormData(form)
    fetch(url, {
      method: 'POST',
      body: formData
      // headers: {
      //   'Content-Type': 'application/json; charset=UTF-8'
      // }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data')
        //старый код
        //-------------
        // const container = document.createElement('div')

        // const message = document.createElement('p')
        // message.innerText = data.messages
        // message.style.marginTop = '20px'
        // message.style.fontSize = '2rem'

        // container.appendChild(message)
        // container.appendChild(link)
        // form.replaceWith(container)

        //-------------
        if (!data.is_success) {
          alert(data.messages)
          return
        }
        if (data.jwt) {
          Cookies.set('jwt', data.jwt, { path: '/' })
          window.location.reload()
        } else {
          alert('Нет jwt в ответе сервера')
        }
        //-------------
      })
      .catch((error) => {
        console.error('Ошибка при запросе:', error)
      })
  })
}
function initSignupForm() {
  const form = document.getElementById('signup_form')
  const url = form.action
  console.log('texttext')

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    const formData = new FormData(form)
    fetch(url, {
      method: 'POST',
      body: formData
      // headers: {
      //   'Content-Type': 'application/json; charset=UTF-8'
      // }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data')
        //старый код
        //-------------
        // const container = document.createElement('div')

        // const message = document.createElement('p')
        // message.innerText = data.messages
        // message.style.marginTop = '20px'
        // message.style.fontSize = '2rem'

        // container.appendChild(message)
        // container.appendChild(link)
        // form.replaceWith(container)

        //-------------
        if (!data.is_success) {
          alert(data.messages)
          return
        }
        if (data.jwt) {
          Cookies.set('jwt', data.jwt, { path: '/' })
          window.location.reload()
        } else {
          alert('Нет jwt в ответе сервера')
        }
        //-------------
      })
      .catch((error) => {
        console.error('Ошибка при запросе:', error)
      })
  })
}
function initAuthSwitch() {
  const loginForm = document.getElementById('login_form')
  const signupForm = document.getElementById('signup_form')
  const btnShowSignup = document.getElementById('show_signup')
  const btnShowLogin = document.getElementById('show_login')

  if (!loginForm || !signupForm) return

  const showLogin = () => {
    loginForm.classList.remove('hidden')
    signupForm.classList.add('hidden')
  }

  const showSignup = () => {
    signupForm.classList.remove('hidden')
    loginForm.classList.add('hidden')
  }

  btnShowSignup?.addEventListener('click', showSignup)
  btnShowLogin?.addEventListener('click', showLogin)
}
//new function to show text after log in
function showWelcome(email) {
  const form = document.getElementById('login_form')

  if (form) form.remove()

  const welcome = document.createElement('div')
  welcome.className = 'W_Welcome'
  welcome.innerText = `Привет, ${email}!`

  document.querySelector('.coming_soon').appendChild(welcome)
}
//-------------
function showSignOut(jwt) {
  const container = document.querySelector('.coming_soon')

  const btn = document.createElement('button')
  btn.className = 'A_SignOut'
  btn.type = 'button'
  btn.innerText = 'Выйти'

  btn.addEventListener('click', () => {
    fetch('http://localhost:3000/api/v1/sign_out.json', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
      .then((r) => r.json())
      .then(() => {
        Cookies.remove('jwt')
        window.location.reload()
      })
  })

  container.appendChild(btn)
}
function initPreviewPage() {
  const container = document.querySelector('.posts')
  const url = container.dataset.url
  fetch(url).then((response) =>
    response.json().then((data) => {
      console.log(data)
    })
  )
}
document.addEventListener('DOMContentLoaded', () => {
  if (document.body.classList.contains('index')) {
    initSubscriptionFrom()
    initAuthSwitch()
    authorizeUser()
    initLoginForm()
    initSignupForm()
  } else if (document.body.classList.contains('preview')) {
    initPreviewPage()
  }
})
