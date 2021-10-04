function range(selector) {
  const covers = document.querySelectorAll(selector)
  Array.from(covers).map((cover) => {
    const options = {}
    options.min = +cover.getAttribute('data-min') || 0
    options.max = +cover.getAttribute('data-max') || 100
    options.from = +cover.getAttribute('data-from') || options.min
    options.to = +cover.getAttribute('data-to') || options.max
    options.type = cover.getAttribute('data-type') || 'single'
    options.inner = cover.querySelector('.range-inner') || cover
    options.renderValue = cover.querySelector('.range-value')
    options.renderSign = cover.querySelector('.range-sign')
    options.inputFrom = cover.querySelector('.range-input-from')
    options.inputTo = cover.querySelector('.range-input-to')

    if (options.type == 'single') options.from = options.min
    if (options.from < options.min) options.from = options.min
    if (options.to > options.max) options.to = options.max



    addElements(options)
    addListeners(options)
    render(options)






  })







  function addElements(options) {
    const line = document.createElement('div')
    line.classList.add('range-line')
    options.inner.appendChild(line)
    options.line = line

    const progress = document.createElement('div')
    progress.classList.add('range-progress')
    options.inner.appendChild(progress)
    options.progress = progress

    const nextBtn = document.createElement('button')
    nextBtn.classList.add('range-btn')
    options.inner.appendChild(nextBtn)
    options.nextBtn = nextBtn

    if (options.type == 'double') {
      const prevBtn = document.createElement('button')
      prevBtn.classList.add('range-btn')
      options.inner.appendChild(prevBtn)
      options.prevBtn = prevBtn
    }
  }

  function addListeners(options) {
    options.inner.addEventListener('mousedown', (event) => {
      if (event.button !== 0) return
      const currentValue = (event.offsetX / options.inner.getBoundingClientRect().width) * (options.max - options.min) + options.min
      const key = setFromTo(options, currentValue)
      render(options)
      document.body.style.userSelect = 'none'

      const moveHandler = (event) => {
        const left = options.inner.getBoundingClientRect().left
        const moveValue = ((event.clientX - left) / options.inner.getBoundingClientRect().width) * (options.max - options.min) + options.min
        setFromTo(options, moveValue, key)
        render(options)


        options.progress && (options.progress.style.transition = '0s')
        options.nextBtn && (options.nextBtn.style.transition = '0s')
        options.prevBtn && (options.prevBtn.style.transition = '0s')
        options.renderSign && (options.renderSign.style.transition = '0s')

      }
      document.addEventListener('mousemove', moveHandler)
      document.addEventListener('mouseup', () => {
        document.body.style.userSelect = ''

        options.progress && (options.progress.style.transition = '')
        options.nextBtn && (options.nextBtn.style.transition = '')
        options.prevBtn && (options.prevBtn.style.transition = '')
        options.renderSign && (options.renderSign.style.transition = '')

        document.removeEventListener('mousemove', moveHandler)
      })



    })
  }




  function setFromTo(options, value, key) {
    let result = ''
    if (key) {
      options[key] = value
      result = key
    } else if (value >= options.to || options.type == 'single') {
      options.to = value
      result = 'to'
    } else if (value <= options.from) {
      options.from = value
      result = 'from'
    } else {
      if ((options.to - value) < -(options.from - value)) {
        options.to = value
        result = 'to'
      } else {
        options.from = value
        result = 'from'
      }
    }

    if (options.to <= options.from && result == 'from') options.to = options.from
    if (options.to <= options.from && result == 'to') options.from = options.to
    if (options.to > options.max) options.to = options.max
    if (options.to < options.min) options.to = options.min
    if (options.from < options.min) options.from = options.min
    if (options.from > options.max) options.from = options.max

    options.inputFrom.value = options.from
    options.inputTo.value = options.to

    return result
  }


  function render(options) {
    const innerWidth = options.inner.getBoundingClientRect().width
    const left = (options.from - options.min) / (options.max - options.min) * innerWidth
    const right = (options.to - options.min) / (options.max - options.min) * innerWidth
    options.nextBtn.style.left = right + 'px'
    options.progress.style.left = left + 'px'
    options.progress.style.width = right - left + 'px'
    if (options.type == 'double') {
      options.prevBtn.style.left = left + 'px'
    }

    if (options.type == 'double' && options.renderValue) options.renderValue.innerHTML = Math.floor(options.from) + ' — ' + Math.floor(options.to)
    if (options.type == 'single' && options.renderValue) options.renderValue.innerHTML = Math.floor(options.to)

    if (options.renderSign) {
      const sign = options.renderSign
      const signWidth = sign.getBoundingClientRect().width
      let signLeft = 0

      if (options.type == 'single') {
        signLeft = right - signWidth / 2

      } else if (options.type == 'double') {
        signLeft = left + (right - left) / 2 - signWidth / 2

      }

      if (signLeft < 0) signLeft = 0
      if ((signLeft + signWidth) > innerWidth) signLeft = innerWidth - signWidth
      sign.style.left = signLeft + 'px'
    }


  }

}

range('.range')