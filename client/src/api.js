import axios from "axios";
const URL ="http://localhost:8080/"

async function createUser(name, email, password, balance) {
  var res = await axios.get(
    URL + `create/` + name + "/" + email + "/" + password + "/" + balance
  );
  return res;
}

async function updateBalance(email, newBalance) {
  var res = await axios.get(URL + `update/` + email + "/" + newBalance);
  return res;
}

async function login(email, password) {
  let res = await axios.get(URL + `login/` + email + "/" + password);
  return res;
}

async function deleteAccount(email, password) {
  let res = await axios.get(URL + `delete/` + email + "/" + password);
  return res;
}

async function getGoogleUser(googleAccessToken) {
  let res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: {
      Authorization: `Bearer ${googleAccessToken}`,
    },
  });
  return res;
}
export { createUser ,updateBalance,login,getGoogleUser,deleteAccount};
