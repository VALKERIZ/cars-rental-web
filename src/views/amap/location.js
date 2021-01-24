let citySearch = null;

export function SelfLocation(params) {
    //根据IP返回对应城市信息
    if (!citySearch) {
        citySearch = new AMap.CitySearch();
    }
    //自动获取用户IP，返回当前城市
    citySearch.getLocalCity((status, result) => {
        if (status === "complete" && result.info === "OK") {
            //地图显示当前城市
            params.map.setBounds(result.bounds);
            // 计算中心点
            let [one, two] = result.rectangle.split(";");
            let lt = one.split(",");
            let rb = two.split(",");
            const lng = (+rb[0] + +lt[0]) / 2;
            const lat = (+rb[1] + +lt[1]) / 2;
            let center = [lng, lat];
            params.complete &&
                typeof params.complete === "function" &&
                params.complete(center);
        } else {
            //解析定位错误信息
            console.log(result);
        }
    });
}