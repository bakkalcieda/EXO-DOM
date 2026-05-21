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
let compteur = 0;


form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const nom       = inputNom.value.trim();
    const prenom    = inputPrenom.value.trim();
    const email     = inputEmail.value.trim().toLowerCase();
    const telephone = inputTel.value.trim();
    
    if (!nom || !prenom || !email || !telephone) {
        errorMessage.textContent = "Veuillez remplir tous les champs!!";
        errorMessage.classList.remove("hidden");
        return;
    }
    
    const doublon = Object.values(contacts).some(
        (c) => c.email === email || c.telephone === telephone || c.nom === nom || c.prenom === prenom
        );
        
        if (doublon) {
            errorMessage.textContent = "Ce contact existe dejja!!";
            errorMessage.classList.remove("hidden");
            return;
        }
        // je peux utiliser aussi compteur avec date.now//
        //const id = Date.now(); //
        //calcule en miliseconde pour un id unique  //
        const id = compteur++;
        contacts[id] = { id, nom, prenom, email, telephone };
        
        const carte = document.createElement("div");
        carte.classList.add("carte");
        carte.setAttribute("data-id", id);
        carte.innerHTML = `
        <div class="avatar">${prenom[0]}${nom[0]}</div>
        <h3>${prenom} ${nom}</h3>
        <p>${email}</p>
        <p>${telephone}</p>
        <button onclick="supprimerContact(${id})">Supprimer</button>
        `;
        
        contactsGrid.appendChild(carte);
        emptyMessage.style.display = "none";
        contactCount.textContent = `(${Object.keys(contacts).length})`;
        
        errorMessage.textContent = "";
        errorMessage.classList.add("hidden");
        form.reset();
    });
    
    // suppresiion contact //
    
    function supprimerContact (id) {
        delete contacts [id];
        document.querySelector(`[data-id = "${id}"]`).remove();
        contactCount.textContent = `(${Object.keys(contacts).length})`;
        
        if (Object.keys(contacts).length === 0){
            emptyMessage.style.display = "block";
        }
    } 