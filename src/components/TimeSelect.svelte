<script>

let timeValues = [
    {description: '1 Year', value: 13},
    {description: '3 Years', value: 37},
    {description: 'Mnth/YTD', value: ''}
];
/* http://staging.jw/market_area_trends/10/59?
mlsId=BRIGHTMLS&
search=normal&
timePeriod=mth&
timePeriodValue=13&
areaType=Counties&
areaValueList=Accomack,Adams,Albemarle,Alexandria%20City,Allegany,Allegheny,Amherst,Anne%20Arundel,Appomattox,Arlington,Atlantic,Augusta&
propertyTypeList=5,10,12,15,20,25,30,35,40,45,50
&areaValuesDisplayText=Accomack,Adams,Albemarle,Alexandria%20City,Allegany,Allegheny,Amherst,Anne%20Arundel,Appomattox,Arlington,Atlantic,Augusta&
propertyTypeDisplayText=Detached,Row/Townhouse,Condominium,Unit/Flat/Apartment,End%20of%20Row/Townhouse,Twin/Semi-Detached,Other,Manufactured,Penthouse%20Unit/Flat/Apartment,Mobile%20Pre%201976,Garage/Parking%20Space&search_enable_flag=MQ==

*/

</script>

<style>

    div.option-wrapper {
        height: 20px;
        line-height: 10px;
    }

    div.option-wrapper > input {
        display: inline-block;
    }

    label {
        height: 20px;
        line-height: 20px;
        font-size: 10px;
        position: relative;
        display: inline-block;
        vertical-align: middle;
        margin-bottom: 5px;
    } 

    input {
        height: 20px;
        line-height: 20px;
        font-size: 10px;
        position: relative;
        display: inline-block;
        margin-left: 10px;
        margin-right: 5px;
        margin-top: 0px;
        margin-bottom: 0px;
    }  

    .done-btn {
        margin-top: 0;
        height: 30px;
        line-height: 30px;
        vertical-align: middle;
        margin-right: 10px;
        margin-bottom: 5px;
    }

    .pull-right {
        float: right;
    }


</style>



