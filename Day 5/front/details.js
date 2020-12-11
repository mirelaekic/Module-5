let id;
const url = "https://striveschool-api.herokuapp.com/api/product/"

window.onload = async () => {
    let urlParams = new URLSearchParams(window.location.search);
    id = urlParams.get("id");

    try {
        let response = await fetch (url + id,{
            "headers": new Headers({
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFiZjkzZjRiY2RlMTAwMTc2MTZjNmEiLCJpYXQiOjE2MDUxMDU5ODMsImV4cCI6MTYwNjMxNTU4M30.yi9IvcVMeU13rCix70UkYjCjIS6O5DctYgYscMfm_Bw"})});
        let event = await response.json();  

        let element = document.querySelector(".row");
        element.innerHTML = `<div class="col-md-4 product">
                            <img src="${event.imageUrl}" class="card-img mb-5 mt-5 ml-2" alt="...">
                            </div>
                            <div class="col-md-8">
                            <div class="card-body mt-5 ml-4">
                            <h5 class="card-title">${event.name}</h5>
                            <p class="card-text">${event.description}</p>
                            <p class="card-text"><small class="text-muted">By ${event.brand}</small></p>
                            <button type="button" class="btn btn-sm btn-outline-secondary">Add to basket</button>
                            <button type="button" class="btn btn-sm btn-outline-danger" onclick="handleDelete()">Remove</button>
                            <button type="button" class="btn btn-sm btn-outline-warning" onclick="handleDelete()">Edit</button>
                            </div>
                        </div>`

        let card = document.querySelector(".card").appendChild(element);
        document.querySelector(".main").appendChild(card)
    } catch(error) {
        alert("something went wrong!");
    }
};

const handleDelete = async () => {
    try{
        const response = await fetch(url + id, {
            "method": "DELETE",
            "headers": new Headers({
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFiZjkzZjRiY2RlMTAwMTc2MTZjNmEiLCJpYXQiOjE2MDUxMDU5ODMsImV4cCI6MTYwNjMxNTU4M30.yi9IvcVMeU13rCix70UkYjCjIS6O5DctYgYscMfm_Bw"})
    });
        if (response.ok) {
            alert("Product deleted");
        } else {
            alert("something went wrong")
        }
    } catch (error) {
        console.log(error);
    }
};

