$.ajax({
    url: '/api/data',
    dataType: 'json',
    success: function(data) {
        var str = '';
        data.forEach(function(file) {
            str += `<dl>
<dt><img src="img/3.jpg" alt=""></dt>
<dd>
    <b>${file.tit}</b>
    <p class="price">${file.price}</p>
    <p class="tit">${file.big}</p>
    <p class="address">${file.address}</p>
    <p class="time">${file.time}</p>
</dd>
</dl>`
        });
        $('table').html(str);

    },
    error: function(e) {
        console.log(e);
    }

})