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
  });
  