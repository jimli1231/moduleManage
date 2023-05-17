import { generateUUID } from './common/utils.js'

export const showDialog = (callback) => {
  const dialog = document.getElementById("dialog").cloneNode(true);
  dialog.style.display = "block";
  document.body.appendChild(dialog);
  const confirmButton = dialog.querySelector("#confirm");
  confirmButton.addEventListener("click", () => {
    const title = parseFloat(dialog.querySelector("#title").value);
    const description = dialog.querySelector("#description").value;
    callback({title,description}, generateUUID());
    document.body.removeChild(dialog);
  });
};