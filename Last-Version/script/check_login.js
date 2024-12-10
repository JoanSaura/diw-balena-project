$(document).ready(() => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const loginName = document.getElementById("username");
  
  if (!currentUser) {
    window.location.href = "../html/login.html";
  } else {
    if (currentUser.is_first_login) {
      window.location.href = "../html/change_password.html";
    }
    loginName.innerText = currentUser.name;  
  }
});
