import clearData from '../helpers/clear-chart';

export function resetChart() {
    let textEls = document.querySelectorAll('text.axis-tick-mark');
    textEls.forEach((tEl) => {
        tEl.style.display = 'none';
    });

    let pathEl = document.querySelectorAll('path.path-line');
    pathEl.forEach((pEl) => {
        pEl.style.display = 'none';
    });
 
    let circleEls = document.querySelectorAll('circle.enabled');
    circleEls.forEach((cEl) => {
        cEl.style.display = 'none';
    });

    let clearKMItdEls = document.querySelectorAll('td');
    clearKMItdEls.forEach((ckdEl) => {
        ckdEl.innerHTML = '';
    });
    
    let clearKMIthEls = document.querySelectorAll('th');
    clearKMIthEls.forEach((ckhEl) => {
        ckhEl.style.display = 'none';
    });

    let liEls = document.querySelectorAll('li');
    liEls.forEach((liEl) => {
        liEl.style.display = 'none';
    });

    let inputEls = document.querySelectorAll('input');
    inputEls.forEach((iEl) => {
        iEl.checked = false;
    });

    clearData.set(1);
}