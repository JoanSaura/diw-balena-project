$(document).ready(function () {
    $('#login').on('submit', function (e) {
      e.preventDefault();
  
      const newPassword = $('#new-password').val();
      const confirmPassword = $('#confirm-password').val();
      const passwordMessage = $('#password-message');
      
      passwordMessage.hide().text('');
      
      let errorMessage = '';
  
      if (!newPassword || !confirmPassword) {
        errorMessage = 'Tots els camps són obligatoris.';
      } else if (newPassword !== confirmPassword) {
        errorMessage = 'Les contrasenyes no coincideixen.';
      } else if (newPassword.length < 8) {
        errorMessage = 'La contrasenya ha de tenir almenys 8 caràcters.';
      }
      
      if (errorMessage) {
        passwordMessage.text(errorMessage).show();
        return;
      }
  
      passwordMessage.css('color', 'green').text('Contrasenya canviada correctament!').show();
  
      const userData = { is_first_login: false };
      
      window.location.href = 'admin_page.html';
    });
});
