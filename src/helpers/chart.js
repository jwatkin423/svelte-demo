import { writable } from 'svelte/store';

const chartData = writable(
    {
        "p_color": "",
        "s_color": "",
        "mls_codes": false,
        "title": "",
        "publicUrlActive": false,
        "mlsName": "",
        "mlsUserSlug": "",
        "logo_url": "",
        "strDisclaimer": "",
        "mlsId": "",
        "broker_sponcer_url": null,
        "userType": "broker",
        "keys": [],
        "chartData": {},
        "year": "",
        "reportPeriod": [],
        "product_title": "",
        "status": ""
      }
      
);

export default chartData;