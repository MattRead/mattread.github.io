var easterEggKeys = new Array('j', 'i', 'b', 'b', 'y');
var easterEggCurrent = 0;

$(window).keydown(function (e) {
	var key = String.fromCharCode(e.keyCode).toLowerCase();
	if (easterEggKeys[easterEggCurrent].toLowerCase() == key) {
		easterEggCurrent++;
		if (easterEggCurrent >= easterEggKeys.length) {
			$('body').append('<div style="position:fixed;bottom:0;right:0;z-index:999;text-align:right;"><img src="' + HABARI_URL + '/system/admin/images/pasaka.png"><marquee style="font-size:2em; color:red;"><b>OMG! PONIES!!</b></marquee></div>');
			easterEggCurrent = 0;
		}
	}
	else {
		easterEggCurrent = 0;
	}
});