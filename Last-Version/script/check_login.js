$(document).ready(() => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const loginName = document.getElementById("username");
  const userLink = document.getElementById("user-link");
  
  if (currentUser) {
    if (currentUser.is_first_login) {
      window.location.href = "../html/change_password.html";
    }

    const userProfileLink = document.createElement('a');
    userProfileLink.href = "./html/admin_page.html"; 
    userProfileLink.innerText = currentUser.name;  
    userProfileLink.classList.add("link_user");

    loginName.innerHTML = '';  
    loginName.appendChild(userProfileLink);  

    userLink.style.display = 'none';
  } else {
    loginName.innerText = '';  
    userLink.style.display = 'block'; 
  }
});
