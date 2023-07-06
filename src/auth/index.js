//isLoggedIn=>

export const isLoggedIn = () => {
  let data = localStorage.getItem("data");
  if (data != null) return true;
  else return false;
};

//doLogin=> data=>set to localstorage

export const doLogin = (data, next) => {
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
  next();
};

//doLogout=> remove from localStorage

export const doLogout = (next) => {
  localStorage.removeItem("data");
  next();
};

//get currentUser
export const getCurrentUserDetail = () => {
  if (isLoggedIn()) {
    return JSON.parse(localStorage.getItem("data"))?.data?.user;
  } else {
    return undefined;
  }
};

export const getToken = () => {
  if (isLoggedIn()) {
    return JSON.parse(localStorage.getItem("data"))?.data?.token;
  } else {
    return null;
  }
};

export const getRole = () => {
  if (isLoggedIn) {
    let role = JSON.parse(localStorage.getItem("data"))?.data?.user?.roles[0]
      .id;
    return role;
  } else {
    return null;
  }
};
