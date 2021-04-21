//javascript function(s) for animations etc.
setTimeout(deleteBootAnimation, 1000)
function deleteBootAnimation() {
  let bootAnimation = document.getElementById("bootAnimationId")
  console.log(bootAnimation)
  if (bootAnimation) 
    bootAnimation.remove()
}
