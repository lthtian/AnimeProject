
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function changeName(){
    const username = getCookie('username');
    if(username)
    {
        document.querySelector("#login-name a").textContent = " <" + username + "> ";
    }
}

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



function goToDetails(animeId) {
    // 跳转到 show.html，并传递 animeId
    window.location.href = "../show/show.html?id=" + animeId;
}

// 从 cookie 中获取指定名称的值
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function removeHistroy(username, div_id, deleteDiv){
    const liToRemove = deleteDiv.closest('li'); // 获取最近的 li 元素
    if (liToRemove) {
        // 立即从 DOM 中移除该 li 元素
        liToRemove.remove();
    }

    // 创建请求的 JSON 数据
    const data = {
        username: username,
        divId: div_id
    };

    // 发送 POST 请求到后端的 "/saveBrowsingHistory" 接口
    fetch('/AnimeProject_war/removeBrowsingHistory', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // 将数据转换为 JSON 字符串发送
    })
        .then(response => response.json()) // 解析 JSON 响应
        .then(data => {
            if (data.success) {
                console.log('历史记录删除成功');
            } else {
                console.error('删除历史记录失败:', data.message);
            }
        })
        .catch(error => {
            console.error('请求失败:', error);
        });
}

function loadHistory() {
    const username = getCookie('username'); // 获取用户名
    if (!username) {
        console.error('用户名未找到，请确保 cookie 中包含 "username"');
        return;
    }

    fetch(`/AnimeProject_war/GetHistory?username=${username}`)
        .then(response => response.json()) // 解析 JSON
        .then(data => {
            console.log('服务器返回的数据:', data);
            const ul = document.getElementById('insert-list');
            ul.innerHTML = '';
            // 先加入头部
            const li = document.createElement('li');
            li.id = 'header';

            const img = document.createElement('img');
            img.src = '../image/history.png'; // 设置图片路径
            img.alt = ''; // 设置 alt 属性为空

            const h1 = document.createElement('h1');
            h1.textContent = '历史记录'; // 设置标题文本

            li.appendChild(img);
            li.appendChild(h1);

            ul.appendChild(li);

            // 遍历历史记录数据，动态生成 <li>
            data.forEach(item => {
                // 创建 li 元素
                const li = document.createElement('li');

                // 创建 img_box div
                const imgBox = document.createElement('div');
                imgBox.className = 'img_box';
                imgBox.setAttribute('onclick', `goToDetails(${item.div_id})`);

                // 创建 img 并添加到 img_box
                const img = document.createElement('img');
                img.src = item.url;
                img.alt = '';
                imgBox.appendChild(img);

                // 创建 a 元素
                const name = document.createElement('a');
                name.textContent = item.name;
                name.setAttribute('onclick', `goToDetails(${item.div_id})`);

                // 创建 p 元素
                const p = document.createElement('p');
                p.textContent = `上次浏览：${item.date}`;

                // 创建 delete div
                const deleteDiv = document.createElement('div');
                deleteDiv.className = 'delete';
                deleteDiv.setAttribute('onclick', `removeHistroy('${username}', ${item.div_id}, this)`);

                // 创建删除图片并添加到 delete div
                const deleteImg = document.createElement('img');
                deleteImg.src = '../image/delete.png'; // 设置删除图片路径
                deleteImg.alt = '删除';
                deleteDiv.appendChild(deleteImg);

                // 将各个子元素添加到 li
                li.appendChild(imgBox);
                li.appendChild(name);
                li.appendChild(p);
                li.appendChild(deleteDiv);

                // 将 li 添加到 ul
                ul.appendChild(li);
            });
        })
        .catch(error => {
            console.error('加载历史记录出错:', error);
        });
}

document.addEventListener('DOMContentLoaded', function () {
    // 调用函数加载历史记录
    loadHistory();
});