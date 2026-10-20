
const phepTinh = document.getElementById("phepTinh");
const ketQua = document.getElementById("ketQua");

// Giá trị ban đầu
let bieuThuc = "12+8×3";
let ketQuaHienTai = "36";
let vuaTinhXong = true;

// Định dạng kết quả
function dinhDang(so) {
    return String(Number(so.toPrecision(12)));
}

// Hàm tính toán biểu thức
function tinhBieuThuc(chuoi) {

    let s = chuoi
        .replaceAll("×", "*")
        .replaceAll("÷", "/")
        .replace(/[−–—]/g, "-")
        .replace(/\s/g, "");

    let i = 0;

    if (s === "") {
        throw new Error("Biểu thức rỗng");
    }

    // Xử lý số, số âm và dấu ngoặc
    function laySo() {

        if (s[i] === "+") {
            i++;
            return laySo();
        }

        if (s[i] === "-") {
            i++;
            return -laySo();
        }

        let so;

        if (s[i] === "(") {
            i++;

            so = congTru();

            if (s[i] !== ")") {
                throw new Error("Sai dấu ngoặc");
            }

            i++;
        } else {
            let phanSo = s.slice(i).match(
                /^(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)/
            );

            if (!phanSo) {
                throw new Error("Số không hợp lệ");
            }

            so = Number(phanSo[0]);
            i += phanSo[0].length;
        }

        // Xử lý phần trăm
        while (s[i] === "%") {
            so = so / 100;
            i++;
        }

        return so;
    }

    // Ưu tiên nhân và chia
    function nhanChia() {
        let so = laySo();

        while (s[i] === "*" || s[i] === "/") {
            let dau = s[i];
            i++;

            let soTiep = laySo();

            if (dau === "*") {
                so = so * soTiep;
            } else {
                if (soTiep === 0) {
                    throw new Error("Không thể chia cho 0");
                }

                so = so / soTiep;
            }
        }

        return so;
    }

    // Xử lý cộng và trừ
    function congTru() {
        let so = nhanChia();

        while (s[i] === "+" || s[i] === "-") {
            let dau = s[i];
            i++;

            let soTiep = nhanChia();

            if (dau === "+") {
                so = so + soTiep;
            } else {
                so = so - soTiep;
            }
        }

        return so;
    }

    let ketQuaTinh = congTru();

    if (i !== s.length || !Number.isFinite(ketQuaTinh)) {
        throw new Error("Phép tính không hợp lệ");
    }

    return ketQuaTinh;
}

// Hàm hiển thị lên màn hình
function hienThi() {

    phepTinh.textContent = bieuThuc
        .replace(/([+−×÷])/g, " $1 ")
        .replace(/\s+/g, " ")
        .trim() || "0";

    ketQua.textContent = ketQuaHienTai;
}

