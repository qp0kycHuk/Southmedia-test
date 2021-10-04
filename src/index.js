// mask -------------------------------------------------------------------

function maskedInputInit() {
  $('input[type="tel"]').mask('+ 7 (999) 999-99-99');
}

maskedInputInit()

// screen scrolling --------------------------------------------------------

new fullpage('#fullpage', {
  responsiveWidth: 900,
  onLeave: (section) => {
    if (section.item.querySelector('.started')) {
      document.querySelector('.burger').classList.remove('invert-active')
    } else {
      document.querySelector('.burger').classList.add('invert-active')
    }
  }
});



// form submit  ------------------------------------------------------------

function checkFields(form) {
  let isOk = true
  const fields = form.querySelectorAll('input[data-required]')
  for (const i in fields) {
    if (!Object.hasOwnProperty.call(fields, i)) continue
    const input = fields[i]
    if (input.value.trim() == '') {

      isOk = false
      input.classList.add('error')


      const inputHandler = () => input.classList.remove('error')
      input.addEventListener('keypress', inputHandler, { once: true })

    }

  }

  return isOk
}

function submitHandler(event) {
  event.preventDefault()
  const form = event.target
  const isOk = checkFields(form)

  if (!isOk) {
    return
  }

  form.classList.add('submiting')
  console.log('submiting');

  setTimeout(() => {
    form.classList.remove('submiting')

    const message = form.querySelector('.success')
    message.classList.add('active')



  }, 500)


}

document.addEventListener('submit', submitHandler)