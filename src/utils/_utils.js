export function tickMarks(maxValue) {
    let tickCeiling;
    let yTickArrayTemp = [];
    let interval = 0;
    let newInterval;
    yTickArrayTemp.push(0);

    if (maxValue > 10 && maxValue < 1000) {
    
        let tickCount = 8;

        let uTsize = maxValue/(tickCount);
        
        let x = Math.ceil(Math.log10(uTsize) -1 );

        let pow10x = Math.pow(10, x);

        let roundedTickRange = Math.ceil(uTsize / pow10x) * pow10x;

        let tempTotal = 0;
        for (var i = 0; tempTotal < maxValue; i++) {
            tempTotal += roundedTickRange;
            yTickArrayTemp.push(tempTotal);
        }

    } else if(maxValue >= 1000 && maxValue <= 10000) {
        let tickCount = 8;

        let uTsize = maxValue/(tickCount);
        
        let x = Math.ceil(Math.log10(uTsize) -1 );

        let pow10x = Math.pow(1000, x);

        let roundedTickRange = Math.ceil(uTsize / pow10x) * pow10x;

        let tempTotal = 0;
        for (var i = 0; tempTotal < maxValue; i++) {
            tempTotal += roundedTickRange / 1000;
            yTickArrayTemp.push(tempTotal);
        }
    
    } else if (maxValue > 10000 && maxValue < 1000000) {

        let tickCount = 8;

        let uTsize = maxValue/(tickCount);
        
        let x = Math.ceil(Math.log10(uTsize) -1 );

        let pow10x = Math.pow(100, x);

        let roundedTickRange = Math.ceil(uTsize / pow10x) * pow10x;

        let tempTotal = 0;
        for (var i = 0; tempTotal < maxValue; i++) {
            tempTotal += roundedTickRange / 1000;
            yTickArrayTemp.push(tempTotal);
        }

    } else if (maxValue < 10) {
        tickCeiling = parseInt(maxValue + 1);
        newInterval = 1;

        let tempTotal = 0;
        for (var i = 0; tempTotal < tickCeiling; i++) {
            tempTotal = i;
            yTickArrayTemp.push(tempTotal);
        }

    }
    
    return yTickArrayTemp;

}

export default tickMarks;