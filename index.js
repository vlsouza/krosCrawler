let crawler = {
	request: null,
	cheerio: null,
	fs: null,
	init: function () {
		crawler.request = require('request');
		crawler.cheerio = require('cheerio');
		crawler.fs = require('fs');
		crawler.getKrosmasters();
	},
	getKrosmasters: function () {
		crawler.request("http://krosfinder.com/pt/cards?v=scan&page=0", function (err, res, body) {
			if (err)
				console.log("Error: " + err);

			var $ = crawler.cheerio.load(body);

			$("img[alt*='Front picture of']").each(function () {
				const krosmaterName = $(this).parent().attr("title");
				const krosmaterNameFormatted = krosmaterName.substring(16, krosmaterName.length);

				console.log(krosmaterNameFormatted);
			});
		});
	}
};

crawler.init();