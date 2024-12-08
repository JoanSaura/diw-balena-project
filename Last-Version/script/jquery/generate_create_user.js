$(document).ready(function () {
    // Generar el formulario de creación de usuario dinámicamente
    const formHtml = `
      <h2>Formulari de Creació d'Usuari</h2>
      <form id="user-form">
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
  
        <button type="submit" id="submit-user">Crear Usuari</button>
      </form>
    `;
    
    // Insertar el formulario en el contenedor
    $('#main-content').html(formHtml);
  
    // Función para guardar el nuevo usuario
    const saveUser = (user) => {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
    };
  
    // Función para manejar el envío del formulario
    const handleUserFormSubmit = (e) => {
      e.preventDefault();
  
      const email = $('#email').val().trim();
      const password = $('#password').val().trim();
      const createRecords = $('#create-records').prop('checked');
      const createNews = $('#create-news').prop('checked');
  
      if (!email || !password) {
        alert('Per favor, completa tots els camps.');
        return;
      }
  
      // Cifrar la contrasenya
      const hashedPassword = CryptoJS.SHA256(password).toString();
  
      const newUser = {
        email,
        password: hashedPassword,
        permissions: {
          createRecords,
          createNews,
        },
      };
  
      saveUser(newUser);
  
      alert('Usuari creat amb èxit');
      $('#user-form')[0].reset(); 
    };
  
    $('#user-form').on('submit', handleUserFormSubmit);
  });
  