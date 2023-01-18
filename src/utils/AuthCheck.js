import CryptoJS from "crypto-js";

const tokenSecret = import.meta.env.VITE_TOKEN_SECRET

const envSctructure = {
	production:'production',
	staging:'staging',
	development:'development',
	local:'local',
	prod:'production',
	stg:'staging',
	dev:'development',
	prd:'production',
	loc:'local'
}

export default {

  envTransform(env) {
    return envSctructure[env]
  },

  userToken() {
    let token = localStorage.getItem("user");
    if (token) {
      return 200;
    } else {
      return 401;
    }
  },

  getToken() {
    const userToken = localStorage.getItem("user");
    return {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
  },

  checkToken(code, callback) {
    if (code === 401) {
      localStorage.removeItem("user");
      localStorage.removeItem("roles");
      callback();
      return "Sesi login telah kadarluasa";
    } else {
      return "Ada yang salah";
    }
  },

  rolesCheck() {
    let roleEncrypt = localStorage.getItem("scope") || null;

    if (roleEncrypt) {
      let roleDecrypt = CryptoJS.AES.decrypt(roleEncrypt, tokenSecret).toString(
        CryptoJS.enc.Utf8
      );
      return roleDecrypt;
    }
    return roleEncrypt;
  },
};
