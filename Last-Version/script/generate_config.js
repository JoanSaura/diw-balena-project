$(document).ready(function () {
    const loadUsers = () => {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      return users;
    };
  
    const saveUsers = (users) => {
      localStorage.setItem("users", JSON.stringify(users));
    };
  
    const renderUserList = () => {
      const users = loadUsers();
      
      $("#main-content").html("");
  
      if (users.length === 0) {
        $("#main-content").append("<p>No hi ha usuaris disponibles.</p>");
        return;
      }
  
      const table = $("<table>").addClass("user-table");
      const tableHeader = $("<tr>")
        .append("<th>ID</th>")
        .append("<th>Nom</th>")
        .append("<th>Correu Electrònic</th>")
        .append("<th>Permisos</th>")
        .append("<th>Accions</th>");
      
      table.append(tableHeader);
  
      users.forEach((user, index) => {
        const userRow = $("<tr>")
          .append(`<td>${user.id}</td>`)
          .append(`<td>${user.name}</td>`)
          .append(`<td>${user.email}</td>`)
          .append(`<td>${user.edit_users ? "Sí" : "No"}</td>`)
          .append(`
            <td>
              <button class="edit-user" data-id="${user.id}">Editar</button>
              <button class="delete-user" data-id="${user.id}">Eliminar</button>
            </td>
          `);
        table.append(userRow);
      });
  
      $("#main-content").append(table);
  
      $(".edit-user").click(function () {
        const userId = $(this).data("id");
        const user = users.find((user) => user.id === userId);
        if (user) {
          showEditForm(user);
        }
      });
  
      $(".delete-user").click(function () {
        const userId = $(this).data("id");
        const updatedUsers = users.filter((user) => user.id !== userId);
        saveUsers(updatedUsers);
        renderUserList();
      });
    };
  
    const showEditForm = (user) => {
      $("#main-content").html(`
        <h2>Editar Usuari</h2>
        <form id="edit-user-form">
          <label for="user-name">Nom</label>
          <input type="text" id="user-name" value="${user.name}" required />
          <label for="user-email">Correu Electrònic</label>
          <input type="email" id="user-email" value="${user.email}" required />
          <label for="edit-users">Permisos d'Edició</label>
          <input type="checkbox" id="edit-users" ${user.edit_users ? "checked" : ""} />
          <button type="submit">Guardar Canvis</button>
        </form>
      `);
  
      $("#edit-user-form").submit(function (e) {
        e.preventDefault();
        const updatedUser = {
          ...user,
          name: $("#user-name").val(),
          email: $("#user-email").val(),
          edit_users: $("#edit-users").is(":checked"),
        };
  
        const users = loadUsers();
        const userIndex = users.findIndex((u) => u.id === user.id);
        if (userIndex !== -1) {
          users[userIndex] = updatedUser;
          saveUsers(users);
          renderUserList();
        }
      });
    };
  
    renderUserList();
  
    $("#main-content").append(`
      <h2>Afegeix un Usuari</h2>
      <form id="add-user-form">
        <label for="new-user-name">Nom</label>
        <input type="text" id="new-user-name" required />
        <label for="new-user-email">Correu Electrònic</label>
        <input type="email" id="new-user-email" required />
        <label for="new-edit-users">Permisos d'Edició</label>
        <input type="checkbox" id="new-edit-users" />
        <button type="submit">Afegir Usuari</button>
      </form>
    `);
  
    $("#add-user-form").submit(function (e) {
      e.preventDefault();
      const users = loadUsers();
      const newUser = {
        id: users.length + 1,
        name: $("#new-user-name").val(),
        email: $("#new-user-email").val(),
        edit_users: $("#new-edit-users").is(":checked"),
        active: true,
        is_first_login: true,
      };
  
      users.push(newUser);
      saveUsers(users);
      renderUserList();
    });
  });
  