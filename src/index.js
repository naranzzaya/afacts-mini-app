import './index.css'
import Cookies from 'js-cookie'
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
        // console.log(data)
        const container = document.createElement('div')

        const message = document.createElement('p')
        message.innerText = data.messages
        message.style.marginTop = '20px'
        message.style.fontSize = '2rem'

        const link = document.createElement('a')
        link.innerText = 'Посмотрите последние Q&A'
        link.href = '/preview.html'

        container.appendChild(message)
        container.appendChild(link)
        form.replaceWith(container)
      })
      .catch((error) => {
        console.error('Ошибка при запросе:', error)
      })
  })
}

function authorizeUser() {
  const jwt = Cookies.get('jwt')

  if (jwt) {
    fetch('http://localhost:3000/api/v1/authorize_by_jwt.json', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
      .then((response) => response.json())

      .then((data) => {
        if (data.is_success && data.jwt) {
          Cookies.set('jwt', data.jwt, { path: '/' })
        }

        console.log(data)
        const element = document.createElement('div')
        element.innerText = `Welcome, ${data.email}`
        document.body.appendChild(element)
      })
      .then((data) => {})
  } else {
    initLoginForm()
  }
}

function initLoginForm() {
  const form = document.getElementById('login_form')
  const url = form.action
  form.classList.remove('hidden')
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

        const container = document.createElement('div')

        const message = document.createElement('p')
        message.innerText = data.messages
        message.style.marginTop = '20px'
        message.style.fontSize = '2rem'

        const link = document.createElement('a')
        link.innerText = 'Посмотрите последние Q&A'
        link.href = '/preview.html'

        container.appendChild(message)
        container.appendChild(link)
        form.replaceWith(container)
      })
      .catch((error) => {
        console.error('Ошибка при запросе:', error)
      })
  })
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
    authorizeUser()
    // initLoginForm()
  } else if (document.body.classList.contains('preview')) {
    initPreviewPage()
  }
})
