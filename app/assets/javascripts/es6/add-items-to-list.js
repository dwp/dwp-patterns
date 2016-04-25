$(document).on('click', '.button-add-another', function (e) {
  var beforeThis = $(this).parents('.grid-row');
  e.preventDefault();
  insertFields(beforeThis);
  sortFields();
});

$(document).on('click', '.remove-list-item', function (e) {
  e.preventDefault();
  $(this).parents('.list-item-wrapper').remove();
  sortFields();
});

function insertFields(element) {
  element.before(`
    <div class="grid-row">
      <div class="form-group-compound list-item-wrapper">
        <h2 class="heading-medium">Item 1</h2>
        <fieldset>
          <div class="column-one-third no-padding">
            <div class="form-group list-item">
              <label class="form-label" for="field-x">
                Field label
              </label>
              <input type="text" class="form-control" id="field-x" name="field-x">
            </div>
          </div>
          <div class="column-one-third no-padding">
            <div class="form-group list-item">
              <label class="form-label" for="field-x">
                Field label
              </label>
              <input type="text" class="form-control" id="field-x" name="field-x">
            </div>
          </div>
          <div class="column-one-third no-padding">
            <div class="list-item">
            </div>
          </div>
        </fieldset>
        <hr />
      </div>
    </div>
  `);
}

function sortFields() {
  var listCounter = 1;
  var inputCounter = 1;

  $(document).find('.list-item-wrapper').each(function () {
    $(this).find('h2').text('Item ' + listCounter);

    if ($(this).find('.remove-list-item').length === 0) {
      $(this).find('.list-item:last').append(`<a id="remove-item-${listCounter}" class="remove-list-item" href="#">Remove this</a>`);
    } else {
      $(this).find('.remove-list-item').attr('id', `remove-item-${listCounter}`);
    }

    $(this).find('.list-item').children('label').each(function () {
      $(this).attr('for', 'field-' + inputCounter);
      inputCounter++;
    });

    $(this).find('.list-item').children('input').each(function () {
      var labelNo = $(this).parent().find('label').attr('for').split('-').pop();
      $(this).attr('id', 'field-' + labelNo);
      $(this).attr('name', 'field-' + labelNo);
    });

    listCounter++;
  });

  if ($(document).find('.list-item-wrapper').length === 1) {
    $('.remove-list-item').remove();
  }
}
