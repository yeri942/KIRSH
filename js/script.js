var timestamp = 0; // 시간
var mX = 0; // 마우스 X축
var mY = 0; // 마우스 Y축

// 메인 마우스 무브 이벤트
$(".main_warp").mousemove((e) => {
    x = e.pageX;
    y = e.pageY;
    var now = Date.now(); // 현재 시간
    var dt = now - timestamp; // 현재 시간 - 직전 시간
    var distance = Math.abs(x - mX) + Math.abs(y - mY); // 현재 마우스 위치 - 직전 마우스 위치
    var speed = (distance / dt) * 2; // (이동한 거리 / 걸린 시간)을 소수점 2자리까지 표기
    mX = x; // 마우스 X축 최신화
    mY = y; // 마우스 Y축 최신화
    timestamp = now; // 시간 최신화

    if (speed > 50) {
        speed = 50;
    }
    $(".main_back").css({
        "clip-path": `circle(calc(150px + ${speed}%) at ${x}px ${y}px)`,
        "transition-duration": "0.1s",
    });
});

// 메인 클릭시 이벤트
$(".main_warp").click(() => {
    $(".main_back").css({
        "clip-path": "circle(100%)",
        "transition-duration": "0.5s",
    });
    $(".main_warp").off("mousemove");
    setTimeout(() => {
        $(".contentblock").show();
        document
            .getElementById("content")
            .scrollIntoView({ behavior: "smooth" });
    }, 1000);
});

// 인트로 텍스트 슬라이더
var txtswiper = new Swiper(".txtswiper", {
    direction: "vertical",
    slidesPerView: 2,
    spaceBetween: 30,
    mousewheel: true,
    watchOverflow: true,
    on: {
        slideChange: function () {
            setTimeout(function () {
                txtswiper.params.touchReleaseOnEdges = false;
                txtswiper.params.mousewheel.releaseOnEdges = false;
            });
        },
        reachEnd: function () {
            setTimeout(function () {
                txtswiper.params.touchReleaseOnEdges = true;
                txtswiper.params.mousewheel.releaseOnEdges = true;
            }, 500);
        },
        reachBeginning: function () {
            setTimeout(function () {
                txtswiper.params.touchReleaseOnEdges = true;
                txtswiper.params.mousewheel.releaseOnEdges = true;
            }, 500);
        },
    },
});

// 굿즈 페이지넘김
$(".goods_wrap").on("mousewheel", function (e) {
    var wheel = e.originalEvent.wheelDelta;
    if (wheel <= 0) {
        //스크롤 내릴때
        $(this).find(".goods_block_list").css("right", "0");
        $(this).css("overflow", "scroll");
    }
});
// 굿즈 페이지 상단 찍을 시 goods_block_list 가 다시 접히게...
$(".goods_block_list").on("mousewheel", function () {
    if ($(document).scrollTop() <= Math.floor($(this).offset().top) + 1) {
        $(this).css("right", "-100%");
        $(this).parent(".goods_wrap").css("overflow", "hidden");
    }
});

// 비디오블럭
$(document).ready(function () {
    $("[data-vbg]").youtube_background(); // 실행
});
