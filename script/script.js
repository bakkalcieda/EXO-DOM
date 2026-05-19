/*Créer un nouveau projet Web :

un fichier html
un fichier js
un fichier de style (css, sass, scss, ...)
Créer un gestionnaire de contacts. Permettre à un utilisateur d'encoder le nom, le prénom, l'email et le numéro de téléphone.

Pour chaque ajout, on ajoute une DIV à la page présentant au format carte les infos du contact.
pas de tableau 
Attention le contact ne doit être ajoutée qu'une fois */
const contacts = {};
const form         = document.getElementById("contactForm");
const inputNom     = document.getElementById("nom");
const inputPrenom  = document.getElementById("prenom");
const inputEmail   = document.getElementById("email");
const inputTel     = document.getElementById("telephone");
const errorMessage = document.getElementById("errorMessage");
const contactsGrid = document.getElementById("contactsGrid");
const emptyMessage = document.getElementById("emptyMessage");
const contactCount = document.getElementById("contactCount");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    hideError();
const nom       = capitalizeFirst(inputNom.value.trim());
const prenom    = capitalizeFirst(inputPrenom.value.trim());
const email     = inputEmail.value.trim().toLowerCase();
const telephone = inputTel.value.trim();
    if (!nom || !prenom || !email || !telephone) {
        showError("!!Veuillez remplir tous les champs!!");
        return;
    }
    if (!isValidEmail(email)) {
        showError("!! L'adresse email n'est pas valide !!");
        inputEmail.classList.add("input-error");
        return;
    }