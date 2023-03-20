const options = {
  rootMargin: '100px',
  threshold: 1.0,
};
function activateStep3(e) {
  const observerEntry = e[0];
  const targetClassName = observerEntry.target.className;
  const sectionNumber = targetClassName.match(/section(\d)/)[1];
  const stepClass = `step${sectionNumber - 2}`;

  if (observerEntry.isIntersecting) {
    console.log(targetClassName, observerEntry.isIntersecting, observerEntry.intersectionRatio);
    document.querySelector('.side-nav .active').classList.remove('active');
    document.querySelector(`.side-nav .${stepClass}`).classList.add('active');
  }
}
let observer = new IntersectionObserver(activateStep3, options);
let section3 = document.querySelector('.section3');
let section4 = document.querySelector('.section4');
let section5 = document.querySelector('.section5');
observer.observe(section3);
observer.observe(section4);
observer.observe(section5);

if ('content' in document.createElement('template')) {
  // Instantiate the table with the existing HTML tbody
  // and the row with the template
  const section1Bottom = document.querySelector('.section1-bottom');
  const template = document.querySelector('#ios-banner');

  // Clone the new row and insert it into the table
  const clone = template.content.cloneNode(true);


  section1Bottom.appendChild(clone);

} else {
  console.log('stop');
}
