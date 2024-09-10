const btnRedeem = document.querySelector("#btnRedeem");
const tokenForm = document.querySelector("#tokenForm");
const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const errUser = document.querySelector("#errUser");
const errMail = document.querySelector("#errMail");

const nameContainer = document.querySelector("#nameContainer");
const mailContainer = document.querySelector("#mailContainer");

const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*\.[a-z]{2,}$/i

// styling with some validation data
usernameInput.addEventListener("input", (e) => {
    const isNameValid = !usernameInput.value.match(/\W/);

    if (!isNameValid) {
        nameContainer.classList.add("not-valid");
    } else {
        nameContainer.classList.remove("not-valid");
    }
});

emailInput.addEventListener("input", (e) => {

    const isEmailValid = emailRegex.test(emailInput.value)

    if (!isEmailValid) {
        mailContainer.classList.add("not-valid");
    } else {
        mailContainer.classList.remove("not-valid");
    }
})


btnRedeem.addEventListener("click", (e) => {
    e.preventDefault();
    let isFormVisible = false;

    if (tokenForm.classList.contains("invisible")) {

        tokenForm.classList.remove("invisible");
        isFormVisible = true;

        setTimeout(() => {
            tokenForm.classList.remove('opacity-0', 'scale-95');
            tokenForm.classList.add('opacity-100', 'scale-100');


        }, 10);

    } else {
        tokenForm.classList.add('opacity-0', 'scale-95');
        tokenForm.classList.remove('opacity-100', 'scale-100');

        isFormVisible = false;
        setTimeout(() => {
            tokenForm.classList.add("invisible");

        }, 300);

    }

    btnRedeem.innerText = !isFormVisible ? "Redeem API Key" : "Hide Form"
})

tokenForm.addEventListener("submit", (e) => {
    // Don't prevent and form is send
    // Manual send is not populating req.body correctly
    e.preventDefault();

    const isEmailValid = emailRegex.test(emailInput.value);
    const isNameValid = !usernameInput.value.match(/\W/);
    const passwordLength = passwordInput.value.length;

    if (isEmailValid && isNameValid && passwordLength >= 8) {

        sendFormData();

    } else {
        console.log("Not sending FORM")
        console.log("mail", isEmailValid)
        console.log("name", isNameValid)
        console.log("pass length", passwordLength)
    }

})

async function sendFormData() {

    const formData = new FormData(tokenForm);

    try {
        const response = await fetch("http://localhost:3000/newuser",
            // object to POST
            {
                method: "POST",
                body: formData,
            }
        );
        console.log(response.statusText)

    } catch (error) {
        console.log(error)
        return false
    }
}