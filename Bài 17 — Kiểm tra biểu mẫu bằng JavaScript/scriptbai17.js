
const form = document.getElementById("formDangKy");

const hoTen = document.getElementById("hoTen");
const email = document.getElementById("email");
const matKhau = document.getElementById("matKhau");
const xacNhan = document.getElementById("xacNhan");

function thongBao(input, idLoi, hopLe, noiDung) {

    let thongBao = document.getElementById(idLoi);

    input.classList.remove("hop-le", "khong-hop-le");
    if (hopLe) {
        input.classList.add("hop-le");

        thongBao.textContent = "✓ Hợp lệ";
        thongBao.className = "thong-bao-dung";
    }
    else {
        input.classList.add("khong-hop-le");

        thongBao.textContent = "✗ " + noiDung;
        thongBao.className = "thong-bao-loi";
    }

    return hopLe;
}

function kiemTraHoTen() {

    let giaTri = hoTen.value.trim();

    if (giaTri === "") {
        return thongBao(
            hoTen,
            "loiHoTen",
            false,
            "Họ tên không được để trống"
        );
    }

    return thongBao(hoTen, "loiHoTen", true, "");
}

function kiemTraEmail() {

    let giaTri = email.value.trim();

    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (giaTri === "") {
        return thongBao(
            email, "loiEmail", false,
            "Email không được để trống"
        );
    }

    if (!regex.test(giaTri)) {
        return thongBao(
            email, "loiEmail", false,
            "Email không hợp lệ (thiếu tên miền)"
        );
    }

    return thongBao(email, "loiEmail", true, "");
}

function kiemTraMatKhau() {

    let giaTri = matKhau.value;

    if (giaTri.length < 6) {
        return thongBao(
            matKhau,
            "loiMatKhau",
            false,
            "Mật khẩu phải có ít nhất 6 ký tự"
        );
    }

    return thongBao(matKhau, "loiMatKhau", true, "");
}

function kiemTraXacNhan() {

    let giaTri = xacNhan.value;

    if (giaTri === "") {
        return thongBao(
            xacNhan,
            "loiXacNhan",
            false,
            "Vui lòng xác nhận mật khẩu"
        );
    }

    if (giaTri !== matKhau.value) {
        return thongBao(
            xacNhan,
            "loiXacNhan",
            false,
            "Mật khẩu xác nhận không khớp"
        );
    }

    return thongBao(xacNhan, "loiXacNhan", true, "");
}

hoTen.addEventListener("input", kiemTraHoTen);
email.addEventListener("input", kiemTraEmail);

matKhau.addEventListener("input", function() {
    kiemTraMatKhau();
    kiemTraXacNhan();
});

xacNhan.addEventListener("input", kiemTraXacNhan);
form.addEventListener("submit", function(event) {
    event.preventDefault();
    let dungHoTen = kiemTraHoTen();
    let dungEmail = kiemTraEmail();
    let dungMatKhau = kiemTraMatKhau();
    let dungXacNhan = kiemTraXacNhan();
    if (
        dungHoTen &&
        dungEmail &&
        dungMatKhau &&
        dungXacNhan
    ) {
        alert("Đăng ký thành công!");
    }
    else {
        alert("Vui lòng kiểm tra lại thông tin!");
    }
});
kiemTraHoTen();
kiemTraEmail();
kiemTraMatKhau();
kiemTraXacNhan();
