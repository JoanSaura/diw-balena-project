$(document).ready(function () {
  // Crear el formulario de edición dinámicamente
  const $form = $(`
    <form id="edit-user-form">
      <h2>Editar Usuari</h2>
      
      <label for="edit-password">Contrasenya:</label>
      <input type="password" id="edit-password" name="password" placeholder="Introdueix la nova contrasenya" />
      
      <label for="edit-permission">Permís:</label>
      
      <div>
        <input type="checkbox" id="edit-create-fiches" name="create_fiches" />
        <label for="edit-create-fiches">Creació de fitxes</label>
      </div>
      
      <div>
        <input type="checkbox" id="edit-create-news" name="create_news" />
        <label for="edit-create-news">Creació de notícies</label>
      </div>
      
      <button type="button" id="edit-user-btn">Editar</button>
    </form>
  `);

  // Agregar el formulario al contenedor principal
  $("#main-content").html($form);

  // Acción al presionar el botón de editar
  $("#edit-user-btn").on("click", function () {
    const password = $("#edit-password").val();
    const permission = $("#edit-permission").val();
    const createFiches = $("#edit-create-fiches").is(":checked");
    const createNews = $("#edit-create-news").is(":checked");

    // Validación simple
    if (!password) {
      alert("La contrasenya no pot estar buida.");
      return;
    }

    // Mostrar los datos en la consola (o enviar al servidor)
    console.log({
      password,
      permission,
      createFiches,
      createNews,
    });

    alert("Usuari editat correctament!");
  });
});
