$(document).ready(() => {
  const DEFAULT_USER = {
    id: 1,
    name: "admin",
    email: "desenvolupador@iesjoanramis.org",
    password: "Ramis.20",
    admin: true,
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
      console.log("Usuari predeterminat creat");
    }
  };

  initializeDefaultUser();

  $("#login").on("submit", (e) => {
    e.preventDefault();

    const email = $("#login input[type='text']").val();
    const password = $("#login input[type='password']").val();
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = storedUsers.find((user) => user.email === email);

    if (!user) {
      alert("Usuari no trobat! Comprova el teu correu electrònic.");
      return;
    }

    if (password === user.password) {
      alert(`Benvingut/da, ${user.name}! Has iniciat sessió correctament.`);
      localStorage.setItem("currentUser", JSON.stringify(user));

      if (user.is_first_login) {
        alert("Necessites canviar la teva contrasenya en el primer inici de sessió.");
        window.location.href = "../html/change_password.html";
      } else {
        window.location.href = "../html/admin_page.html";
      }
    } else {
      alert("Contrasenya incorrecta. Si us plau, torna-ho a intentar.");
    }
  });
});
