getWeather();

function getWeather()
{
    $.getJSON('https://www.tianqiapi.com/api/?version=v9&appid=72111455&appsecret=52wluyOR', function (result) {
        var update_time = Date.parse(result.update_time);
        update_time = getTime(update_time);
        $('#txt-location').append(result.city);
        //$('.weather-header-time').html(update_time + ' 更新');
        $('#logo').html(setWeatherIcon(result.data[0].wea));

        $('#f2').html(setWeatherIcon(result.data[1].wea));
        $('#weather').html(result.data[0].wea);

        //$('.tianqi_bg').css('background-image', setBgImg(result.data[0].wea));
        $('body').css('background-image', setBgImg(result.data[0].wea));
        $('.hide').html('中央气象局' + update_time + ' 发布');
        $('#txt-weather').html(result.data[0].wea);
        $('.positive').html(result.data[0].hours[0].tem);

        $('.txt').html(result.data[0].hours[0].win+'&nbsp;'+result.data[0].hours[0].win_speed);
        $('#value').html(result.data[0].air_level);
        $('.show txt').html('湿度&nbsp;' + result.data[0].humidity);
        
        $('#').html('');
        var str = '';
        var tianqi_icon = setWeatherIcon(result.data[0].wea);
        var wea = result.data[0].wea;
        var tem = result.data[0].hours[0].tem;
        var week = '今天';
        for (var i = 0; i < 3; i++)
        {
            if (i > 0) {
                tianqi_icon = setWeatherIcon(result.data[i].hours[0].wea);
                week = result.data[i].week;
                wea = result.data[i].hours[0].wea;
                tem = result.data[i].hours[0].tem;
            }
            str +='<ul>\n' +
                '            <li>'+week+'</li>\n' +
                '            <li>'+tianqi_icon+'</li>\n' +
                '            <li class="text">'+wea+'</li>\n' +
                '            <li>'+tem+'</li>\n' +
                '        </ul>';
        }
        $('#').html(str);
     })
}

// 根据天气设置背景图片
function setBgImg(wea)
{
    var bg_img = '';
    if (wea.indexOf("晴") >= 0) {
        bg_img = 'url("./images/bg/qingtian.jpg"';
    } else if (wea.indexOf("雷") >= 0) {
        bg_img = 'url("./images/bg/lei.gif"';
    } else if (wea.indexOf("雨") >= 0) {
        bg_img = 'url("./images/bg/rain.gif"';
    } else if (wea.indexOf("多云") >= 0) {
        if (wea.indexOf("雨") >= 0) {
            bg_img = 'url("./images/bg/rain.gif"';
        } else {
            bg_img = 'url("./images/bg/qingtian.jpg"';
        }
    } else {
        bg_img = 'url("./images/bg/qingtian.jpg"';
    }
    return bg_img;
}

// 根据天气设置图标
function setWeatherIcon(wea)
{
    var wea_img = '';
    if (wea.indexOf("晴") >= 0) {
        if (wea.indexOf("雨") >= 0) {
            wea_img = '<img src="./images/icon/clearr.png" class="logo"/>';
        } else if (wea.indexOf("云") >= 0) {
            wea_img = '<img src="./images/icon/clear.png" class="logo"/>';
        } else {
            wea_img = '<img src="./images/icon/sunny.png" class="logo"/>';
        }
    } else if (wea.indexOf("雷") >= 0) {
        if (wea.indexOf("暴") >= 0) {
            wea_img = '<img src="./images/icon/blusteryr.png" class="logo"/>';
        } else {
            wea_img = '<img src="./images/icon/blustery.png" class="logo"/>';
        }
    } else if (wea.indexOf("雨") >= 0) {
        if (wea.indexOf("晴") >= 0) {
            wea_img = '<img src="./images/icon/clearr.png" class="logo"/>';
        } else {
            wea_img = '<img src="./images/icon/rainy.png" class="logo"/>';
        }
    } else {
        wea_img = '<img src="./images/icon/cloudy.png" class="logo"/>';
    }
    return wea_img;
}

function getTime(timestamp)
{
    var date = new Date(timestamp);

    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes());
    return h+m;
}