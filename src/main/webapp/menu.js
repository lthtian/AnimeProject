const data = [
    [
      "./image/zhiyu1/1.jpg",
      "./image/zhiyu1/2.jpg",
      "./image/zhiyu1/3.jpg",
      "./image/zhiyu1/4.jpg",
      "./image/zhiyu1/5.jpg",
      "./image/zhiyu1/6.jpg",
      "./image/zhiyu1/7.jpg",
    ],
    [
      "./image/zhiyu2/1.jpg",
      "./image/zhiyu2/2.jpg",
      "./image/zhiyu2/3.jpg",
      "./image/zhiyu2/4.jpg",
      "./image/zhiyu2/5.jpg",
      "./image/zhiyu2/6.jpg",
      "./image/zhiyu2/7.jpg",
    ],
    [
      "./image/rexue/1.jpg",
      "./image/rexue/2.jpg",
      "./image/rexue/3.jpg",
      "./image/rexue/4.jpg",
      "./image/rexue/5.jpg",
      "./image/rexue/6.jpg",
      "./image/rexue/7.jpg",
    ],
    [
      "./image/tuili/1.jpg",
      "./image/tuili/2.jpg",
      "./image/tuili/3.jpg",
      "./image/tuili/4.jpg",
      "./image/tuili/5.jpg",
      "./image/tuili/6.jpg",
      "./image/tuili/7.jpg",
    ],
    [
      "./image/yishiliu/1.jpg",
      "./image/yishiliu/2.jpg",
      "./image/yishiliu/3.jpg",
      "./image/yishiliu/4.jpg",
      "./image/yishiliu/5.jpg",
      "./image/yishiliu/6.jpg",
      "./image/yishiliu/7.jpg",
    ],
  ];

  const textColor = ["#f6b3bf", "#853e81", "#f52d31", "#7c6c69", "#99d7ee"];

  const texts = [
    "想要内心被治愈吗?",
    "想要治愈还是致郁?",
    "想看畅快的打戏吗?",
    "想来一场头脑风暴吗?",
    "想让思维跳出三界之外吗?",
  ];

  //这个是图片加框
  const image1 = document.getElementById("image1");
  const image2 = document.getElementById("image2");
  const image3 = document.getElementById("image3");
  const image4 = document.getElementById("image4");
  const image5 = document.getElementById("image5");
  const image6 = document.getElementById("image6");
  const image7 = document.getElementById("image7");

  //这个是单纯图片
  const img1 = document.getElementById("1st");
  const img2 = document.getElementById("2nd");
  const img3 = document.getElementById("3rd");
  const img4 = document.getElementById("4th");
  const img5 = document.getElementById("5th");
  const img6 = document.getElementById("6th");
  const img7 = document.getElementById("7th");

  const text = document.getElementById("text-2nd");

  let i = 0;

  function restartAnimation() {
    //修改提示栏
    i++;
    if (i == 5) i = 0;
    document.querySelector(".tip-ul li.active").classList.remove("active");
    document.querySelectorAll(".tip-ul li")[i].classList.add("active");

    //改变图片组
    img1.src = data[i][0];
    img2.src = data[i][1];
    img3.src = data[i][2];
    img4.src = data[i][3];
    img5.src = data[i][4];
    img6.src = data[i][5];
    img7.src = data[i][6];

    text.style.color = textColor[i];
    text.innerHTML = texts[i];

    //移除掉已存在的动画效果
    image1.style.animation = "none";
    image2.style.animation = "none";
    image3.style.animation = "none";
    image4.style.animation = "none";
    image5.style.animation = "none";
    image6.style.animation = "none";
    image7.style.animation = "none";
    text.style.animation = "none";

    //强制重绘
    void image1.offsetWidth;
    void image2.offsetWidth;
    void image3.offsetWidth;
    void image4.offsetWidth;
    void image5.offsetWidth;
    void image6.offsetWidth;
    void image7.offsetWidth;
    void text.offsetWidth;

    //重新开始动画
    text.style.animation =
      "slideIn 2s forwards, stay 1s forwards 2s, slideOut 1s forwards 3s";
    image1.style.animation =
      "slideIn 2s forwards, stay 1s forwards 2s, slideOut 1s forwards 3s";
    image2.style.animation =
      "slideIn 2s forwards 0.1s, stay 1s forwards 2.1s, slideOut 1s forwards 3.1s";
    image3.style.animation =
      "slideIn 2s forwards 0.2s, stay 1s forwards 2.2s, slideOut 1s forwards 3.2s";
    image4.style.animation =
      "slideIn 2s forwards 0.3s, stay 1s forwards 2.3s, slideOut 1s forwards 3.3s";
    image5.style.animation =
      "slideIn 2s forwards 0.4s, stay 1s forwards 2.4s, slideOut 1s forwards 3.4s";
    image6.style.animation =
      "slideIn 2s forwards 0.5s, stay 1s forwards 2.5s, slideOut 1s forwards 3.5s";
    image7.style.animation =
      "slideIn 2s forwards 0.6s, stay 1s forwards 2.6s, slideOut 1s forwards 3.6s";
  }

  setInterval(restartAnimation, 4000);

  document.addEventListener("DOMContentLoaded", function () {
    // 判断元素是否在视窗中的函数
    function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) //&&
        // rect.right <=
        //   (window.innerWidth || document.documentElement.clientWidth)
      );
    }

    //构建要添加效果的元素
    const scrollableElements = document.querySelectorAll(".window");
    const scrollableTexts = document.querySelectorAll(".right");

    // 监听滚动事件
    scrollableElements.forEach((element) => {
      window.addEventListener("scroll", function () {
        if (isElementInViewport(element)) {
          element.classList.add("show");
          element.classList.remove("hide");
        } else {
          element.classList.add("hide");
          element.classList.remove("show");
        }
      });
    });

    scrollableTexts.forEach((element) => {
      window.addEventListener("scroll", function () {
        if (isElementInViewport(element)) {
          element.classList.add("show-text");
          element.classList.remove("hide-text");
        } else {
          element.classList.add("hide-text");
          element.classList.remove("show-text");
        }
      });
    });
  });

  document.getElementById("b1").addEventListener("click", function () {
    window.location.href = "./ass/ass1/ass1.html";
  });

  document.getElementById("b2").addEventListener("click", function () {
    window.location.href = "./ass/ass2/ass2.html";
  });

  document.getElementById("b3").addEventListener("click", function () {
    window.location.href = "./ass/ass3/ass3.html";
  });

  document.getElementById("b4").addEventListener("click", function () {
    window.location.href = "./ass/ass4/ass4.html";
  });

  document.getElementById("b5").addEventListener("click", function () {
    window.location.href = "./ass/ass5/ass5.html";
  });

