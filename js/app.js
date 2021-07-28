$("#main_contact_form").submit((e) => handleSubmit(e, "#main_contact_form"));
$("#workshop-form").submit((e) => handleSubmit(e, "#workshop-form"));
$("#contact_form").submit((e) => handleSubmit(e, "#contact_form"));
let submit_button = $("#submit-workshop");
function handleSubmit(e, selector) {
  e.preventDefault();
  var form = $(selector);
  // console.log(form);
  submit_button.attr("disabled", "disabled");
  var formData = form.serialize();
  $.ajax({
    type: "POST",
    url: form[0].action || form.action,
    data: formData,
    dataType: "jsonp",
    success: function (json) {
      $(selector)[0].reset();
      thankYou(selector);
      submit_button.removeAttr("disabled");
    },
    error: function (response) {
      if (response.readyState == 4 && response.status == 200) {
        $(selector)[0].reset();
        thankYou(selector);
        submit_button.removeAttr("disabled");
      }
    },
    crossDomain: true,
  });
}

function thankYou(id) {
  $(`#thankyou-${id.slice(1)}`).modal("show");
}