// Hàm xử lý các nút bấm
function bamNut(giaTri) {

    // Nút C: Xóa toàn bộ
    if (giaTri === "C") {
        bieuThuc = "";
        ketQuaHienTai = "0";
        vuaTinhXong = false;

        hienThi();
        return;
    }

    // Nút =: Tính kết quả
    if (giaTri === "=") {

        if (bieuThuc === "") {
            ketQuaHienTai = "0";
            hienThi();
            return;
        }

        try {
            let so = tinhBieuThuc(bieuThuc);

            ketQuaHienTai = dinhDang(so);
            vuaTinhXong = true;

        } catch (loi) {
            console.error(loi.message);
            ketQuaHienTai = "Lỗi";
            vuaTinhXong = false;
        }

        hienThi();
        return;
    }

    // Nếu vừa tính xong
    if (vuaTinhXong) {

        if (
            /^[0-9.]$/.test(giaTri) ||
            giaTri === "()" ||
            giaTri === "("
        ) {
            bieuThuc = "";
            ketQuaHienTai = "0";
        } else {
            bieuThuc = ketQuaHienTai;
        }

        vuaTinhXong = false;
    }

    // Nếu màn hình đang báo lỗi
    if (ketQuaHienTai === "Lỗi") {
        bieuThuc = "";
        ketQuaHienTai = "0";
    }

    // Xử lý dấu ngoặc
    if (giaTri === "()" || giaTri === "(" || giaTri === ")") {

        let soMo = (bieuThuc.match(/\(/g) || []).length;
        let soDong = (bieuThuc.match(/\)/g) || []).length;

        let coTheDong = soMo > soDong &&
                        /[0-9)%]$/.test(bieuThuc);

        if (giaTri === ")" && !coTheDong) {
            return;
        }

        if (giaTri === "(" || (giaTri === "()" && !coTheDong)) {

            if (/[0-9)%]$/.test(bieuThuc)) {
                bieuThuc += "×";
            }

            bieuThuc += "(";

        } else {
            bieuThuc += ")";
        }
    }

    // Xử lý các nút số
    else if (/^[0-9]$/.test(giaTri)) {

        if (/[)%]$/.test(bieuThuc)) {
            bieuThuc += "×";
        }

        bieuThuc += giaTri;
    }

    // Xử lý dấu chấm thập phân
    else if (giaTri === ".") {

        let soCuoi = bieuThuc.match(/[0-9.]+$/);

        if (soCuoi && soCuoi[0].includes(".")) {
            return;
        }

        if (/[)%]$/.test(bieuThuc)) {
            bieuThuc += "×0.";
        }
        else if (/[0-9]$/.test(bieuThuc)) {
            bieuThuc += ".";
        }
        else {
            bieuThuc += "0.";
        }
    }

    // Xử lý phần trăm
    else if (giaTri === "%") {

        if (/[0-9)]$/.test(bieuThuc)) {
            bieuThuc += "%";
        }
    }

    // Xử lý cộng, trừ, nhân, chia
    else if (["+", "−", "×", "÷"].includes(giaTri)) {

        if (bieuThuc === "") {
            if (giaTri !== "−") return;

            bieuThuc = "−";
        }
        else if (/[+−×÷]$/.test(bieuThuc)) {
            bieuThuc = bieuThuc.slice(0, -1) + giaTri;
        }
        else if (bieuThuc.endsWith("(")) {
            if (giaTri !== "−") return;

            bieuThuc += giaTri;
        }
        else if (/[0-9)%]$/.test(bieuThuc)) {
            bieuThuc += giaTri;
        }
    }

    // Tự động tính kết quả khi đang nhập
    try {
        ketQuaHienTai = dinhDang(tinhBieuThuc(bieuThuc));
    } catch (loi) {
        // Biểu thức chưa hoàn chỉnh, chờ nhập tiếp
    }

    hienThi();
}

// Bắt sự kiện nhấn nút
document.querySelectorAll("button").forEach(function(nut) {

    nut.addEventListener("click", function() {
        bamNut(nut.dataset.value);
    });

});

// Hỗ trợ nhập bằng bàn phím
document.addEventListener("keydown", function(event) {

    let phim = event.key;

    if (/^[0-9.]$/.test(phim)) {
        bamNut(phim);
    }
    else if (phim === "Enter" || phim === "=") {
        event.preventDefault();
        bamNut("=");
    }
    else if (phim === "Escape" || phim.toLowerCase() === "c") {
        bamNut("C");
    }
    else if (phim === "*") {
        bamNut("×");
    }
    else if (phim === "/") {
        event.preventDefault();
        bamNut("÷");
    }
    else if (phim === "-") {
        bamNut("−");
    }
    else if (phim === "+" || phim === "%") {
        bamNut(phim);
    }
    else if (phim === "(" || phim === ")") {
        bamNut(phim);
    }
    else if (phim === "Backspace") {

        if (vuaTinhXong) {
            bieuThuc = ketQuaHienTai;
            vuaTinhXong = false;
        }

        bieuThuc = bieuThuc.slice(0, -1);

        if (bieuThuc === "") {
            ketQuaHienTai = "0";
        } else {
            try {
                ketQuaHienTai = dinhDang(
                    tinhBieuThuc(bieuThuc)
                );
            } catch (loi) {
                // Chờ nhập tiếp
            }
        }

        hienThi();
    }
});

// Hiển thị màn hình ban đầu
hienThi();
