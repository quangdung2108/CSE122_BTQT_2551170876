const oNhap = document.getElementById("congViec");
const btnThem = document.getElementById("btnThem");
const danhSach = document.getElementById("danhSach");
const soViec = document.getElementById("soViec");
function capNhatSoViec() {
    let viecChuaXong = danhSach.querySelectorAll('input[type="checkbox"]:not(:checked)');
    soViec.textContent = viecChuaXong.length;
}
function themCongViec() {
    let noiDung = oNhap.value.trim();
    if (noiDung === "") {
        alert("Vui lòng nhập công việc!");
        oNhap.focus();
        return;
    }
    let li = document.createElement("li");
    let label = document.createElement("label");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    let span = document.createElement("span");
    span.textContent = noiDung;
    label.appendChild(checkbox);
    label.appendChild(span);
    let btnXoa = document.createElement("button");
    btnXoa.className = "btn-xoa";
    btnXoa.textContent = "Xóa";
    li.appendChild(label);
    li.appendChild(btnXoa);
    danhSach.appendChild(li);
    oNhap.value = "";
    oNhap.focus();
    capNhatSoViec();
}
btnThem.addEventListener("click", themCongViec);
oNhap.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        themCongViec();
    }
});
danhSach.addEventListener("click", function(event) {
    if (event.target.classList.contains("btn-xoa")) {
        let li = event.target.closest("li");
        li.remove();
        capNhatSoViec();
    }
});
danhSach.addEventListener("change", function(event) {
    if (event.target.type === "checkbox") {
        let li = event.target.closest("li");
        li.classList.toggle(
            "hoan-thanh",
            event.target.checked
        );
        capNhatSoViec();
    }
});
capNhatSoViec();