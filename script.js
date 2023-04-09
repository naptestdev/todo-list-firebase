import { db } from "./firebase.js";
import {
  addDoc,
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";

const displayData = (data) => {
  document.querySelector(".todos").innerHTML = "";
  let output = "";
  for (const item of data) {
    output += /*html*/ `
        <div class="todo${item.checked ? " checked" : ""}">
          <div>
            <input data-id="${item.id}" type="checkbox" ${
      item.checked ? "checked" : ""
    } />
            <span>${item.content}</span>
          </div>
          <button class="btn remove-btn" data-id="${item.id}">x</button>
        </div>
      `;
  }
  document.querySelector(".todos").innerHTML = output;
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", () =>
      removeTodo(btn.getAttribute("data-id"))
    );
  });
  document.querySelectorAll("input[type=checkbox]").forEach((input) => {
    input.addEventListener("change", () => {
      toggleChecked(input.getAttribute("data-id"), input.checked);
    });
  });
};

const removeTodo = (id) => {
  deleteDoc(doc(db, "todos", id));
};
const toggleChecked = (id, newValue) => {
  updateDoc(doc(db, "todos", id), {
    checked: newValue,
  });
};

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const inputValue = document.querySelector("input[type=text]").value.trim();

  if (inputValue.trim()) {
    document.querySelector("input[type=text]").value = "";

    await addDoc(collection(db, "todos"), {
      content: inputValue,
      checked: false,
    });
  }
});

onSnapshot(collection(db, "todos"), (querySnapshot) => {
  const todos = [];
  querySnapshot.forEach((doc) => {
    todos.push({ ...doc.data(), id: doc.id });
  });
  displayData(todos);
});
