$("#main_contact_form").submit((e) => handleSubmit(e, "#main_contact_form"));
$("#workshop-form").submit((e) => handleSubmit(e, "#workshop-form"));
$("#contact_form").submit((e) => handleSubmit(e, "#contact_form"));

function handleSubmit(e, selector) {
  console.log(arguments);
  e.preventDefault();
  var form = $(selector);
  console.log(form);
  var formData = form.serialize();
  $.ajax({
    type: "POST",
    url: form[0].action || form.action,
    data: formData,
    dataType: "jsonp",
    success: function (json) {
      console.log(json);
      $(selector)[0].reset();
      thankYou(selector);
    },
    error: function (response) {
      if (response.readyState == 4 && response.status == 200) {
        $(selector)[0].reset();
        thankYou(selector);
      }
    },
    crossDomain: true,
  });
}

function thankYou(id) {
  $(`#thankyou-${id.slice(1)}`).modal("show");
}
