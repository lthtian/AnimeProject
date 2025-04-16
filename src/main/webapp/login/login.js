
// 实现注册登陆界面交换功能

let flag = true;

const Switch = () => {
    if(flag)
    {
        $(".pre-box").css("transform", "translateX(100%)")
        $(".image img").attr("src", "../image/heart-mirror.png")
        $(".pre-box").css("background-color", "#f7fa9c")
        $(".pre-box h2").removeClass("after-hidden").addClass("after-visible")
        $(".pre-box h2").removeClass("before-visable").addClass("before-hidden")
        $("#text").removeClass("after-hidden").addClass("after-visible")
        $("#text").removeClass("before-visable").addClass("before-hidden")
    }
    else 
    {
        $(".pre-box").css("transform", "translateX(0%)")
        $(".image img").attr("src", "../image/heart.png")
        $(".pre-box").css("background-color", "#bdf5f3")
        $(".pre-box h2").removeClass("after-visible").addClass("after-hidden");
        $(".pre-box h2").removeClass("before-hidden").addClass("before-visable");
        $("#text").removeClass("after-visible").addClass("after-hidden");
        $("#text").removeClass("before-hidden").addClass("before-visable");
    }

    $(".pre-box h2").fadeOut(300, function () {
        if (flag) {
            $(this).text("欢迎来到TianMu!");  // 可以在这里修改为第一个文本
        } else {
            $(this).html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;欢迎来到TianMu!");  // 可以在这里修改为第二个文本
        }
        $(this).fadeIn(300);
    });

    $("#text").fadeOut(300, function () {
        if (flag) {
            $(this).html("登录一下, 拥有自己的动漫天地!");  // 可以在这里修改为第一个文本
        } else {
            $(this).html("加入我们, 一起寻找宝藏动漫!");  // 可以在这里修改为第二个文本
        }
        $(this).fadeIn(300);
    });


    flag = !flag;
}

// 实现前后端交互的注册工作

document.getElementById('l').addEventListener('submit', function (e) {
    console.log("hello")

    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const check = document.getElementById('registerCheck').value;

    if(password != check)
    {
        document.getElementById('registerPassword').value = '';
        document.getElementById('registerCheck').value = '';
        alert("密码不一致, 请重新输入!");
        return;
    }

    fetch('/AnimeProject_war/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
        .then(response => {
            // 检查响应是否成功
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                $(".image img").attr("src", "../image/char.png")
                $(".register-title h1").html("注册成功!");
            } else {
                $(".image img").attr("src", "../image/conf.png")
                $(".register-title h1").html("注册失败...");
            }
        });
});

// 登录逻辑
document.getElementById('r').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    fetch('/AnimeProject_war/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                $(".image img").attr("src", "../image/char-mirror.png")
                $(".login-title h1").html("登陆成功!");
                document.querySelector("#login-name a").textContent = " <" + username + "> ";
                document.cookie = `username=${username}; path=/`;

                // 登录成功3秒后跳转至上一路径
                setTimeout(() => {
                    const previousPage = document.referrer;
                    if (previousPage) {
                        window.location.href = previousPage; // 跳转到上一个页面
                    } else {
                        window.location.href = "../menu.html"; // 设置默认页面
                    }
                }, 3000); // 延迟 3 秒
            } else {
                $(".image img").attr("src", "../image/conf-mirror.png")
                $(".login-title h1").html("登陆失败...");
            }
        });
});


// 根据当前用户跟环界面信息

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





