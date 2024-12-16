$(document).ready(() => {
  const DEFAULT_USER = {
    id: 1,
    name: "admin",
    email: "desenvolupador@iesjoanramis.org",
    password: "Ramis.20",
    is_admin: true,
    edit_users: true,
    edit_news: true,
    edit_bone_files: true,
    active: true,
    is_first_login: true,
  };

  // Inicialitza l'usuari per defecte en l'emmagatzematge local si no existeix
  const initializeDefaultUser = () => {
    console.log(DEFAULT_USER);
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const defaultUserExists = storedUsers.some(
      (user) => user.email === DEFAULT_USER.email
    );

    if (!defaultUserExists) {
      storedUsers.push(DEFAULT_USER);
      localStorage.setItem("users", JSON.stringify(storedUsers));
      console.log("Usuari per defecte creat");
    }
  };

  initializeDefaultUser();

  // Gestiona el formulari d'inici de sessió
  $("#login").on("submit", (e) => {
    e.preventDefault();

    // Obtenim les entrades de correu electrònic i contrasenya
    const email = $("#login input[type='text']").val().trim();
    const password = $("#login input[type='password']").val().trim();

    const loginMessage = $("#login-message"); // El paràgraf on es mostraran els missatges d'error o èxit
    loginMessage.hide(); // Ocultar missatge al principi

    if (!email || !password) {
      // Mostrar missatge d'error si falten camps
      loginMessage.text("Si us plau, introdueix tant el correu electrònic com la contrasenya.");
      loginMessage.css("color", "red"); // Canviar color a vermell per error
      loginMessage.show(); // Mostrar missatge
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = storedUsers.find((user) => user.email === email);

    if (!user) {
      // Mostrar missatge d'error si l'usuari no existeix
      loginMessage.text("Usuari no trobat. Si us plau, comprova el teu correu electrònic.");
      loginMessage.css("color", "red"); // Canviar color a vermell per error
      loginMessage.show(); // Mostrar missatge
      return;
    }

    // Comprovem si la contrasenya és correcta
    if (password === user.password) {
      // Mostrar missatge d'èxit
      loginMessage.text(`Benvingut/da, ${user.name}! Has iniciat sessió correctament.`);
      loginMessage.css("color", "green"); 
      loginMessage.show(); 

      localStorage.setItem("currentUser", JSON.stringify(user));

      if (user.is_first_login) {
        window.location.href = "../html/change_password.html";
      } else {
        window.location.href = "../html/admin_page.html";
      }
    } else {
      loginMessage.text("Contrasenya incorrecta. Si us plau, prova de nou.");
      loginMessage.css("color", "red"); 
      loginMessage.show(); 
    }
  });
});
