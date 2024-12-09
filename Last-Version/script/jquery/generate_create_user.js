$(document).ready(function () {
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

      const newUser = {
          id: Date.now(),
          name: name,
          email: email,
          password: password,
          edit_users: createRecords,
          edit_news: createNews,
          edit_bone_files: createBoneFiles,
          active: true,
          is_first_login: true
      };

      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      storedUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(storedUsers));

      $('#success-message').text('Usuari creat correctament!').show();
      $('#error-message').hide();

      $('#user-form')[0].reset();
  });
});
