$(document).ready(() => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const loginName = document.getElementById("username");
  const userLink = document.getElementById("user-link");
  
    if (currentUser.is_first_login) {
      window.location.href = "../html/change_password.html";
    }
    loginName.innerText = currentUser.name;  
    userLink.style.display= 'none';
});
