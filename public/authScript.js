window.onload = () => {

    $('#registerBtn').click(() => {
      $('#mask, #registerPage').css('display', 'block');
    });

    $(document).click(() => {
        $('#mask, #registerPage').hide();
    });
    $('.st-prop').click((e) => {
        e.stopPropagation();
    });

}