var fdb = new ForerunnerDB();
var db = fdb.db("myDataBase");

var studentCollection = db.collection('students');
var parentCollection = db.collection('parents');
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
parentCollection.load()

function createHTMLString(_id, name) {
    return "<tr><td class='stundetsId'>" + _id + "</td><td>" + name + "</td><td><button class='updateButton btn btn-warning 'data-id='" + _id + "'>修改</button> <button class='deleteButton btn btn-danger 'data-id='" + _id + "'>刪除</button></td></tr>";
}

function createparentHTMLString(_id,name){
    return "<option value='"+_id+"'>"+name+"</option>";
}

function afterload() {
    var stundets = studentCollection.find()
    console.log(stundets)
    for (var i = stundets.length - 1; i >= 0; i--) {
        console.log(stundets[i]._id)
        $("#studentsTable").append(createHTMLString(stundets[i]._id, stundets[i].name));
    }
    var parents = parentCollection.find()
    for (var i = parents.length - 1; i >= 0; i--) {
        console.log(parents[i]._id)
        $("#parent-id").append(createparentHTMLString(parents[i]._id, parents[i].name));
        $("#updateParent-id").append(createparentHTMLString(parents[i]._id, parents[i].name));
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
        $("#studentsClass").text(student.class);


        $("#studentsInfo").modal('show');
    })
};

setTimeout(afterload, 500);


function createData() {
    var name = $("#name").val();
    var age = $("#age").val();
    var newClass = $("#class").val();
    var parentID =$("#parent-id").val();
    var newstudent = {
        name: name,
        age: age,
        class: newClass,
        parentID:parentID 
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

function updatedata() {
    var studentsId = $(this).attr("data-id")
    console.log(studentsId)

    var query = {
        _id: studentsId
    }
    var student = studentCollection.find(query)[0];

    $("#updateName").val(student.name);
    $("#updateAge").val(student.age);
    $("#updateClass").val(student.class);
    $("#updateParent-id").val(student.parentID);

    $("#updateSave").attr("data-id", studentsId);


    $("#updateModal").modal('show');
}


$("#studentsTable").on("click", ".deleteButton", deletedata);
$("#studentsTable").on("click", ".updateButton", updatedata);

function updateSave() {
    var studentsId = $(this).attr("data-id");
    var parentID = $("#updateParent-id").val()
    var newstudent = {
        name: $("#updateName").val(),
        age: $("#updateAge").val(),
        class: $("#updateClass").val(),
        parentID: parentID
    }

    studentCollection.updateById(studentsId, newstudent);
    studentCollection.save();
    parentCollection.save();
    $("#updateModal").modal('hide');
}

$("#updateSave").on("click", updateSave);


function findOldAge() {
    var findStart = $("#findBiggerAgeInput").val();
    console.log(findStart)
    stundets = studentCollection.find({
        age: {
            $gte: findStart / 1
        }
    });

    $("#studentsTable").find("tr").remove();
    for (var i = stundets.length - 1; i >= 0; i--) {
        $("#studentsTable").append(createHTMLString(stundets[i]._id, stundets[i].name));
    }
}


$("#findBiggerAgeButton").on("click", findOldAge)



function findYoungAge() {
    var findSmallStart = $("#findSmallerAgeInput").val();
    console.log(findSmallStart)
    stundets = studentCollection.find({
        age: {
            $lte: findSmallStart / 1
        }
    });
}


function search() {

    var findOldAge = $("#findBiggerAgeInput").val();

    var selectedClasses = []

    if ($("#cleaningClass").prop("checked")) {
        console.log("尋找衛生隊隊員中")
        selectedClasses.push("衛生隊");
    }
    if ($("#trafficClass").prop("checked")) {
        console.log("尋找交通隊隊員中")
        selectedClasses.push("交通隊");
    }
    if ($("#87Class").prop("checked")) {
        console.log("尋找87大隊隊員中")
        selectedClasses.push("87大隊");
    }
    if ($("#noClass").prop("checked")) {
        console.log("尋找尚未加入任何隊伍的人中")
        selectedClasses.push("未加入任何隊伍");
    }

console.log(findOldAge)


    var stundets = studentCollection.find({
        age: {
            $gt: findOldAge
        },
        class: {
            $in: selectedClasses
        }
    });
    console.log(stundets)


    $("#studentsTable").find("tr").remove();
    for (var i = stundets.length - 1; i >= 0; i--) {
        $("#studentsTable").append(createHTMLString(stundets[i]._id, stundets[i].name));
    }

}



$("#findSmallerAgeButton").on("click", findYoungAge)
$("#findClassButton").on("click", search)