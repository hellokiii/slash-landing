function setSectionsStickyPosition() {
  Array.from(document.querySelectorAll('section.sticky')).map((el) => {
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

  const stickyNav = document.querySelector('nav.sticky');
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
  setSideSliderEvent();
  addEventListener('scroll', handleScroll);
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
  sideSliderOpenButton.addEventListener('click', (e) => {
    e.stopPropagation();
    const sideSlider = document.querySelector('.side-slider');
    sideSlider.classList.add('active');
  });

  const main = document.querySelector('main');
  const sideSliderCloseButton = document.querySelector('.close-side-slider img');
  main.addEventListener('click', (e) => {
    const sideSlider = document.querySelector('.side-slider');
    sideSlider.classList.remove('active');
  });
  sideSliderCloseButton.addEventListener('click', (e) => {
    const sideSlider = document.querySelector('.side-slider');
    sideSlider.classList.remove('active');
  });
}

function handleScroll() {
  const sections = document.querySelectorAll('.section');
  const currentVisibleSection =
    Array.from(sections)
      .map((section) => {
        const sectionNumber = section.className.match(/section(\d)/)[1];
        const sectionStickyTop = ~~section.style.top.match(/-?\d+/)?.[0] ?? 0;
        const sectionCurrentTop = section.getBoundingClientRect().top;
        return {
          sectionNumber,
          sectionStickyTop,
          sectionCurrentTop,
        };
      })
      .find(({ sectionStickyTop, sectionCurrentTop }) => sectionCurrentTop > sectionStickyTop) ?? {};

  const { sectionNumber = 6, sectionCurrentTop = 0 } = currentVisibleSection;
  if (sectionNumber > 1 && sectionNumber < 6) {
    const previouseSection = document.querySelector(`.section${sectionNumber - 1}`);
    const previouseSectionHeight = previouseSection.clientHeight;
    const opacity = Math.min(1, (sectionCurrentTop - 10) / (previouseSectionHeight / 2));
    previouseSection.style.opacity = opacity;
  }

  if (sectionNumber >= 3 && sectionNumber <= 5) {
    document.querySelector('.side-nav .active').classList.remove('active');
    document.querySelector(`.side-nav .step${sectionNumber - 2}`).classList.add('active');
  }
}

function getScrollTop() {
  if (!document.body) return 0;
  const scrollTop = document.documentElement ? document.documentElement.scrollTop || document.body.scrollTop : document.body.scrollTop;
  return scrollTop;
}
