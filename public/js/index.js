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


login.onclick = function () {
    fetch('http://localhost:3000/api/administrator/login', {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            loginId: 'admin',
            loginPwd: 'admin123'
        })
    }).then(rep => rep.json()).then(res => {
        console.log(res)
    })
}

getStudentByPage.onclick = function () {
    fetch('http://localhost:3000/api/student/', {
        method: "GET",
    }).then(res => res.json()).then(res => {
        console.log(res, '=======')
    })
}
