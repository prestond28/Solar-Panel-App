import { storageHasData, getStorage } from "./simple-storage";
import { logout } from "./auth.service";

(() => {
  if (storageHasData() && !getStorage('isAuth')) {
    logout();
    window.location.href = '/login.html';
  }
})();
