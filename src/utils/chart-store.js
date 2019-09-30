import { writable } from 'svelte/store';

const chartData = writable([{x:0, y:0}]);

export default chartData;