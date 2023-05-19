import { generateUUID, validateForm } from './common/utils.js'
export const showDialog = (callback) => {
  const dialog = document.getElementById("dialog").cloneNode(true);
  dialog.style.display = "block";
  document.body.appendChild(dialog);
  const confirmButton = dialog.querySelector("#confirm");
  confirmButton.addEventListener("click", () => {
    const title = dialog.querySelector("#title").value;
    const description = dialog.querySelector("#description").value;
    if (validateForm(title, description)) {
      callback({ title, description }, generateUUID());
      document.body.removeChild(dialog);
    }
  });
};