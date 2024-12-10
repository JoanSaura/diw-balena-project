$(document).ready(() => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const loginName = document.getElementById("username");
  
  if (!currentUser) {
    window.location.href = "../html/login.html";
  } else {
    loginName.innerText = currentUser.name;  
  }
});
