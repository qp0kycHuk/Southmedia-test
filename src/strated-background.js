const startId = '#started-background-start'
const endId = '#started-background-end'


var tl = new TimelineMax({
  defaults: { ease: "linear" }, onStart: () => {
    setTimeout(() => {
      document.querySelector('.burger').classList.add('invert')
      if (document.querySelector('.started').closest('.section.active')) { document.querySelector('.burger').classList.add('invert-active') }

    }, 3000)
    setTimeout(() => {
      document.querySelector('.logo').classList.add('invert')
      if (document.querySelector('.started').closest('.section.active')) { document.querySelector('.logo').classList.add('invert-active') }
      
    }, 2500)
  }
})

tl.to(startId, 10, { morphSVG: { shape: endId, type: "rotational" } }, "+=2")