//此处实现百叶窗的信息传输
let x = 3;

function enterEvent(z, w){
    const name = "sc" + z + x;
    x--;
    if(x == 0) x = 3;
    const target = document.getElementById(name);

    target.innerHTML = w;

    target.style.animation = "none";
    void target.offsetWidth;
    target.style.animation = "textSlideIn 1s forwards";
}

let timer;
document.getElementById("b11").addEventListener("mouseenter",() => { timer = setTimeout(() => { enterEvent(1, "“人类的记忆总是有限的，我们能做的就是好好活着。”"); }, 400); });
document.getElementById("b12").addEventListener("mouseenter",() => { timer = setTimeout(() => { enterEvent(1, "“世界上存在着无法用言语表达的东西，那就是生命。”"); }, 400); });
document.getElementById("b13").addEventListener("mouseenter",() => { timer = setTimeout(() => { enterEvent(1, "“旅行的意义在于体验和感悟，不仅仅是到达目的地。”"); }, 400); });
document.getElementById("b14").addEventListener("mouseenter",() => { timer = setTimeout(() => { enterEvent(1, "“死亡并非终点，而是另一种形式的开始。”"); }, 400); });
document.getElementById("b15").addEventListener("mouseenter",() => { timer = setTimeout(() => { enterEvent(1, "“我们的日常也许就是某种程度上接连不断奇迹!”"); }, 400); });
document.getElementById("b16").addEventListener("mouseenter",() => { timer = setTimeout(() => { enterEvent(1, "“早安,喵! 午安, 喵! 晚安, 喵喵喵!”"); }, 400); });
document.getElementById("b17").addEventListener("mouseenter",() => { timer = setTimeout(() => { enterEvent(1, "“找到你了, 面码”"); }, 400); });

