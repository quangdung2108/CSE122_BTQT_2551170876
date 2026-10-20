function taoAnhChuSo(chuSo) {
    const anh = document.createElement("img");
    const tenAnh = String(chuSo).padStart(2, "0");
    anh.className = "chu-so";
    anh.src = "/imgs/" + tenAnh + ".gif";
    anh.alt = chuSo;
    return anh;
}
function taoAnhHaiCham() {
    const anh = document.createElement("img");
    anh.className = "dau-hai-cham";
    anh.src = "/imgs/haicham.gif";
    anh.alt = ":";
    return anh;
}
function themCapSo(khung, giaTri) {
    for (let i = 0; i < giaTri.length; i++) {
        khung.appendChild(taoAnhChuSo(giaTri[i]));
    }
}
function capNhatDongHo() {
    const hienTai = new Date();
    const gio = String(hienTai.getHours()).padStart(2, "0");
    const phut = String(hienTai.getMinutes()).padStart(2, "0");
    const giay = String(hienTai.getSeconds()).padStart(2, "0");
    const khung = document.getElementById("dongHo");
    khung.replaceChildren();
    themCapSo(khung, gio);
    khung.appendChild(taoAnhHaiCham());
    themCapSo(khung, phut);
    khung.appendChild(taoAnhHaiCham());
    themCapSo(khung, giay);
    capNhatLoiChao(hienTai.getHours());
}
function capNhatLoiChao(gio) {
    const loiChao = document.getElementById("loiChao");
    if (gio >= 5 && gio < 12) {
        loiChao.textContent = "Chào buổi sáng";
    } else if (gio >= 12 && gio < 18) {
        loiChao.textContent = "Chào buổi chiều";
    } else if (gio >= 18 && gio < 22) {
        loiChao.textContent = "Chào buổi tối";
    } else {
        loiChao.textContent = "Chúc ngủ ngon";
    }
}

capNhatDongHo();
setInterval(capNhatDongHo, 1000);