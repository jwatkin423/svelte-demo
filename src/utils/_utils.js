export function tickMarks(maxValue) {

    let tickCeiling;
    let yTickArrayTemp = [];
    let interval = 0;
    let newInterval;

    yTickArrayTemp.push(0);

    if (maxValue > 10) {
    
        // set the intial interval for the ticks
        interval = parseInt((Math.ceil(maxValue / 10) * 10) / 8);
    
        // set upperbound for the ticks
        tickCeiling = (Math.ceil(maxValue / 10) * 10);

        if(interval < 10) {
            newInterval = 5;
        } else {
            // set the interval for ticks
            newInterval = Math.ceil((tickCeiling / 8) / 10) * 10;
        }

    } else {
        tickCeiling = parseInt(maxValue + 1);
        newInterval = 1;
    }
    
    let tempTotal = 0;
    for (var i = 0; tempTotal < tickCeiling; i++) {
        tempTotal += newInterval;
        yTickArrayTemp.push(tempTotal);
    }

    
    // yTickArrayTemp.push(maxValue);
    return yTickArrayTemp;

}

export default tickMarks;