
const request = require('request');
const cheerio = require('cheerio');
const express = require('express')
const bodyParser = require("body-parser"); 

const app = express();
app.set("view engine", "ejs"); 
app.set("views", __dirname + "/views"); 
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(8080, () => { console.log("Server online on http://localhost:8080"); });

const user = "Vinicius";	
const krosmasters = getKrosmasters();

app.get("/", (req, res) => { 
	res.render("index", { username: user, krosmasters:  krosmasters }); 
});

function getKrosmasters() {
	const krosmasters = []

	request("http://krosfinder.com/pt/cards?v=scan&page=0", function (err, res, body) {
		if (err)
			console.log("Error: " + err)	

		const $ = cheerio.load(body)

		$("img[alt*='Front picture of']").each(function () {
			const krosmaterName = $(this).parent().attr("title");
			const krosmaterImgUrl = $(this).attr("src");
			const krosmaterNameFormatted = krosmaterName.substring(16, krosmaterName.length);
			
			krosmasters.push({ name: krosmaterNameFormatted, imgUrl: krosmaterImgUrl });
		});
	});

	return krosmasters.sort(x => x.name);
}