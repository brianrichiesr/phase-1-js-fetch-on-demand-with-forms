const init = () => {
    const inputForm = document.querySelector("form");
    const title = document.querySelector("#movieDetails h4");
    const summary = document.querySelector("#movieDetails p");

    inputForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const input = document.querySelector("#searchByID");
        fetch(`http://localhost:3000/movies/${input.value}`)
        .then(response => {
            if (response.ok) {
                console.log("status", response.status)
                return response.json();
            } else if (response.status === "404") {
                throw ("That is not a valid id for a movie");
            } else {
                title.textContent = response.statusText;
                summary.textContent = "";
                throw (response.statusText);
            }
        })
        .then(data => {
            title.textContent = data.title;
            summary.textContent = data.summary;
            input.value = "";
        })
        .catch(err => console.log(err))
    })
}

document.addEventListener('DOMContentLoaded', init);