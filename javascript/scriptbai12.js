const inputNgay = document.getElementById("ngay");
const inputThang = document.getElementById("thang");
const inputNam = document.getElementById("nam");
const btnInLich = document.getElementById("btnInLich");
function inLich() {
    let ngay = Number(inputNgay.value);
    let thang = Number(inputThang.value);
    let nam = Number(inputNam.value);
    if (
        inputNgay.value === "" ||
        inputThang.value === "" ||
        inputNam.value === "" ||
        !Number.isInteger(ngay) ||
        !Number.isInteger(thang) ||
        !Number.isInteger(nam) ||
        ngay < 1 || ngay > 31 ||
        thang < 1 || thang > 12 ||
        nam < 1000 || nam > 9999
    ) {
        alert("Vui lòng nhập ngày, tháng, năm hợp lệ!");
        return;
    }
    let ngayThang = new Date(nam, thang - 1, ngay);
    if (
        ngayThang.getDate() !== ngay ||
        ngayThang.getMonth() + 1 !== thang ||
        ngayThang.getFullYear() !== nam
    ) {
        alert("Ngày tháng không hợp lệ!");
        return;
    }
    let thu = ngayThang.getDay();
    let danhSachThu = [
        "Chủ nhật",
        "Thứ hai",
        "Thứ ba",
        "Thứ tư",
        "Thứ năm",
        "Thứ sáu",
        "Thứ bảy"
    ];
    document.getElementById("hienThiNam").textContent =
        nam;
    document.getElementById("hienThiThang").textContent =
        "Tháng " + (ngayThang.getMonth() + 1);
    document.getElementById("hienThiNgay").textContent =
        ngay;
    document.getElementById("hienThiThu").textContent =
        danhSachThu[thu];
    hienThiLoiChao();
}
function hienThiLoiChao() {
    let hienTai = new Date();
    let gio = hienTai.getHours();
    let loiChao = "";
    if (gio >= 5 && gio < 11) {
        loiChao = "Chào buổi sáng!";
    }
    else if (gio >= 11 && gio < 13) {
        loiChao = "Chào buổi trưa!";
    }
    else if (gio >= 13 && gio < 18) {
        loiChao = "Chào buổi chiều!";
    }
    else {
        loiChao = "Chào buổi tối!";
    }
    document.getElementById("loiChao").textContent =
        loiChao;
}
btnInLich.addEventListener("click", inLich);
inLich();