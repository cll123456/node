console.log('你已经成功访问静态资源，js文件了');
fetch('http://localhost:3000/api/administrator/').then(rep => rep.json()).then(res => {
    console.log(res)
})


function jsonp(url) {
    const scr = document.createElement('script');
    scr.src = url;
    document.body.appendChild(scr);
    scr.onload = () => {
        document.body.removeChild(scr)
    }
}

jsonp('http://localhost:3000/api/administrator/jsonp');

function callback(data) {
    console.log(data, '-----')
}
