import Demo from './Demo';

function initDemo(element: Element): Demo {
  const options = {
    isRange: (element.getAttribute('data-is-range') === 'true'),
    isTipsHidden: (element.getAttribute('data-tips-hidden') === 'true'),
    maxValue: Number(element.getAttribute('data-max-value')),
    minValue: Number(element.getAttribute('data-min-value')),
    orientation: element.getAttribute('data-orientation'),
    startValueHigh: Number(element.getAttribute('data-start-high')),
    startValueLow: Number(element.getAttribute('data-start-low')),
    step: Number(element.getAttribute('data-step')),
  };

  const sliderElement = $(element.querySelector('.js-slider') as HTMLElement);
  const panelElement = element.querySelector('.js-panel') as HTMLElement;

  const demo = new Demo(sliderElement, panelElement, options);
  return demo;
}

const demoList = document.getElementsByClassName('js-demo');

for (let index = 0; index < demoList.length; index += 1) {
  initDemo(demoList[index]);
}
