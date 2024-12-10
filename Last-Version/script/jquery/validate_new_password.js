$(document).ready(function () {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
      window.location.href = 'login.html';
  }

  console.log(currentUser);

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

      currentUser.password = newPassword;
      currentUser.is_first_login = false;

      let storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      const userIndex = storedUsers.findIndex(user => user.email === currentUser.email);
      if (userIndex !== -1) {
          storedUsers[userIndex] = currentUser;
          localStorage.setItem("users", JSON.stringify(storedUsers));
      }

      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      window.location.href = 'admin_page.html';
  });
});
