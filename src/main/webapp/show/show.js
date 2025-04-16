
//接收信息
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

// 申请详情页资源
if (id) {
    // 向后端请求数据
    fetch(`/AnimeProject_war/anime?id=${id}`)
        .then(response => {
            // 检查响应是否成功
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // 将返回的数据填充到页面
            console.log("Anime details:",data);
            document.getElementById("t1").innerHTML = data.title;
            document.getElementById('s1').innerHTML = data.releaseYear;
            document.getElementById('s2').innerHTML = data.episodes;
            document.getElementById('s3').innerHTML = data.author;
            document.getElementById('image1').src = data.imageUrl;
            document.getElementById('image2').src = data.image2Url;
            document.getElementById('bottomText').innerHTML = data.description;
            document.getElementById("btn").addEventListener("click", function() {
                window.location.href = data.url;
            });
        })
        .catch(error => {
            console.error('Error fetching anime details:', error);  // 错误处理
            alert('Failed to load anime details. Please try again later.');
        });
} else {
    alert('No anime ID found in the URL!');
}

// 再申请插入浏览记录

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function addHistory(animeId) {
    const username = getCookie('username');  // 获取登录的用户名

    if (!username) {
        console.log("用户未登陆, 不保存.")
        return;
    }

    console.log(username);
    console.log(animeId);

    // 向后端发送请求保存浏览记录
    fetch('/AnimeProject_war/saveBrowsingHistory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ divId: animeId, username })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('浏览记录保存成功');
            } else {
                console.log('保存失败: ' + data.message);
            }
        })
        .catch(error => console.error('保存浏览记录时发生错误', error));
}

addHistory(id);

function changeName(){
    const username = getCookie('username');
    if(username)
    {
        document.querySelector("#login-name a").textContent = " <" + username + "> ";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // 将顶部栏的html插入主html中
    fetch('/AnimeProject_war/top/top.html') // 替换为你的文件路径
        .then(response => response.text())
        .then(html => {
            // 插入 HTML 到占位符中
            document.getElementById('inserted-html').innerHTML = html;
            // 根据用户信息修改名称
            changeName();
        })
        .catch(error => console.error('加载 HTML 出错:', error));
});

// if(id)
// {
//     const receivedData = JSON.parse(decodeURIComponent(message));
//     console.log(receivedData);
//     document.getElementById("t1").innerHTML = receivedData.title;
//     document.getElementById('s1').innerHTML = receivedData.year;
//     document.getElementById('s2').innerHTML = receivedData.num;
//     document.getElementById('s3').innerHTML = receivedData.sup;
//     document.getElementById('image1').src = receivedData.image;
//     document.getElementById('image2').src = receivedData.image2;
//     document.getElementById('bottomText').innerHTML = receivedData.text;
//
//     document.getElementById("btn").addEventListener("click", function() {
//         window.location.href = receivedData.url;
//       });
// }