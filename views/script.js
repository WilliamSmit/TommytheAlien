//javascript function(s) for animations etc.
setTimeout(deleteBootAnimation, 1000)
function deleteBootAnimation() {
  let bootAnimation = document.getElementById("bootAnimationId")
  if (bootAnimation) 
    bootAnimation.remove()
}

// setTimeout(turnLightOn, 1000)
// function turnLightOn() {
//   let powerLight = document.getElementById("powerLight")
//     powerLight.remove()
// }