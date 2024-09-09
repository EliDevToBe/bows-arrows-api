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