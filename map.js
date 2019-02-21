
/* create by go78 */

$(function () {
    mapAPI();
});

function mapAPI() {

    var config = {
        keys: {
            google: 'AIzaSyDGDhUmuKte8OZKNSoon8SVbVXW5XkmyoA',
            kakao: 'e6337d075bac312a03c730c6ac9f07ba',
            naver: 'EAqK3WVEOmA97egYolQJ'
        }
    }

    var goggleMap = [],
        kakaoMap = [],
        naverMap = [];

    function getDataParse(el) {
        var type = $(el).data('type');
        var lat = $(el).data('lat');
        var lng = $(el).data('lng');
        var marker = $(el).data('marker');
        var level = $(el).data('level');

        return {
            type: type,
            lat: lat,
            lng: lng,
            marker: marker,
            level: level
        }
    }

    if (config.keys.google) {
        var url = '//maps.googleapis.com/maps/api/js?key=' + config.keys.google + '&region=KR';
        $.getScript(url, function (e) {
            document.write = oldDocumentWrite;
            $("[data-name='map'][data-type='google']").each(function (index, el) {
                var data = getDataParse($(this));
                var center = {
                    lat: data.lat,
                    lng: data.lng
                }
                goggleMap[index] = new google.maps.Map(el, {
                    center: center,
                    zoom: data.level
                });
                if (data.marker) {
                    var marker = new google.maps.Marker({
                        position: center,
                        map: goggleMap[index]
                    });
                }
            });
        });
    }

    if (config.keys.kakao) {
        var oldDocumentWrite = document.write;
        document.write = function (node) {
            $("body").append(node)
        }
        var url = '//dapi.kakao.com/v2/maps/sdk.js?appkey=' + config.keys.kakao;
        $.getScript(url, function (e) {
            setTimeout(function () {
                document.write = oldDocumentWrite;
                $("[data-name='map'][data-type='kakao']").each(function (index, el) {
                    var data = getDataParse($(this));
                    var center = new daum.maps.LatLng(data.lat, data.lng);
                    kakaoMap[index] = new daum.maps.Map(el, {
                        center: center,
                        level: data.level
                    });
                    if (data.marker) {
                        var marker = new daum.maps.Marker({
                            position: center
                        });
                        marker.setMap(kakaoMap[index])
                    }
                });
            }, 500);
        });
    }

    if (config.keys.naver) {
        var url = '//openapi.map.naver.com/openapi/v3/maps.js?clientId=' + config.keys.naver;
        $.getScript(url, function () {
            $("[data-name='map'][data-type='naver']").each(function (index, el) {
                var data = getDataParse($(this));
                var center = new naver.maps.LatLng(data.lat, data.lng);
                naverMap[index] = new naver.maps.Map(el, {
                    center: center,
                    zoom: data.level
                });
                if (data.marker) {
                    var marker = new naver.maps.Marker({
                        position: center,
                        map: naverMap[index]
                    });
                }
            });
        });
    }
}