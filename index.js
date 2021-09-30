const express = require("express")
const app = express()
const cheerio = require("cheerio")
const axios = require("axios").default

app.use(express.json())

let urlOne = "https://www.theguardian.com/uk"
let urlTwo = "https://www.nextbigfuture.com"

const crawlWebsite = async () => {
	try {
		const response = await axios.get(urlOne)
		const html = response.data
		const pickElements = cheerio.load(html)
		const articles = []
		pickElements(".fc-item__title", html).each(function () {
			const title = pickElements(this).text()
			const link = pickElements(this).find("a").attr("href")
			articles.push({ title, link })
		})

		console.log(articles)
	} catch (error) {
		console.log(error)
	}
}

crawlWebsite()

const crawlWebsiteTwo = async () => {
	try {
		const response = await axios.get(urlTwo)
		const html = response.data
		const pickElements = cheerio.load(html)
		const articles = []
		pickElements(".entry-title", html).each(function () {
			const title = pickElements(this).text()
			const link = pickElements(this).find("a").attr("href")
			articles.push({ title, link })
		})

		console.log(articles)
	} catch (error) {
		console.log(error)
	}
}

crawlWebsiteTwo()

app.listen(5555, () => {
	console.log(`Server running on port 5500`)
})
