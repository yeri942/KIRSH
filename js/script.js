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

$(".main_warp").click(() => {
    $(".main_back").css({
        "clip-path": "circle(100%)",
        "transition-duration": "0.5s",
    });
    $(".main_warp").css({
        "overflow-y": "scroll",
    });
    $(".main_warp").off("mousemove");
    setTimeout(() => {
        $("#content").show();
        var offset = $("#content").offset(); //해당 위치 반환
        $("html, body").animate({ scrollTop: offset.top }, 400);
    }, 1000);
});
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
