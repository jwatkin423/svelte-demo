import clearData from '../helpers/clear-chart';

export function resetChart() {
    // tick marks for both charts
    let textEls = document.querySelectorAll('text.axis-tick-mark');
    textEls.forEach((tEl) => {
        tEl.style.display = 'none';
    });

    // tick marks above bars
    let textPTEls = document.querySelectorAll('text.point-text');
    textPTEls.forEach((tEl) => {
        tEl.style.display = 'none';
    });

    // path / line for the line grpahs
    let pathEl = document.querySelectorAll('path.path-line');
    pathEl.forEach((pEl) => {
        pEl.style.display = 'none';
    });
 
    // circle points
    let circleEls = document.querySelectorAll('circle.enabled');
    circleEls.forEach((cEl) => {
        cEl.style.display = 'none';
    });

    // KMI table cells
    let clearKMItdEls = document.querySelectorAll('td');
    clearKMItdEls.forEach((ckdEl) => {
        ckdEl.innerHTML = '';
    });
    
    // KMI table header cells
    let clearKMIthEls = document.querySelectorAll('th');
    clearKMIthEls.forEach((ckhEl) => {
        ckhEl.style.display = 'none';
    });

    // sidebar/"hamburger" links
    let liEls = document.querySelectorAll('li');
    liEls.forEach((liEl) => {
        liEl.style.display = 'none';
    });

    // clear out all checked
    let inputEls = document.querySelectorAll('input');
    inputEls.forEach((iEl) => {
        iEl.checked = false;
    });

    // bars from the bar grpahs
    let rectEls = document.querySelectorAll('rect');
    rectEls.forEach((rEl) => {
        rEl.style.display = 'none';
    });

    clearData.set(1);
}