$(document).ready(function () {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log(currentUser);
  const formHtml = `
    <h2>Formulari de Creació d'Usuari</h2>
    <form id="user-form">
      <label for="name">Nom:</label>
      <input type="text" id="name" placeholder="Nom de l'usuari" required />
      <label for="email">Correu electrònic:</label>
      <input type="email" id="email" placeholder="Correu electrònic" required />
      <label for="password">Contrasenya:</label>
      <input type="password" id="password" placeholder="Contrasenya" required />
      <label for="permissions">Permisos:</label>
      <div>
        <input type="checkbox" id="create-records" />
        <label for="create-records">Crear fitxes</label>
      </div>
      <div>
        <input type="checkbox" id="create-news" />
        <label for="create-news">Crear notícies</label>
      </div>
      <div>
        <input type="checkbox" id="create-bone-files" />
        <label for="create-bone-files">Crear fitxes d'os</label>
      </div>
      <!-- Campo de admin -->
      <div>
        <input type="checkbox" id="is-admin" />
        <label for="is-admin">Usuari Administrador</label>
      </div>
      <button type="submit" id="submit-user">Crear Usuari</button>
    </form>
    <p id="error-message" style="color: red; display: none;"></p>
    <p id="success-message" style="color: green; display: none;"></p>
  `;
  
  $('#main-content').html(formHtml);

  $('#user-form').on('submit', function (e) {
    e.preventDefault();

    const name = $('#name').val();
    const email = $('#email').val();
    const password = $('#password').val();
    const createRecords = $('#create-records').is(':checked');
    const createNews = $('#create-news').is(':checked');
    const createBoneFiles = $('#create-bone-files').is(':checked');
    const isAdmin = $('#is-admin').is(':checked');  // Obtener si el usuario es administrador

    let errorMessage = '';
    if (!name) {
      errorMessage = 'El nom no pot estar buit.';
    } else if (!email) {
      errorMessage = 'El correu electrònic no pot estar buit.';
    } else if (!password) {
      errorMessage = 'La contrasenya no pot estar buida.';
    }

    if (errorMessage) {
      $('#error-message').text(errorMessage).show();
      return;
    }

    // Crear el objeto para el nuevo usuario, incluyendo la propiedad is_admin
    const newUser = {
      id: Date.now(),
      name: name,
      email: email,
      password: password,
      edit_users: createRecords,
      edit_news: createNews,
      edit_bone_files: createBoneFiles,
      is_admin: isAdmin, // Asignar is_admin según el checkbox
      active: true,
      is_first_login: true
    };

    // Guardar el nuevo usuario en el localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    storedUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(storedUsers));

    // Mostrar mensaje de éxito y ocultar el mensaje de error
    $('#success-message').text('Usuari creat correctament!').show();
    $('#error-message').hide();

    // Resetear el formulario
    $('#user-form')[0].reset();
  });
});
