// script.js
const addFriendForm = document.getElementById("addFriendForm");
const addBillForm = document.getElementById("addBillForm");
const calculateSplitBtn = document.getElementById("calculateSplit");
const resultDiv = document.getElementById("result");

// Add friend
addFriendForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(addFriendForm);
  const friendName = formData.get("friendName");

  fetch("/friends", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: friendName }),
  })
    .then((response) => {
      if (response.ok) {
        alert("Friend added successfully.");
        addFriendForm.reset();
      } else {
        alert("Failed to add friend.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// Add bill
addBillForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(addBillForm);
  const payer = formData.get("payer");
  const amount = parseFloat(formData.get("amount"));
  const description = formData.get("description");

  fetch("/bills", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ payer, amount, description }),
  })
    .then((response) => {
      if (response.ok) {
        alert("Bill added successfully.");
        addBillForm.reset();
      } else {
        alert("Failed to add bill.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// Calculate split
calculateSplitBtn.addEventListener("click", () => {
  fetch("/split")
    .then((response) => response.json())
    .then((data) => {
      resultDiv.innerHTML = `
            <p>Total amount: $${data.totalAmount.toFixed(2)}</p>
            <p>Split amount per friend: $${data.splitAmount.toFixed(2)}</p>
        `;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
