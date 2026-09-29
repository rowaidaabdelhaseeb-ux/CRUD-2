// امسك العناصر
let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
let nameError = document.getElementById("nameError");
let emailError = document.getElementById("emailError");
let passwordError = document.getElementById("passwordError");
let login = document.querySelector(".login");
let title = document.getElementById("title");
let number = document.getElementById("number");
let category = document.getElementById("category");
let description = document.getElementById("description");
let addProduct = document.getElementById("addProduct");
let deleteProductBtn = document.getElementById("deleteProduct");

// Regex
let nameRegex = /^[a-zA-Z\u0600-\u06FF\s]+$/;
let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
// لما ندوس login
if (document.querySelector(".login")) {
  login.addEventListener("click", function () {
    let valid = true;
    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    if (!nameRegex.test(username.value)) {
      nameError.textContent = "please enter English and Arbic letters only";
      valid = false;
    }
    if (!emailRegex.test(email.value)) {
      emailError.textContent = "please enter a valid email";
      valid = false;
    }
    if (!passwordRegex.test(password.value)) {
      passwordError.textContent =
        "password must be at least 8 characters and contain a letter and a number";
      valid = false;
    }
    if (valid) {
      console.log("validation successful");
      window.location.href = "admin.html";
    }
  });
}
// الصفحه التانبه
fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((data) => {
    let products = document.querySelector(".products");

    data.products.forEach((product) => {
      products.innerHTML += `
                <div class="product">
                    <h3>${product.title}</h3>
                    <p>Price: $${product.price}</p>
                    <p>${product.category}</p>
                    <p>${product.description}</p>
                </div>
            `;
    });
  })
  .catch((error) => {
    console.log(error);
  });

addProduct
  .addEventListener("click", function () {
    let title = document.getElementById("title").value;
    let price = document.getElementById("number").value;
    let category = document.getElementById("category").value;
    let description = document.getElementById("description").value;

    console.log(title);
    console.log(price);
    console.log(category);
    console.log(description);
    fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        price: Number(price),
        category: category,
        description: description,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        let products = document.querySelector(".products");
        products.innerHTML += `
        <div class="product">
            <h3>${data.title}</h3>
            <p>Price: $${data.price}</p>
            <p>${data.category}</p>
            <p>${data.description}</p>
            <button onclick="deleteProduct(${data.id})">Delete</button>
        </div>
    `;
      });
  })
  .catch((error) => {
    console.log(error);
  });
function deleteProduct(id) {
  fetch(`https://dummyjson.com/products/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.querySelector(`#product-${id}`).remove();
    })
    .catch((error) => {
      console.log(error);
    });
}
