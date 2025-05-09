const myLibrary = [];

function Book(title, author, pages, id, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.id = id;
  this.read = read || false; // Default to false if not provided
}

Book.prototype.toggleReadStatus = function () {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, crypto.randomUUID(), read));
}

let body = document.getElementsByTagName("body")[0];

function displayBooks() {
  const tbody = document.querySelector("#book-table tbody");
  tbody.innerHTML = ""; // Clear previous rows

  for (const book of myLibrary) {
    const row = document.createElement("tr");

    const title = document.createElement("td");
    title.textContent = book.title;

    const author = document.createElement("td");
    author.textContent = book.author;

    const pages = document.createElement("td");
    pages.textContent = book.pages;

    const id = document.createElement("td");
    id.textContent = book.id;

    const read = document.createElement("td");
    const readCheckbox = document.createElement("input");
    readCheckbox.type = "checkbox";
    readCheckbox.checked = book.read;
    readCheckbox.addEventListener("change", () => {
      book.toggleReadStatus();
    });
    read.appendChild(readCheckbox);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete Book";
    deleteBtn.className = "delete";

    const deleteBtnTd = document.createElement("td");
    deleteBtnTd.appendChild(deleteBtn);

    row.appendChild(title);
    row.appendChild(author);
    row.appendChild(pages);
    row.appendChild(id);
    row.appendChild(read);
    row.appendChild(deleteBtnTd);

    deleteBtn.addEventListener("click", () => {
      myLibrary.forEach((b, index) => {
        if (b.id === book.id) {
          myLibrary.splice(index, 1);
          displayBooks();
        }
      });
    });

    tbody.appendChild(row);
  }
}

let btn = document.querySelector(".new-book");
let dialog = document.querySelector("#book-dialog");
let form = document.querySelector("#book-form");
let addBookBtn = document.querySelector(".add-book");

btn.addEventListener("click", () => {
  dialog.showModal();
});

addBookBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const author = form.author.value;
  const pages = form.pages.value;
  const title = form.title.value;

  if (title && author && pages) {
    addBookToLibrary(title, author, pages);
    dialog.close();
    form.reset();
    displayBooks();
  }
});
