// 从豆瓣中获取图书的数据， 不能频繁点击，会被封ip
const axios = require('axios').default;
const cheerio = require('cheerio');

/**
 * 获取书籍的详情连接地址
 * @returns {Promise<[]>}
 */
async function getBookLinks() {
    const res = await axios.get('https://book.douban.com/latest');
    const $ = cheerio.load(res.data)
    const aDoms = $("#content .grid-12-12 li a.cover");
    let aHrefs = [];
    for (let i = 0, l = aDoms.length; i < l; i++) {
        aHrefs.push(aDoms[i].attribs['href'])
    }
    return aHrefs;
}


/**
 * 获取书籍的数据
 * @param bookUrl
 * @returns {Promise<{author: *, name, publishDate: string, picture}>}
 */
async function getSingleBookData(bookUrl) {
    const detailHtml = await axios(bookUrl);
    const $ = cheerio.load(detailHtml.data);
    const aDmo = $('#mainpic a.nbg');
    const picture = aDmo.attr('href');
    const name = aDmo.attr('title');
    const spanDoms = $('#info span.pl');
    const authorDom = spanDoms.filter((i, ele) => {
        return $(ele).text().includes("作者");
    });
    const author = authorDom.next("a").text();
    const publishDateDom = spanDoms.filter((i, ele) => {
        return $(ele).text().includes('出版年');
    })
    const publishDate = publishDateDom[0].nextSibling.nodeValue.trim()
    return {
        picture,
        name,
        author,
        publishDate
    }
}

/**
 * 获取所有的数据
 * @returns {Promise<{author: *, name, publishDate: string, picture}[]>}
 */
async function getBookData() {
    let bookLinks = await getBookLinks();
    const pros = bookLinks.map(p => {
        return getSingleBookData(p)
    })
    return Promise.all(pros);
}

const Book = require('./../models/Book');

/**
 * 给模型存入数据
 * @returns {Promise<void>}
 */
async function saveBookData() {
    const bookDatas = await getBookData();
    console.log(bookDatas)
    const res = await Book.bulkCreate(bookDatas);
    console.log(res, '存入成功')
}


saveBookData();
