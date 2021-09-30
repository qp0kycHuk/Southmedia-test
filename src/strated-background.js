const startPath = document.querySelector('.-started-background-1-')
const startPath1 = document.querySelector('.-started-background-2-')


// const tl = new TimelineMax({repeat:-1, repeatDelay: 0.5, })

console.log(MorphSVGPlugin);
// gsap.registerPlugin(MorphSVGPlugin)
//cdnjs.cloudflare.com/ajax/libs/gsap/1.18.0/TweenMax.min.js
// tl.to(startPath, { morphSVG: "#started-background-2",}, "+=1")
// .to(startPath, { morphSVG: "#started-background-3" , }, "+=1")
// .play();

var tl = new TimelineMax({ defaults: { ease: "linear" } })
tl
  .to(startPath, 2, { morphSVG: ".-started-background-2-", ease: "none", duration: 1 }, "+=1")
  .to(startPath, 2, { morphSVG: ".-started-background-3-", ease: "none", duration: 1 }, "+=1")
