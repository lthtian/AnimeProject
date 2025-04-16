const sliderData = [
    {
      url: "../../image/slider/ass1/1.jpg",
      title: "<strong>画师 : </strong>行方不明",
      color: "#16435A",
      textColor: "#fff",
    },
    {
      url: "../../image/slider/ass1/2.jpg",
      title: "<strong>画师 : </strong>K-SUWABE",
      color: "#5C676A",
      textColor: "#fff",
    },
    {
      url: "../../image/slider/ass1/3.jpg",
      title: "<strong>画师 : </strong>_LM7_",
      color: "#684B3B",
      textColor: "#fff",
    },
    {
      url: "../../image/slider/ass1/4.jpg",
      title: "<strong>画师 : </strong>あき",
      color: "#475C6C",
      textColor: "#fff",
    },
    {
      url: "../../image/slider/ass1/5.jpg",
      title: "<strong>画师 : </strong>ひみつ吉",
      color: "#F7EAC8",
      textColor: "#fff",
    },
    {
      url: "../../image/slider/ass1/6.jpg",
      title: "<strong>画师 : </strong>キヨシロ",
      color: "#3A5D7D",
      textColor: "#fff",
    },
    {
      url: "../../image/slider/ass1/7.jpg",
      title: "<strong>画师 : </strong>KL",
      color: "#3595E7",
      textColor: "#fff",
    },
    {
      url: "../../image/slider/ass1/8.jpg",
      title: "<strong>画师 : </strong>ふわり",
      color: "#7E2626",
      textColor: "#fff",
    },
    {
      url: "../../image/slider/ass1/9.jpg",
      title: "<strong>画师 : </strong>まつだひかり",
      color: "#FFF6D7",
      textColor: "#fff",
    },
  ];
  var i = 0;
  let timerId = setInterval(function () {
    btn1.click();
  }, 3000);

  const btn1 = document.querySelector(".btnr");
  btn1.addEventListener("click", function () {
    i++;
    if (i == sliderData.length) i = 0;
    document.getElementById("myimage").src = sliderData[i].url;
    document.getElementById("mytext").innerHTML = sliderData[i].title;
    document.getElementById("mytext").style.color = sliderData[i].textColor;
    document.getElementById("myslider").style.backgroundColor =
      sliderData[i].color;

    document.querySelector(".left li.active").classList.remove("active");
    document.querySelectorAll(".left li")[i].classList.add("active");
  });

  const btn2 = document.querySelector(".btnl");
  btn2.addEventListener("click", function () {
    i--;
    if (i == -1) i = sliderData.length - 1;
    document.getElementById("myimage").src = sliderData[i].url;
    document.getElementById("mytext").innerHTML = sliderData[i].title;
    document.getElementById("mytext").style.color = sliderData[i].textColor;
    document.getElementById("myslider").style.backgroundColor =
      sliderData[i].color;

    document.querySelector(".left li.active").classList.remove("active");
    document.querySelectorAll(".left li")[i].classList.add("active");
  });

  const slider = document.querySelector(".slider");
  slider.addEventListener("mouseover", function () {
    clearInterval(timerId);
  });
  slider.addEventListener("mouseout", function () {
    clearInterval(timerId);
    timerId = setInterval(function () {
      btn1.click();
    }, 3000);
  });

  //这边实现传送信息给网页

function goToDetails(animeId) {
  // 跳转到 show.html，并传递 animeId
  window.location.href = "../../show/show.html?id=" + animeId;
}



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


  // let i = 0;
  // transfromData.forEach(element => {
  //   i++;
  //   const str = "b" + i;
  //   const btn = document.getElementById(str)
  //   btn.addEventListener("click", function () {
  //     const dataToSend = JSON.stringify(element);
  //     const url = `../../show/show.html?message=${encodeURIComponent(dataToSend)}`;
  //     window.location.href = url;
  //   });  
  // });

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