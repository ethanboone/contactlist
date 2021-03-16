let contacts = []

/**
 * Called when submitting the new Contact Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the contacts list.
 * Then reset the form
 * *** hints:
 * *** push: resources/push.jpg
 */
function addContact(event) {
    event.preventDefault(); //prevents the default event of the form, prevents reloading the page
    let form = event.target //accesses the form from the target property within the form submit event

    let contact = {
        id: generateId(),
        name: form.name.value,
        phone: form.phone.value,
        emergencyContact: form.emergencyContact.checked
    }
    //assigns the value within the form input as the variable name
    contacts.push(contact);
    console.log(contacts);
    form.reset(); //built in method to reset the input typed into the form
    saveContacts();
}

/**
 * Converts the contacts array to a JSON string then
 * Saves the string to localstorage at the key contacts 
 */
function saveContacts() {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
    drawContacts()
    // saves the object(s) within contacts as a string, then it saves to local storage
}

/**
 * Attempts to retrieve the contacts string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the contacts array to the retrieved array
 */
function loadContacts() {
    let contactData = JSON.parse(window.localStorage.getItem("contacts"));
    /** the value of "contacts" in local storage is converted back into
     * an object using the method JSON.parse and that object is assigned
     * to the variable contactData */

    if (contactData) {
        contacts = contactData;
    }
    /** called a null check, checks if what is pulled out of contact
     * data has any value, and if it does, the contactData is transfered 
     * to the contacts array
     */
}

/**
 * This function targets the contacts-list on the 
 * DOM and adds a new div element for each of the
 * contacts in the contacts array
 */
function drawContacts() {
    let contactListElement = document.getElementById("contact-list") //sets contact list element to the "contact-list" ID in the html file
    let template = "" //set template to empty



    contacts.forEach(contact => {
        template += `
        <div class="contact-card card mt-1 mb-1 ${contact.emergencyContact ? 'emergency-contact' : ''}">
        
        <h3 class="mt-1 mb-1">${contact.name}</h3>
            <div class="mt-1 mb-1">
                <p>
                    <i class="fa fa-fw fa-phone"></i>
                    <span>${contact.phone}</span>
                </p>
                <i class="action fa fa-trash text-danger" onclick="removeContact('${contact.id}')"></i>
            </div>
        </div>
        `
    }) /**for each object within the contacts array, evaluate if it is an emergency contact or not,
    Enter their name as an h3 header, enter the phone number under the paragraph tag,
    then create a button to remove the specific contact with the contact ID. Then we set the
    inner html to the contact list element to equal the contacts template */
    contactListElement.innerHTML = template
}

/**
 * This function is called with a contact id
 * and will use the id to find and remove the 
 * contact by their id from the list of contacts
 * *** hints: 
 * *** findIndex: resources/findIndex.jpg
 * *** splice: resources/splice.jpg
 * @param {string} contactId 
 */
function removeContact(contactId) {
    let index = contacts.findIndex(contact => contact.id == contactId)
    /**parameter is the string of the contactId. In the variable, we find the contact
     * where the contact.id is equal to the contactId that was passed in within the paramater.
     * then it sets that specific contact within the array to the keyword index.
    */
    if (index == -1) {
        throw new Error("Invalid Contact Id")
    } //if it's unable to find the right index, it will return the number -1 which isn't a valid index
    contacts.splice(index, 1)
    saveContacts()
    /** then the splice method removes 1 item within the contacts array, which would be the index 
     * with the matching contact ID. Then we save the updated contacts to local storage.
     */
}

/**
 * Toggles the visibility of the AddContact Form
 */
function toggleAddContactForm() {
    document.getElementById('new-contact-form').classList.toggle("hidden")
}


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
    return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}


loadContacts()
drawContacts()

