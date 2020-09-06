var currentId = null;
$(document).ready(function () {
  $("#saveReg").on("click", createData);
  $("#updateReg").on("click", postUpdatedData);
  $("#addNewReg").on("click", newRegistration);

  $(".editRecord").click(function () {
    let id = this.id.split("_")[1];
    getAndSet(id);
  });
  $(".deleteRecord").click(function () {
    let id = this.id.split("_")[1];
    remove(id);
  });
});

function newRegistration() {
  $("#updateReg").hide();
  $("#saveReg").show();
  clearForm();
  openModal("registrationModal");
}

function setForm(data) {
  $("#regName").val(data.name);
  $("#regPassword").val(data.password);
  $("#regEmail").val(data.email);
  $("#regAddress").val(data.address);
  $("#regAge").val(data.age);
  $("#regGender").val(data.gender);
}

function clearForm() {
  $("#regName").val("");
  $("#regPassword").val("");
  $("#regEmail").val("");
  $("#regAddress").val("");
  $("#regAge").val("");
  $("#regGender").val("");
}

function getForm() {
  var obj = {
    name: $("#regName").val(),
    password: $("#regPassword").val(),
    email: $("#regEmail").val(),
    address: $("#regAddress").val(),
    age: $("#regAge").val(),
    gender: $("#regGender").val(),
  };
  return obj;
}

function validateForm() {
  $("#registrationForm").validate({
    rules: {
      regName: {
        required: true,
        minlength: 3,
      },
      regPassword: {
        required: true,
        minlength: 6,
        maxlength: 32,
      },
      regEmail: {
        required: true,
        email: true,
      },
      regAddress: {
        required: true,
        maxlength: 50,
      },
      regAge: {
        required: true,
        min: 10,
      },
      regGender: {
        required: true,
      },
    },
  });
  return $("#registrationForm").valid();
}

function createData() {
  let isValid = validateForm();
  let formInfo = getForm();
  if (isValid) {
    $.ajax({
      type: "post",
      url: "/create",
      data: formInfo,
      dataType: "json",
      success: function (data) {
        closeModal("registrationModal");
        reloadFn();
      },
      error: function (e) {
        console.log("error occured", e);
      },
    });
  }
}

function getAndSet(id) {
  $("#updateReg").show();
  $("#saveReg").hide();
  $.ajax({
    type: "get",
    url: "/get/" + id,
    dataType: "json",
    success: function (data) {
      openModal("registrationModal");
      setForm(data);
      currentId = id;
    },
    error: function (e) {
      console.log("error occured", e);
    },
  });
}

function postUpdatedData() {
  let isValid = validateForm();
  let data = getForm();
  if (isValid) {
    $.ajax({
      type: "post",
      url: "/update/" + currentId,
      data: data,
      dataType: "json",
      success: function (data) {
        currentId = null;
        closeModal("registrationModal");
        reloadFn();
      },
      error: function (e) {
        console.log("error occured", e);
      },
    });
  }
}

function remove(id) {
  $.ajax({
    type: "delete",
    url: "/remove/" + id,
    dataType: "json",
    success: function (data) {
      reloadFn();
    },
    error: function (e) {
      console.log("error occured ... ", e);
    },
  });
}

function reloadFn() {
  location.reload();
}

function openModal(mId) {
  $(`#${mId}`).modal("show");
}
function closeModal(mId) {
  $(`#${mId}`).modal("hide");
}
