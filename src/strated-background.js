const startId = '#started-background-start'
const endId = '#started-background-end'


MorphSVGPlugin.convertToPath(startId)
MorphSVGPlugin.convertToPath(endId)

console.log(MorphSVGPlugin);
// gsap.registerPlugin(MorphSVGPlugin)
//cdnjs.cloudflare.com/ajax/libs/gsap/1.18.0/TweenMax.min.js
// tl.to(startPath, { morphSVG: "#started-background-2",}, "+=1")
// .to(startPath, { morphSVG: "#started-background-3" , }, "+=1")
// .play();

var tl = new TimelineMax({ defaults: { ease: "linear" } })
tl
  // .to(startId, 2, { morphSVG: '#started-background-1', ease: "none", duration: 3 })
  .to(startId, 2, { morphSVG: endId,  duration: 3 }, "+=2")
  