document.getElementById("b21").addEventListener("mouseenter",() => { timer = setTimeout(() => { enterEvent(2, "“我们不能选择自己的出身，但我们可以选择自己的路。”"); }, 400); });
document.getElementById("b22").addEventListener("mouseenter",() => { timer = setTimeout(() => { enterEvent(2, "“无论旅途黑暗，只要心中还有光芒，就能继续前进。”"); }, 400); });
document.getElementById("b23").addEventListener("mouseenter",() => { timer = setTimeout(() => { enterEvent(2, "“只有那些足够疯狂的人，才能在这座城市里活下去。”"); }, 400); });
document.getElementById("b24").addEventListener("mouseenter",() => { timer = setTimeout(() => { enterEvent(2, "“孤独与绝望是最可怕的敌人，它们比死亡更令人畏惧。”"); }, 400); });
document.getElementById("b25").addEventListener("mouseenter",() => { timer = setTimeout(() => { enterEvent(2, "“要复仇吗？复仇之后，你也将与我一起坠入地狱。”"); }, 400); });
document.getElementById("b26").addEventListener("mouseenter",() => { timer = setTimeout(() => { enterEvent(2, "“我们只不过是想要活下去，这难道有错吗？”"); }, 400); });
document.getElementById("b27").addEventListener("mouseenter",() => { timer = setTimeout(() => { enterEvent(2, "“就算死了，我依然想和你在一起。”"); }, 400); });

document.getElementById("b31").addEventListener("mouseenter",() => { timer = setTimeout(() => { enterEvent(3, "“吾等前方，绝无敌手！”"); }, 400); });
document.getElementById("b32").addEventListener("mouseenter",() => { timer = setTimeout(() => { enterEvent(3, "“这就是我！这是我的忍道！”"); }, 400); });
document.getElementById("b33").addEventListener("mouseenter",() => { timer = setTimeout(() => { enterEvent(3, "“我是要成为海贼王的男人!”"); }, 400); });
document.getElementById("b34").addEventListener("mouseenter",() => { timer = setTimeout(() => { enterEvent(3, "“猪肉骨~拿来卤~你又忘洗蛋~”"); }, 400); });
document.getElementById("b35").addEventListener("mouseenter",() => { timer = setTimeout(() => { enterEvent(3, "“天上天下, 唯我独尊”"); }, 400); });
document.getElementById("b36").addEventListener("mouseenter",() => { timer = setTimeout(() => { enterEvent(3, "“只要你还活着，就有改变未来的机会。”"); }, 400); });
document.getElementById("b37").addEventListener("mouseenter",() => { timer = setTimeout(() => { enterEvent(3, "“莱纳, 你坐啊!”"); }, 400); });

document.getElementById("b41").addEventListener("mouseenter",() => { timer = setTimeout(() => { enterEvent(4, "“全部成为F”"); }, 400); });
document.getElementById("b42").addEventListener("mouseenter",() => { timer = setTimeout(() => { enterEvent(4, "“人们的内心深处，总会有无法抹去的罪恶感。”"); }, 400); });
document.getElementById("b43").addEventListener("mouseenter",() => { timer = setTimeout(() => { enterEvent(4, "“我很好奇!”"); }, 400); });
document.getElementById("b44").addEventListener("mouseenter",() => { timer = setTimeout(() => { enterEvent(4, "“真相只有一个!”"); }, 400); });
document.getElementById("b45").addEventListener("mouseenter",() => { timer = setTimeout(() => { enterEvent(4, "“如果无法改变结局，那就改变我们面对结局的态度。”"); }, 400); });
document.getElementById("b46").addEventListener("mouseenter",() => { timer = setTimeout(() => { enterEvent(4, "“复杂的谜题往往隐藏在最简单的细节中。”"); }, 400); });
document.getElementById("b47").addEventListener("mouseenter",() => { timer = setTimeout(() => { enterEvent(4, "“尸体是最忠实的证人，它会告诉你所有发生过的事。”"); }, 400); });

