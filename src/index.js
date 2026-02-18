import './index.css'

function initSubscriptionFrom() {
  const form = document.getElementById('subscription_form')
  const input = document.querySelector('input[type=email]')
  const submit = document.querySelector('input[type=submit]')
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
        message.innerText = data.success_text
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

function initLoginForm() {
  const form = document.getElementById('login_form')
  const url = form.action

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    const formData = new FormData(form)

    fetch(url, {
      method: 'POST',
      body: formData
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      })
  })

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
        message.innerText = data.success_text
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
    initLoginForm()
  } else if (document.body.classList.contains('preview')) {
    initPreviewPage()
  }
})
