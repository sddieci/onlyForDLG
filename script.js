// Xử lý khi trạng thái hộp thư thay đổi
$("#messageState").on("change", () => {
	const isChecked = $("#messageState").is(":checked");
	const $message = $(".message");
	const $heart = $(".heart");
	const $container = $(".container");

	// Reset các trạng thái trước khi thêm mới
	$message.removeClass("openNor closeNor closed no-anim");
	$heart.removeClass("openHer closeHer openedHer no-anim beating");

	if (isChecked) {
		// Mở hộp thư
		$message.addClass("openNor");
		$heart.addClass("openHer");
		$container.stop().animate({ "backgroundColor": "#f48fb1" }, 2000); // Màu hồng đậm
		console.log("Mở thư");
	} else {
		// Đóng hộp thư
		$message.addClass("closeNor");
		$heart.addClass("closeHer");
		$container.stop().animate({ "backgroundColor": "#fce4ec" }, 2000); // Màu hồng nhạt
		console.log("Đóng thư");
	}
});

// Xử lý khi hoạt ảnh của hộp thư kết thúc
$(".message").on("animationend webkitAnimationEnd oanimationend msAnimationEnd", () => {
	const $message = $(".message");

	if ($message.hasClass("closeNor")) {
		// Nếu đang đóng, đặt trạng thái 'closed'
		$message.addClass("closed");
	}

	// Đặt trạng thái không hoạt ảnh
	$message.removeClass("openNor closeNor").addClass("no-anim");
	console.log("Hoạt ảnh hộp thư kết thúc");
});

// Xử lý khi hoạt ảnh của trái tim kết thúc
$(".heart").on("animationend webkitAnimationEnd oanimationend msAnimationEnd", () => {
	const $heart = $(".heart");

	if (!$heart.hasClass("closeHer")) {
		// Khi mở, thêm trạng thái 'openedHer' và hiệu ứng đập
		$heart.addClass("openedHer beating");
	} else {
		// Khi đóng, thêm trạng thái không hoạt ảnh
		$heart.addClass("no-anim").removeClass("beating");
	}

	// Xóa trạng thái mở/đóng
	$heart.removeClass("openHer closeHer");
	console.log("Hoạt ảnh trái tim kết thúc");
});

// Xử lý nhấn vào trái tim
document.querySelector('.heart').addEventListener('click', () => {
	document.body.classList.toggle('active'); // Thay đổi trạng thái 'active' của body
});

let heartInterval;

function createFlyingHeart() {
    const heart = document.createElement('div');
    heart.classList.add('flying-heart');
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDelay = '1s'; // Không cần delay vì sẽ tạo liên tục
    document.body.appendChild(heart);

    // Xóa trái tim sau khi hoạt ảnh kết thúc
    setTimeout(() => {
        heart.remove();
    }, 4000); // Thời gian hoạt ảnh kết thúc
}

function startFlyingHearts() {
    heartInterval = setInterval(() => {
        createFlyingHeart();
    }, 300); // Tạo trái tim mới mỗi 300ms
}

function stopFlyingHearts() {
    clearInterval(heartInterval); // Dừng tạo trái tim
}

document.addEventListener('DOMContentLoaded', () => {
    alert("Nhớ bật nhạc ở bên góc phải nhéee");
    const bgMusic = document.getElementById('bg-music');
    const musicToggle = document.getElementById('music-toggle');
    const themeToggle = document.getElementById('theme-toggle');

    // Bật/Tắt nhạc nền
    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.textContent = '🔊'; // Biểu tượng bật âm thanh
        } else {
            bgMusic.pause();
            musicToggle.textContent = '🔇'; // Biểu tượng tắt âm thanh
        }
    });

    // Bật/Tắt chế độ sáng/tối
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        themeToggle.textContent = document.body.classList.contains('dark-mode') ? '🌙' : '🌞';

        // Hiệu ứng trái tim bay khi bật Dark Mode
        if (document.body.classList.contains('dark-mode')) {
            startFlyingHearts(); // Bắt đầu tạo trái tim
        } else {
            stopFlyingHearts(); // Dừng tạo trái tim
        }
    });
});