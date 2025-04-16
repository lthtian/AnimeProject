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

// 将所有申请到的动漫资源作为Li插入链表
function loadAnime() {
    fetch('/AnimeProject_war/allanime')
        .then(response => response.json()) // 解析 JSON
        .then(data => {
            console.log('服务器返回的数据:', data);
            const ul = document.getElementById('insert-list');
            ul.innerHTML = '';

            // 添加头部
            const headerLi = document.createElement('li');
            headerLi.id = 'header';

            const img = document.createElement('img');
            img.src = '../image/pof.png'; // 设置头部图片路径
            img.alt = ''; // 设置 alt 属性为空

            const h1 = document.createElement('h1');
            h1.textContent = '归档'; // 设置标题文本

            headerLi.appendChild(img);
            headerLi.appendChild(h1);

            ul.appendChild(headerLi);

            // 遍历动漫数据，动态生成 <li>
            data.forEach(anime => {
                // 创建 li 元素
                const li = document.createElement('li');

                // 创建 img_box div
                const imgBox = document.createElement('div');
                imgBox.className = 'img_box';
                imgBox.setAttribute('onclick', `goToDetails(${anime.id})`);

                // 创建 img 并添加到 img_box
                const img = document.createElement('img');
                img.src = anime.imageUrl; // 使用动漫的图片 URL
                img.alt = '';
                imgBox.appendChild(img);

                // 创建 texts div
                const texts = document.createElement('div');
                texts.className = 'texts';

                // 创建 a 元素并添加到 texts
                const title = document.createElement('a');
                title.textContent = anime.title; // 动漫标题
                texts.appendChild(title);
                texts.setAttribute('onclick', `goToDetails(${anime.id})`);

                // 创建 p 元素并添加到 texts
                const p1 = document.createElement('p');
                p1.className = 'p1';
                p1.textContent = anime.releaseYear; // 动漫年份
                texts.appendChild(p1);

                const p2 = document.createElement('p');
                p2.className = 'p2';
                p2.textContent = `集数: ${anime.episodes}`; // 动漫集数
                texts.appendChild(p2);

                const p3 = document.createElement('p');
                p3.className = 'p3';
                p3.textContent = `制作: ${anime.author}`; // 动漫制作信息
                texts.appendChild(p3);

                // 创建 enter div
                const enterDiv = document.createElement('div');
                enterDiv.className = 'enter';
                enterDiv.setAttribute('onclick', `goToDetails(${anime.id})`);

                // 创建 enter 图片并添加到 enter div
                const enterImg = document.createElement('img');
                enterImg.className = 'enter-img';
                enterImg.src = '../image/enter.png'; // 设置进入按钮图片路径
                enterImg.alt = '进入';
                enterDiv.appendChild(enterImg);

                enterImg.addEventListener('mouseover', () => {
                    enterImg.src = '../image/enter-white.png'; // 更换图片
                });
                enterImg.addEventListener('mouseout', () => {
                    enterImg.src = '../image/enter.png'; // 恢复原图片
                });

                // 将子元素添加到 li
                li.appendChild(imgBox);
                li.appendChild(texts);
                li.appendChild(enterDiv);

                // 将 li 添加到 ul
                ul.appendChild(li);
            });
        })
        .catch(error => {
            console.error('加载动漫列表出错:', error);
        });
}

document.addEventListener('DOMContentLoaded', function () {
    // 页面加载完成时调用函数加载动漫列表
    loadAnime();
});