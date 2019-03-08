let Crawler = {
	request: null,
	cheerio: null,
	fs: null,
	init: function () {
		Crawler.request = require('request');
		Crawler.cheerio = require('cheerio');
		Crawler.fs = require('fs');
		Crawler.getMovies();
	},
	getMovies: function () {
		Crawler.request("http://krosfinder.com/pt/cards?v=scan&page=0", function (err, res, body) {
			if (err)
				console.log("Error: " + err);

			var $ = Crawler.cheerio.load(body);

			$("img[alt='Front picture of Krosmaster']").each(function () {
				const krosmaterName = $(this).parent().attr("title");
				const krosmaterNameFormatted = krosmaterName.substring(16, krosmaterName.length);

				console.log(krosmaterNameFormatted);
			});
		});
	}
};

Crawler.init();