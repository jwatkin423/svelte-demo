import chartData from '../helpers/chart';
import { tickMarks } from '../utils/_utils';

let ddsData;

const d = chartData.subscribe(cData  => {
    ddsData = cData;
});

let yTicks = '';

let title = ddsData.title;
let chartTitle;
let barData = '';
let barChartData = '';
let yT = [];
let mappedPoints;
let mPoints;
$: mappedPoints = mPoints;

$: barData = barChartData;
$: yT = [...yTicks];

export function drawChart(event, initial = 0) {
    let key = '';

	if (initial) {
		key = event;
	} else {
		key = event.detail.text;
	}

	const setData = ddsData.chartData[key].data;
	let dt = setData.map((d) => {return d});

	barChartData = {
	 	data: dt,
	 	key: key,
	 	label: ddsData.chartData[key].label,
		p_color: ddsData.p_color
	};

	chartTitle = ddsData.chartData[key].label;
	
	mPoints = setData.map( (el, i) => {
				el /= 1;
			return {y: el, x: i};
	});
	yTicks = processPoints(setData);

}

function processPoints (data) {
	let tmpEl = '';
	let maxValue = Math.max.apply(null, data);
	return tickMarks(maxValue);
}