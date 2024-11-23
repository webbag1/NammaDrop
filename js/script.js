window.addEventListener('scroll', function() {
  const image = document.querySelector('.moving-image');
  const section4 = document.querySelector('.section4');
  
  // Detect when section2 is in view
  const section2Top = section4.getBoundingClientRect().top;

  if (section2Top <= window.innerHeight - 300 ) {
    image.classList.add('scrolled'); // Animate image to section 2
  } else {
    image.classList.remove('scrolled'); // Reset if not in view
  }
});
const bars = document.querySelector('.fa-bars');
const xmark = document.querySelector('.fa-xmark');
const listt = document.querySelector('.mobOptionList');
function mobHeaderOpen() {
  bars.style.display = 'none';
  xmark.style.display = 'flex';
  listt.style.display = 'flex';
}
function mobHeaderClose() {
  bars.style.display = 'flex';
  xmark.style.display = 'none';
  listt.style.display = 'none';
}