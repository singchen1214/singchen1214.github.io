function hello() {
    var name = $("#name").val();
    var age = $("#age").val();
    var like = ""
    if ($("#meat").prop("checked")) { // 回傳布林值
        like += (""+ $("#meat").val())
    }
     if ($("#vage").prop("checked")) { // 回傳布林值
           like += (","+ $("#vage").val())
    }
      alert("你好，" + age + "歲的" + name + "。根據我的判斷，你應該喜歡吃" + like + "對不對？我很厲害吧！")
	$("#name").val("");
	$("#age").val("");
	$("#meat").prop("checked",false)
    $("#vage").prop("checked",false)
};



$('#hello').on("click", hello)
