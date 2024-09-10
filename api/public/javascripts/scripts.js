const btnRedeem = document.querySelector("#btnRedeem");
const tokenForm = document.querySelector("#tokenForm");

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
    sendData();
    // e.preventDefault();
})

async function sendData() {

    const formData = new FormData(tokenForm);



    // for (const [key, value] of formData) {
    //     console.log(`${key}: ${value}\n`);
    // }
    // console.log(formData.get("username"))

    try {
        const response = await fetch("/newuser",
            // object to POST
            {
                method: "POST",
                body: formData
            }
        );
        console.log(response.statusText)

    } catch (error) {
        console.log(error)
    }
}