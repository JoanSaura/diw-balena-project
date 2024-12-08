$(document).ready(() => {
  const DEFAULT_USER = {
    id: 1,
    name: "admin",
    email: "desenvolupador@iesjoanramis.org",
    password: "Ramis.20", 
    edit_users: true,
    edit_news: true,
    edit_bone_files: true,
    active: true,
    is_first_login: true,
  };

  const initializeDefaultUser = () => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const defaultUserExists = storedUsers.some(
      (user) => user.email === DEFAULT_USER.email
    );

    if (!defaultUserExists) {
      storedUsers.push(DEFAULT_USER);
      localStorage.setItem("users", JSON.stringify(storedUsers));
    } else {
      console.log(DEFAULT_USER);
    }
  };

  initializeDefaultUser();

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
    return passwordPattern.test(password);
  };

  const hashPassword = (password, salt) => {
    const saltedPassword = password + salt; 
    return CryptoJS.SHA256(saltedPassword).toString();
  };

  $("#login").on("submit", (e) => {
    e.preventDefault();

    const email = $("#email").val().trim(); 
    const password = $("#password").val().trim(); 
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = storedUsers.find((user) => user.email === email);

    $("#login-message").hide();

    if (!validateEmail(email)) {
      $("#login-message").text("Correu electrònic invàlid. Si us plau, introdueix un correu vàlid.").css("color", "red").show();
      return;
    }

    if (!validatePassword(password)) {
      $("#login-message").text("Contrasenya invàlida.").css("color", "red").show();
      return;
    }

    if (!user) {
      $("#login-message").text("Usuari no trobat! Comprova el teu correu electrònic.").css("color", "red").show();
      return;
    }

    const inputPasswordHash = hashPassword(password, user.salt);

    if (user.password === inputPasswordHash) {
      $("#login-message").text("Inici de sessió exitós!").css("color", "green").show();
      localStorage.setItem("currentUser", JSON.stringify(user));
      if (user.is_first_login) {
        alert(
          "Necessites canviar la teva contrasenya en el primer inici de sessió. La contrasenya ha de tenir almenys 12 caràcters, incloure majúscules, minúscules, números i caràcters especials."
        );
        console.log("Usuari en primer inici de sessió. Es requereix canviar la contrasenya.");
      }
      window.location.href = "../index.html";
    } else {
      $("#login-message").text("Contrasenya incorrecta. Si us plau, torna-ho a intentar.").css("color", "red").show();
    }
  });

  $(window).on("beforeunload", () => {
    initializeDefaultUser();
  });
});
