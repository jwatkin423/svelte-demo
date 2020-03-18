import { tick } from "svelte";
import { max } from "d3";

export function tickMarks(maxValue) {
    let tickCeiling;
    let yTickArrayTemp = [];
    let interval = 0;
    let newInterval;
    let addInterval = 0;
    let roundedTickRange = 0;
    let increment = 0;
    yTickArrayTemp.push(0);
    let maxCeilDiff = 0;
    let increment20 = 0;
    
    // 10 to 40 
    if (maxValue > 10 && maxValue < 40) {
        tickCeiling = Math.ceil(maxValue / 10) * 10;
        increment = 5;

        let tempTotal = 0;
        for (var i = 0; tempTotal < tickCeiling; i++) {
            tempTotal += increment;
            yTickArrayTemp.push(tempTotal);
        }
        
        maxCeilDiff = (tickCeiling - maxValue);
        increment20 = increment * 0.2;
        
        if(maxCeilDiff < increment20) {
            tempTotal += increment;
            yTickArrayTemp.push(tempTotal);
        }

    } 
    
    // 41 to 99
    else if (maxValue >= 40 && maxValue < 100) {    
        tickCeiling = Math.ceil(maxValue / 10) * 10;

        increment = 10;

        if (tickCeiling >= 50) {
            increment = 20;
        }

        let tempTotal = 0;
        for (var i = 0; tempTotal < tickCeiling; i++) {
            tempTotal += increment;
            yTickArrayTemp.push(tempTotal);
        }

        maxCeilDiff = (tickCeiling - maxValue);
        increment20 = increment * 0.2;
        
        if(maxCeilDiff < increment20) {
            tempTotal += increment;
            yTickArrayTemp.push(tempTotal);
        }
        
    } 
    
    // 100 to 999
    else if(maxValue >= 100 && maxValue < 1000) {
        tickCeiling = Math.ceil(maxValue / 100) * 100;
        
        increment = 50;

        if (tickCeiling >= 500) {
            increment = 100;
        }

        if (tickCeiling >= 800) {
            increment = 200;
        }

        let tempTotal = 0;
        for (var i = 0; tempTotal < tickCeiling; i++) {
            tempTotal += increment;
            yTickArrayTemp.push(tempTotal);
        }

        maxCeilDiff = (tickCeiling - maxValue);
        increment20 = increment * 0.2;
        

        if(maxCeilDiff < increment20) {
            tempTotal += increment;
            yTickArrayTemp.push(tempTotal);
        }

    } 
    
    // 1,000 to 9,999
    else if(maxValue >= 1000 && maxValue < 10000) {
        tickCeiling = Math.ceil(maxValue / 1000) * 1000;
        
        increment = 1000;
        if (tickCeiling >= 9000 ) {
            increment = 2000;
        }

        let tempTotal = 0;
        for (var i = 0; tempTotal < tickCeiling; i++) {
            tempTotal += increment;
            yTickArrayTemp.push(tempTotal);
        }
        
        maxCeilDiff = (tickCeiling - maxValue);
        increment20 = increment * 0.2;
        

        if(maxCeilDiff < increment20) {
            tempTotal += increment;
            yTickArrayTemp.push(tempTotal);
        }

    } 
    
    // 10,000 to 99,999
    else if (maxValue > 10000 && maxValue < 100000) {
        tickCeiling = Math.ceil(maxValue / 10000) * 10000;
        
        increment = 5000;

        if (tickCeiling >= 50000) {
            increment = 10000;
        }

        if (tickCeiling >= 90000 ) {
            increment = 20000;
        }

        let tempTotal = 0;
        for (var i = 0; tempTotal < tickCeiling; i++) {
            tempTotal += increment;
            yTickArrayTemp.push(tempTotal);
        }

        maxCeilDiff = (tickCeiling - maxValue);
        increment20 = increment * 0.2;
        

        if(maxCeilDiff < increment20) {
            tempTotal += increment;
            yTickArrayTemp.push(tempTotal);
        }

    } 
    
    // 100,000 to < 1M
    else if(maxValue >= 100000 && maxValue < 1000000) {
        tickCeiling = Math.ceil(maxValue / 100000) * 100000;
        
        // 50K
        increment = 50000;

        // 450K
        if (tickCeiling >= 450000) {
            // 100K
            increment = 100000;
        }

        // 900K
        if (tickCeiling >= 900000 ) {
            // 200K
            increment = 200000;
        }

        let tempTotal = 0;
        for (var i = 0; tempTotal < tickCeiling; i++) {
            tempTotal += increment;
            yTickArrayTemp.push(tempTotal);
        }
        
        maxCeilDiff = (tickCeiling - maxValue);
        increment20 = increment * 0.2;
        if(maxCeilDiff < increment20) {
            tempTotal += increment;
            yTickArrayTemp.push(tempTotal);
        }    

    } 
    
    // MILLIONS

    // 1M to 9.9M
    else if(maxValue >= 1000000 && maxValue < 10000000) {
        tickCeiling = Math.ceil(maxValue / 1000000) * 1000000;
        
        // 500K
        increment = 500000;

        if (tickCeiling >= 4500000 ) {
            // 1M
            increment = 1000000;
        }

        if (tickCeiling >= 90000000 ) {
            // 2M
            increment = 2000000;
        }

        let tempTotal = 0;
        for (var i = 0; tempTotal < tickCeiling; i++) {
            tempTotal += increment;
            yTickArrayTemp.push(tempTotal);
        }
        
        maxCeilDiff = (tickCeiling - maxValue);
        increment20 = increment * 0.2;
        

        if(maxCeilDiff < increment20) {
            tempTotal += increment;
            yTickArrayTemp.push(tempTotal);
        }

    } 
    
    // 10M to < 100M
    else if (maxValue > 10000000 && maxValue < 100000000) {
        tickCeiling = Math.ceil(maxValue / 10000000) * 10000000;
        
        // 5M
        increment = 5000000;

        // 45M
        if (tickCeiling >= 45000000) {
            // 10M
            increment = 10000000;
        }

        // 90M
        if (tickCeiling >= 90000000 ) {
            // 20M
            increment = 20000000;
        }

        let tempTotal = 0;
        for (var i = 0; tempTotal < tickCeiling; i++) {
            tempTotal += increment;
            yTickArrayTemp.push(tempTotal);
        }

        maxCeilDiff = (tickCeiling - maxValue);
        increment20 = increment * 0.2;
        

        if(maxCeilDiff < increment20) {
            tempTotal += increment;
            yTickArrayTemp.push(tempTotal);
        }

    } 
    
    // 10M to < 100M
    else if(maxValue >= 100000 && maxValue < 1000000) {
        tickCeiling = Math.ceil(maxValue / 100000) * 100000;
        
        increment = 100000;

        if (tickCeiling >= 500000) {
            increment = 100000;
        }

        if (tickCeiling >= 900000 ) {
            increment = 200000;
        }

        let tempTotal = 0;
        for (var i = 0; tempTotal < tickCeiling; i++) {
            tempTotal += increment;
            yTickArrayTemp.push(tempTotal);
        }
        
        maxCeilDiff = (tickCeiling - maxValue);
        increment20 = increment * 0.2;
        

        if(maxCeilDiff < increment20) {
            tempTotal += increment;
            yTickArrayTemp.push(tempTotal);
        }    
        


    } 
    
    // 100M to < 1B
    else if(maxValue >= 100000000 && maxValue < 1000000000) {
        tickCeiling = Math.ceil(maxValue / 100000000) * 100000000;
        
        // 50M
        increment = 50000000;

        if (tickCeiling >= 45000000) {
            // 100M
            increment = 100000000;
        }

        if (tickCeiling >= 900000 ) {
            // 200M
            increment = 200000000;
        }

        let tempTotal = 0;
        for (var i = 0; tempTotal < tickCeiling; i++) {
            tempTotal += increment;
            yTickArrayTemp.push(tempTotal);
        }
        
        maxCeilDiff = (tickCeiling - maxValue);
        increment20 = increment * 0.2;
        

        if(maxCeilDiff < increment20) {
            tempTotal += increment;
            yTickArrayTemp.push(tempTotal);
        }    
    } 

    // END OF MILLIONS

    // BILLIONS

    // 1B to 9.9B
    else if(maxValue >= 1000000000 && maxValue < 10000000000) {
        tickCeiling = Math.ceil(maxValue / 1000000000) * 1000000000;
        
        // 500M
        increment = 500000000;

        if (tickCeiling >= 4500000000 ) {
            // 1B
            increment = 1000000000;
        }

        if (tickCeiling >= 9000000000 ) {
            // 2B
            increment = 2000000000;
        }

        let tempTotal = 0;
        for (var i = 0; tempTotal < tickCeiling; i++) {
            tempTotal += increment;
            yTickArrayTemp.push(tempTotal);
        }
        
        maxCeilDiff = (tickCeiling - maxValue);
        increment20 = increment * 0.2;
        

        if(maxCeilDiff < increment20) {
            tempTotal += increment;
            yTickArrayTemp.push(tempTotal);
        }

    } 
    
    // 10B to < 100B
    else if (maxValue > 10000000000 && maxValue < 100000000000) {
        tickCeiling = Math.ceil(maxValue / 10000000000) * 10000000000;
        
        // 5B
        increment = 5000000000;

        // 45B
        if (tickCeiling >= 45000000000) {
            // 10B
            increment = 10000000000;
        }

        // 90B
        if (tickCeiling >= 90000000000 ) {
            // 20B
            increment = 20000000000;
        }

        let tempTotal = 0;
        for (var i = 0; tempTotal < tickCeiling; i++) {
            tempTotal += increment;
            yTickArrayTemp.push(tempTotal);
        }

        maxCeilDiff = (tickCeiling - maxValue);
        increment20 = increment * 0.2;
        

        if(maxCeilDiff < increment20) {
            tempTotal += increment;
            yTickArrayTemp.push(tempTotal);
        }

    } 
    
    // 100B to < 1T
    else if (maxValue > 100000000000 && maxValue < 1000000000000) {
        tickCeiling = Math.ceil(maxValue / 100000000000) * 100000000000;
        
        // 50B
        increment = 50000000000;

        // 450B
        if (tickCeiling >= 45000000000) {
            // 100B
            increment = 100000000000;
        }

        // 900B
        if (tickCeiling >= 900000000000 ) {
            // 200B
            increment = 200000000000;
        }

        let tempTotal = 0;
        for (var i = 0; tempTotal < tickCeiling; i++) {
            tempTotal += increment;
            yTickArrayTemp.push(tempTotal);
        }

        maxCeilDiff = (tickCeiling - maxValue);
        increment20 = increment * 0.2;
        

        if(maxCeilDiff < increment20) {
            tempTotal += increment;
            yTickArrayTemp.push(tempTotal);
        }

    } 
        
   // END OF BILLIONS

    else if (maxValue <= 10) {
        tickCeiling = parseInt(maxValue + 1);
        newInterval = 1;

        // set the tick celing to 10
        // to limit the tick marks
        if (tickCeiling == 9) {
            tickCeiling = 10;
        }

        if (tickCeiling == 10) {
            newInterval = 2;
        }
        
        maxCeilDiff = (tickCeiling - maxValue);
        increment20 = increment * 0.2;
        

        let tempTotal = 0;
        for (var i = 0; tempTotal < tickCeiling; i++) {
            tempTotal += newInterval;
            yTickArrayTemp.push(tempTotal);
        }

        maxCeilDiff = (tickCeiling - maxValue);
        increment20 = increment * 0.2;
        console.log(tickCeiling, maxValue, maxCeilDiff, increment, increment20);
        if(maxCeilDiff < increment20) {
            tempTotal += increment;
            yTickArrayTemp.push(tempTotal);
        }  

    }
    
    return yTickArrayTemp;

}

export default tickMarks;