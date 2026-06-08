function setSubdomainLoginState(isLoggedIn) {
  const guestMenus = document.querySelectorAll(".subUserNav-guest");
  const memberMenus = document.querySelectorAll(".subUserNav-member");

  guestMenus.forEach((menu) => {
    menu.style.display = isLoggedIn ? "none" : "";
  });

  memberMenus.forEach((menu) => {
    menu.style.display = isLoggedIn ? "" : "none";
  });
}