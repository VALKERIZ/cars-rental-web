let geolocation = null;

export function SelfLocation(params) {
    //浏览器精确定位
    if (!geolocation) {
        geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, //是否使用高精度定位，默认:true
            timeout: 10000, //超过10秒后停止定位，默认：5s
            zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
            showMarker: false, //定位成功后在定位到的位置显示点标记
            showButton: false, //显示定位按钮
        });
    }
    params.map.addControl(geolocation);
    geolocation.getCurrentPosition((status, result) => {
        if (status == "complete") {
            params.complete &&
                typeof params.complete === "function" &&
                params.complete(result);
        } else {
            //解析定位错误信息
            console.log(error);
        }
    });
}