$(document).ready(function() {
    $('.update-button').on('click', function(event) {

        var href = $(this).attr('href');
        $.get(href, function(user, status) {
            $('#updateID').val(user.id);
            $('#updateName').val(user.name);
            $('#updateSurname').val(user.surname);
            $('#updateAge').val(user.age);
            $('#updateEmail').val(user.email);
            $('#updatePassword').val(user.password);
            $('#updateRoles').val(user.roles);
        });

        $('#updateModal').modal();
    });
});