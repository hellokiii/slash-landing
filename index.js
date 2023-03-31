let observers = [null, null, null];

function observeSideNavTransition() {
  const sections = document.querySelectorAll('.intersection');
  Array.from(sections).map((section) => {
    const sectionNumber = section.className.match(/section(\d)/)[1];
    observers[sectionNumber - 3]?.disconnect();
    observers[sectionNumber - 3] = new IntersectionObserver(activateStep, {
      threshold: 0.5,
    });
    observers[sectionNumber - 3].observe(section);
  });

  function activateStep(e) {
    const { isIntersecting, intersectionRatio, target, boundingClientRect } = e[0];
    const targetClassName = target.className;
    const sectionNumber = +targetClassName.match(/section(\d)/)[1];
    const activedStep = document.querySelector('.side-nav .active');
    const activatedStepNumber = +activedStep.className.match(/step(\d)/)[1];
    // 스크롤 내려갈때
    if (isIntersecting) {
      if (activatedStepNumber === sectionNumber - 3) {
        document.querySelector('.side-nav .active').classList.remove('active');
        document.querySelector(`.side-nav .step${sectionNumber - 2}`).classList.add('active');
      }
    }
    // 다시 올라갈때
    if (!isIntersecting && intersectionRatio !== 0 && boundingClientRect.top > 0) {
      if (sectionNumber !== 3 && activatedStepNumber === sectionNumber - 2) {
        document.querySelector('.side-nav .active').classList.remove('active');
        document.querySelector(`.side-nav .step${sectionNumber - 3}`).classList.add('active');
      }
    }
  }
}

function setSectionsStickyPosition() {
  Array.from(document.querySelectorAll('section')).map((el) => {
    const { clientHeight } = el;
    const browserHeight = document.documentElement.clientHeight;
    el.style.top = `${Math.min(0, browserHeight - clientHeight)}px`;
  });
}

function setSideNavStickyPosition() {
  const { clientHeight: section3Height } = document.querySelector('.section3');
  const { clientHeight: section4Height } = document.querySelector('.section4');
  const { clientHeight: section5Height } = document.querySelector('.section5');
  const navContainer = document.querySelector('.nav-section');

  navContainer.style.paddingTop = `${section3Height / 2}px`;
  navContainer.style.paddingBottom = `${section5Height / 2}px`;
  navContainer.style.height = `${section3Height + section4Height + section5Height}px`;

  const stickyNav = document.querySelector('.sticky');
  const stickyNavTop = `${document.documentElement.clientHeight / 2 - stickyNav.clientHeight / 2}px`;
  stickyNav.style.top = stickyNavTop;
}

// refresh 후 스크롤 리셋
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
} else {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };
}

addEventListener('load', () => {
  setSectionsStickyPosition();
  observeSideNavTransition();
  setSideSliderEvent();
});

addEventListener('resize', () => {
  setSectionsStickyPosition();
  setSideNavStickyPosition();
  setSideSliderEvent();
});

const section3Video = document.querySelector('video.section3-main');
section3Video.addEventListener('loadeddata', () => {
  setSectionsStickyPosition();
  setSideNavStickyPosition();
});

function setSideSliderEvent() {
  const sideSliderOpenButton = document.querySelector('.open-side-slider');
  console.log(sideSliderOpenButton);
  sideSliderOpenButton.addEventListener('click', () => {
    const sideSlider = document.querySelector('.side-slider');
    sideSlider.classList.add('active');
  });
  const sideSliderCloseButton = document.querySelector('.close-side-slider');
  sideSliderCloseButton.addEventListener('click', () => {
    const sideSlider = document.querySelector('.side-slider');
    sideSlider.classList.remove('active');
  });
}