document.getElementById("b51").addEventListener("mouseenter",() => { timer = setTimeout(() => { enterEvent(5, "“社会的阴暗面往往隐藏在我们最熟悉的角落。”"); }, 400); });
document.getElementById("b52").addEventListener("mouseenter",() => { timer = setTimeout(() => { enterEvent(5, "“我们都在漂流，在这世界上寻找一个属于自己的位置。”"); }, 400); });
document.getElementById("b53").addEventListener("mouseenter",() => { timer = setTimeout(() => { enterEvent(5, "<绝望三回首>“绝望了!我对这个XXXX的世界绝望了!!!”"); }, 400); });
document.getElementById("b54").addEventListener("mouseenter",() => { timer = setTimeout(() => { enterEvent(5, "只要拥有成为真物的意志，伪物就能够比真物更像真物。"); }, 400); });
document.getElementById("b55").addEventListener("mouseenter",() => { timer = setTimeout(() => { enterEvent(5, "“我们在寻找各自的命运，但每个人的旅程都是不同的。”"); }, 400); });
document.getElementById("b56").addEventListener("mouseenter",() => { timer = setTimeout(() => { enterEvent(5, "“真正的自由来自于摆脱来自过去的束缚。”"); }, 400); });
document.getElementById("b57").addEventListener("mouseenter",() => { timer = setTimeout(() => { enterEvent(5, "“我们每个人都在追寻一种无法完全理解的意义。”"); }, 400); });

document.getElementById("b11").addEventListener("mouseleave", () => {clearTimeout(timer); });
document.getElementById("b12").addEventListener("mouseleave", () => {clearTimeout(timer); });
document.getElementById("b13").addEventListener("mouseleave", () => {clearTimeout(timer); });
document.getElementById("b14").addEventListener("mouseleave", () => {clearTimeout(timer); });
document.getElementById("b15").addEventListener("mouseleave", () => {clearTimeout(timer); });
document.getElementById("b16").addEventListener("mouseleave", () => {clearTimeout(timer); });
document.getElementById("b17").addEventListener("mouseleave", () => {clearTimeout(timer); });

document.getElementById("b21").addEventListener("mouseleave", () => {clearTimeout(timer); });
document.getElementById("b22").addEventListener("mouseleave", () => {clearTimeout(timer); });
document.getElementById("b23").addEventListener("mouseleave", () => {clearTimeout(timer); });
document.getElementById("b24").addEventListener("mouseleave", () => {clearTimeout(timer); });
document.getElementById("b25").addEventListener("mouseleave", () => {clearTimeout(timer); });
document.getElementById("b26").addEventListener("mouseleave", () => {clearTimeout(timer); });
document.getElementById("b27").addEventListener("mouseleave", () => {clearTimeout(timer); });

document.getElementById("b31").addEventListener("mouseleave", () => {clearTimeout(timer); });
document.getElementById("b32").addEventListener("mouseleave", () => {clearTimeout(timer); });
document.getElementById("b33").addEventListener("mouseleave", () => {clearTimeout(timer); });
document.getElementById("b34").addEventListener("mouseleave", () => {clearTimeout(timer); });
document.getElementById("b35").addEventListener("mouseleave", () => {clearTimeout(timer); });
document.getElementById("b36").addEventListener("mouseleave", () => {clearTimeout(timer); });
document.getElementById("b37").addEventListener("mouseleave", () => {clearTimeout(timer); });

document.getElementById("b41").addEventListener("mouseleave", () => {clearTimeout(timer); });
document.getElementById("b42").addEventListener("mouseleave", () => {clearTimeout(timer); });
document.getElementById("b43").addEventListener("mouseleave", () => {clearTimeout(timer); });
document.getElementById("b44").addEventListener("mouseleave", () => {clearTimeout(timer); });
document.getElementById("b45").addEventListener("mouseleave", () => {clearTimeout(timer); });
document.getElementById("b46").addEventListener("mouseleave", () => {clearTimeout(timer); });
document.getElementById("b47").addEventListener("mouseleave", () => {clearTimeout(timer); });

document.getElementById("b51").addEventListener("mouseleave", () => {clearTimeout(timer); });
document.getElementById("b52").addEventListener("mouseleave", () => {clearTimeout(timer); });
document.getElementById("b53").addEventListener("mouseleave", () => {clearTimeout(timer); });
document.getElementById("b54").addEventListener("mouseleave", () => {clearTimeout(timer); });
document.getElementById("b55").addEventListener("mouseleave", () => {clearTimeout(timer); });
document.getElementById("b56").addEventListener("mouseleave", () => {clearTimeout(timer); });
document.getElementById("b57").addEventListener("mouseleave", () => {clearTimeout(timer); });




function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function changeName() {
  const username = getCookie('username');
  if (username) {
    const loginNameLink = document.querySelector("#login-name a");
    if (loginNameLink) {
      loginNameLink.textContent = " <" + username + "> ";
    } else {
      console.error('#login-name a element not found!');
    }
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