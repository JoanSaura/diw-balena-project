$(document).ready(() => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const loginName = document.getElementById("username");
  const userCont = document.getElementById("user-cont");

  // Crear menú desplegable dinámicamente
  const dropdownMenu = document.createElement("div");
  dropdownMenu.className = "dropdown-menu";
  const menuList = document.createElement("ul");

  if (currentUser) {
    // Mostrar el nombre del usuario
    loginName.innerText = currentUser.name;
    loginName.style.cursor = "pointer";
    userCont.style.display = "none";
    loginName.style.display = "block";

    // Crear opción de Admin Page si el usuario es administrador
    if (currentUser.admin === true) {
      const adminPageOption = document.createElement("li");
      const adminLink = document.createElement("a");
      adminLink.href = "../html/admin_page.html"; // Ruta hacia la página de administrador
      adminLink.innerText = "Admin Page";
      adminPageOption.appendChild(adminLink);
      menuList.appendChild(adminPageOption);
    }

    // Crear opción de Logout
    const logoutOption = document.createElement("li");
    const logoutLink = document.createElement("a");
    logoutLink.href = "#";
    logoutLink.innerText = "Logout";
    logoutLink.addEventListener("click", () => {
      // Eliminar el usuario del localStorage y redirigir al index
      localStorage.removeItem("currentUser");
      window.location.href = "../index.html";
    });
    logoutOption.appendChild(logoutLink);
    menuList.appendChild(logoutOption);

    // Añadir las opciones al menú desplegable
    dropdownMenu.appendChild(menuList);
    loginName.parentElement.appendChild(dropdownMenu);

    // Alternar la visibilidad del menú desplegable al hacer clic en el nombre
    loginName.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdownMenu.style.display =
        dropdownMenu.style.display === "none" ? "block" : "none";
    });

    // Cerrar el menú si se hace clic fuera de él
    document.addEventListener("click", () => {
      dropdownMenu.style.display = "none";
    });
  } else {
    // Mostrar el icono de usuario si no hay usuario logueado
    loginName.style.display = "none";
    userCont.style.display = "flex";
  }
});
