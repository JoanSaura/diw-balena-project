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

  $("#login").on("submit", (e) => {
    e.preventDefault();

    const email = $("#email").val().trim(); 
    const password = $("#password").val().trim(); 
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = storedUsers.find((user) => user.email === email);

    if (!user) {
      alert("Usuari no trobat! Comprova el teu correu electrònic.");
      return;
    }

    if (user.password === password) {
      alert(`Benvingut/da, ${user.name}! Has iniciat sessió correctament.`);
      localStorage.setItem("currentUser", JSON.stringify(user));
      if (user.is_first_login) {
        alert(
          "Necessites canviar la teva contrasenya en el primer inici de sessió."
        );
      }
      window.location.href = "../index.html";
    } else {
      alert("Contrasenya incorrecta. Si us plau, torna-ho a intentar.");
    }
  });

  $(window).on("beforeunload", () => {
    initializeDefaultUser();
  });
});
