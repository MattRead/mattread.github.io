// this is a placeholder for now

var populate_dents = function(tag) {
    if (!tag)
        return false;

    $.ajax({
        url: "http://identi.ca/api/statusnet/tags/timeline/" + tag + ".json",
        dataType: 'json',
        success: function(data){
            if (data.length > 0) {
                $('.related').before('<h2>Replies to This Post</h2><p>&clubs; Reply to ' +
                                     'this post on <a href="http://identi.ca">' +
                                     'identi.ca</a> using the hash tag <strong>#' + tag +
                                     '</strong></p><ol class="dents"></ol>');
                 $('.dents').css('font-size', '.9em');
                var dent = [];
                for (i in data) {
                    dent = data[i];
                    var date = dent.created_at.replace(/\d\d:\d\d:\d\d \+0000/g, '');
                    $('.dents').append('<li><a href="http://identi.ca/notice/' + dent.id + '">' +
                                        dent.user.name + "</a> " + dent.statusnet_html +
                                        '<br>@ <time>' + date + '</time></li>');
                }
            }
            else {
                $('.related').before('<aside><p>&clubs; Reply to this post on <a href="http://identi.ca">' +
                                     'identi.ca</a> using the hash tag <strong>#' + tag +
                                     '</strong></p></aside>');
            }
        }
    });
};
