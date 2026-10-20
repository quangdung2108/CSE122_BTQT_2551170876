
// Lấy ảnh hoa hồng
const hoaHong = document.getElementById("hoaHong");

// Danh sách các hiệu ứng
const danhSachHieuUng = [
    "gray",
    "xray",
    "invert",
    "fliph",
    "flipv",
    "glow",
    "shadow",
    "boldshadow",
    "dropshadow",
    "blur",
    "wave",
    "mask",
    "alpha"
];

// Hàm thay đổi hiệu ứng
function doiHieuUng(hieuUng, nut) {

    // Xóa tất cả hiệu ứng cũ
    danhSachHieuUng.forEach(function(ten) {
        hoaHong.classList.remove(ten);
    });

    // Xóa trạng thái của các nút
    let cacNut = document.querySelectorAll("button");

    cacNut.forEach(function(button) {
        button.classList.remove("active");
    });

    // Thêm hiệu ứng mới cho ảnh
    hoaHong.classList.add(hieuUng);

    // Đổi màu nút đang được chọn
    nut.classList.add("active");
}

// Thiết lập hiệu ứng ban đầu
hoaHong.classList.add("gray");
