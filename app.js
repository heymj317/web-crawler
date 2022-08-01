const htmlparser2 = require("htmlparser2");
const fetch = require("node-fetch");
const urlParser = require('urlParser');

let count = 0;
let targetSite = `https://github.com/`;

const scrapeWebsite = new Promise((resolve, reject) => {
    const webSite = targetSite;

    const urlInfo = urlParser(targetSite);
    const seenLinks = {};
    const sites = [];

    console.log(`Scraping ${targetSite}`);
    fetch(targetSite)
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
        })
        .then(() => console.log(sites))
        .catch(err => {
            console.log('No articles available at this time. Try again later');
            console.log(err);
        });

})

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
        console.log(count + "-->" + targetSite + url);
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

console.log(scrapeWebsite);



// fetch('https://github.com/')
//     .then(res => res.text())
//     .then(body => console.log(body))