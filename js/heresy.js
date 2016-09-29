$(document).ready(function() {
    $('#ajax_query').click(sendAJAX);
});

function sendAJAX(e) {
    var query_string = '?time=' + (new Date().getTime()) + "&name=" + $('#name').val();
    console.log(query_string);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        showPac();
        setTimeout(function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                try {
                    var obj = JSON.parse(xmlhttp.responseText);
                    console.log(obj);
                    if (obj.name) {
                        $('#ajax_res').html("Hello " + obj.name + "!<br>" + obj.res1 + '<br>' + obj.res2);
                    }
                    else {
                        $('#ajax_res').html(obj.res1 + '<br>' + obj.res2);
                    }
                } catch (e) {
                    console.log(xmlhttp.responseText);
                    console.log(e);
                }


                hidePac();
            }
        }, 500);

    }
    xmlhttp.open("GET", "ajax_query.php" + query_string, true);
    xmlhttp.send();
    return false;
}

function showPac() {
    if ($('#pacman').hasClass('shown')) {
        return;
    }
    else {
        $('#pacman').css('display', 'inline-block').show().toggleClass('shown');
    }
}

function hidePac() {
    if (!$('#pacman').hasClass('shown')) {
        return;
    }
    else {
        $('#pacman').hide().toggleClass('shown');
    }
}