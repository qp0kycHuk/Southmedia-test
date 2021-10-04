window.addEventListener('mousemove', function (event) {
  if (!event.target.closest('.parallax-container')) return
  const container = event.target.closest('.parallax-container')
  const items = container.querySelectorAll('.parallax-item')

  for (const i in items) {
    if (!Object.hasOwnProperty.call(items, i)) return
    const speed = items[i].getAttribute('data-speed') || 0.5
    const x = speed * -event.clientX / window.innerWidth;
    const y = speed * -event.clientY / window.innerHeight;
    items[i].style.transform = 'translate(' + x * 50 + 'px, ' + y * 50 + 'px)';



  }


});