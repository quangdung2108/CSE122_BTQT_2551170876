const chuyenCheDo=document.getElementById("chuyenCheDo");
const trangThai=document.getElementById("trangThai");

chuyenCheDo.addEventListener("change",function(){
    if(chuyenCheDo.checked){
        document.body.classList.add("toi")
        trangThai.textContent="Tối";
    }
    else{
        document.body.classList.remove("toi")
        trangThai.textContent="Sáng";
    }
}
);