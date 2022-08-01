const pg = require("pg");
const express = require("express");
//const { response } = require("express");
const dotenv = require("dotenv"); //Probramatically get env variables from .env file
const htmlparser2 = require("htmlparser2");
const fetch = require("node-fetch");
const urlParser = require('urlParser');
const { query } = require("express");

let count = 0;
let targetSite = `https://github.com/`;

//GET ENVIRONMENT VARIABLES
dotenv.config();
const { DATABASE_URL, PORT, NODE_ENV } = process.env;


const app = express();

//PSQL CONNECTION SETTINGS
const pool = new pg.Pool({
    connectionString: DATABASE_URL,
    ssl: NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

//MIDDLEWARE
app.use(express.static('static'));
app.use(express.json());


//---CHECK DATABASE----
app.get("/query/:qStriing", (req, res, next) => {

    /*
        pool
            .query(`SELECT * FROM links WHERE url = ${req.params.qString}`)
            .then(data => {
                res.send(data.rows);
            })
            .catch(e => console.error(e.stack))
            */
    async function siteScraper(qStringURL) {
        result = await scrapeWebsite(qStringURL);
        return result;
    }
    siteScraper(req.params.qStriing).then((data) => {
        res.send(data);
    });

});

app.listen(PORT, () => {
    console.log("listening on PORT " + PORT);
})



async function scrapeWebsite(queryURL) {
    const webSite = queryURL;

    const urlInfo = urlParser(targetSite);
    const seenLinks = {};
    const sites = [];
    const queryCompleted = false;

    console.log(`Scraping ${targetSite}`);
    const result = await fetch(targetSite)
        .then(res => {
            //console.log(res.headers.raw()); 
            //targetSite = res.headers.get('server');
            return (res.text());
        })
        .then(body => {
            // const html = body;
            let link = '';
            const date = new Date(Date.now());

            const parser = new htmlparser2.Parser({
                onattribute(name, value) {
                    if (name === "href") {
                        link = normalizeLink(value);
                        if (!seenLinks[link]) {
                            seenLinks[link] = link;
                            sites.push({ url: link, referred_by: targetSite, collected: date.toString() });
                        }

                    }
                },
            });

            return parser.write(body);
        }).then(data => {
            queryCompleted = true;
            console.log("Processing!");
            return sites;
        })
        .catch(err => {
            console.log('No articles available at this time. Try again later');
            console.log(err);
        });

    return sites;
}


function normalizeLink(url) {
    ++count;
    if (url.startsWith('http')) {
        return url;
    } else if (url.includes('://')) {
        return url;
    } else if (url.startsWith('//')) {
        //return url.slice(2);
        return "https:" + url;
    } else if (url.startsWith('/')) {
        return targetSite + url;
    } else {
        // console.log(count + "-->" + targetSite + url);
        return targetSite + url;
    }
    //console.log(count, "-->", url);

    // seenLinks[url] = true;
};

// const parser = new htmlparser2.Parser({
//     onattribute(name /*: string */, value /*: string */) {
//         if (name === "href") {
//             collectLink(value);
//         }
//     },
// });


/// - - - DATABASE SEARCH
function dbSearch() {
    const userInput = "tesla";
    const url = urlParser(targetSite);
    let seenLinks = {};

    //HTTP GET REQUEST
    fetch(targetSite)
        .then(res => {
            //console.log(res.headers.raw());
            //targetSite = res.headers.get('server');
            return (res.text());
        })
        .then(body => {
            // const html = body;
            parser.write(body);
        })
        .then(() => console.log(parser.seenLinks))
        .catch(err => {
            console.log('No articles available at this time. Try again later');
            console.log(err);
        });
};

//console.log(scrapeWebsite);



// fetch('https://github.com/')
//     .then(res => res.text())
//     .then(body => console.log(body))