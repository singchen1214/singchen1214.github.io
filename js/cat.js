var fdb = new ForerunnerDB();
var db = fdb.db("myDataBase");

var studentCollection = db.collection('students');
//for (var i = 0; i < 10; i++) {
//
//
//    var newstudets={
//        name: "路人" + i,
//        age: Math.floor(100*Math.random())
//    }
//       studentCollection.insert(newstudets);
//}
//   
// studentCollection.save();

studentCollection.load()

function createHTMLString(_id, name) {
    return "<tr><td class='stundetsId'>" + _id + "</td><td>" + name + "</td><td><button class='deleteButton btn btn-danger 'data-id='" + _id + "'>刪除</button></td></tr>";
}



function afterload() {
    var stundets = studentCollection.find()
    console.log(stundets)
    for (var i = stundets.length - 1; i >= 0; i--) {
        console.log(stundets[i]._id)
        $("#studentsTable").append(createHTMLString(stundets[i]._id, stundets[i].name));
    }
    $("#studentsTable").on("click", ".stundetsId", function() {
        var stundetId = $(this).text();
        console.log(stundetId)

        var query = {
            _id: stundetId
        }
        var student = studentCollection.find(query)[0];

        $("#studentsName").text(student.name);
        $("#studentsAge").text(student.age);
        $("#studentsId").text(student._id);

        $("#studentsInfo").modal('show');
    })
};

setTimeout(afterload, 500);


function createData() {
    var name = $("#name").val();
    var age = $("#age").val();
    var newstudent = {
        name: name,
        age: age
    }
    studentCollection.insert(newstudent);
    studentCollection.save();
    var student = studentCollection.find(newstudent)[0];
    $("#studentsTable").append(createHTMLString(student._id, student.name));
}
$("#createData").click(createData);



function deletedata() {

    var id = $(this).attr("data-id")
    console.log(id)
    studentCollection.remove({
        _id: id


    });
   studentCollection.save()

       $(this).parents("tr").remove()
}
$("#studentsTable").on("click", ".deleteButton", deletedata);