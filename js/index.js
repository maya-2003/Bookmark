var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteURL");
var tBody = document.getElementById("tBody");
var addBtn = document.getElementById("submitBtn");
var sitesArr = [];
if (localStorage.getItem("sitesArr") != null) {
    sitesArr = JSON.parse(localStorage.getItem("sitesArr"));
    displaySites();
}

function validateURL(url) {
    try {
        new URL(url);
        return true;
    } catch (err) {
        return false;
    }
}
function addSite() {
    var isValid = validateURL(siteUrl.value);
    if (isValid && siteName.value.trim() !== '' && siteUrl.value.trim() !== '' && siteName.value.length >= 3) {
        var site = {
            name: siteName.value,
            url: siteUrl.value,
        };
        sitesArr.push(site);
        localStorage.setItem("sitesArr", JSON.stringify(sitesArr));
    }
    else {
        const modalDiaglog = document.getElementById('rulesModal');
        const rulesModal = bootstrap.Modal.getOrCreateInstance(modalDiaglog);
        rulesModal.show();

    }
    displaySites();
    clearForm();
}


function displaySites() {
    var box = "";
    for (var i = 0; i < sitesArr.length; i++) {
        box += ` <tr>
                        <td>${i + 1}</td>
                        <td>${sitesArr[i].name}</td>
                        <td>
                            <button onclick="window.location.href='${sitesArr[i].url}';" class="btn btn-visit" data-index="0">
                              <i class="fa-solid fa-eye pe-2"></i>Visit
                            </button>
                        </td>
                        <td>
                            <button onclick="deleteSite(${i})" class="btn btn-delete pe-2" data-index="0">
                              <i class="fa-solid fa-trash-can"></i>
                              Delete
                            </button>
                        </td>
                    </tr>`
    }
    tBody.innerHTML = box;
}

function clearForm() {
    siteName.value = "";
    siteUrl.value = "";
}

function deleteSite(siteIndex) {
    sitesArr.splice(siteIndex, 1);
    localStorage.setItem("sitesArr", JSON.stringify(sitesArr));
    displaySites();

}

function validateInputName() {
    const inputName = document.getElementById("siteName");
    if (inputName.value.length < 3) {
        inputName.classList.add("is-invalid");
        inputName.classList.remove("is-valid");
    } else {
        inputName.classList.add("is-valid");
        inputName.classList.remove("is-invalid");
    }
}

function validateInputURL() {
    const inputURL = document.getElementById("siteURL");

    if (validateURL(inputURL.value)) {
        inputURL.classList.add("is-valid");
        inputURL.classList.remove("is-invalid");
    } else {
        inputURL.classList.add("is-invalid");
        inputURL.classList.remove("is-valid");
    }
}
