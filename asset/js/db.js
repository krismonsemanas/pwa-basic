db.enablePersistence().catch(err => {
    if (err.code == 'failed-precondition') {
        console.log("Multiple tab opened")
    } else if (err.code == 'unimplemented') {
        console.log("browser not supported")
    }
})

const contactForm = document.querySelector('.add-contact form')
const modalContactForm = document.querySelector('#addContact')
const editContactForm = document.querySelector('.edit-contact form')
const editModalContactForm = document.querySelector('#editModal')
let updateId = null
// submit form
contactForm.addEventListener('submit', e => {
    e.preventDefault()
    const contact = {
        name: contactForm.name.value,
        number: contactForm.number.value,
        favorite: false,
    }
    db.collection('contacts').add(contact).then(() => {
        contactForm.reset()
        var instance = M.Modal.getInstance(modalContactForm)
        instance.close()
        contactForm.querySelector('.error').textContent = ''
    }).catch(err => {
        contactForm.querySelector('.error').textContent = err.message
    })
})
editContactForm.addEventListener('submit', e => {
    e.preventDefault()
    const contact = {
        name: editContactForm.name.value,
        number: editContactForm.number.value,
    }
    db.collection('contacts').doc(updateId).update(contact).then(() => {
        editContactForm.reset()
        var instance = M.Modal.getInstance(editModalContactForm)
        instance.close()
        editContactForm.querySelector('.error').textContent = ''
    }).catch(err => {
        editContactForm.querySelector('.error').textContent = err.message
    })
})

db.collection('contacts').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        if(change.type === 'added') {
            renderContacts(change.doc.data(), change.doc.id)
        }
        if(change.type === 'removed') {
            removeContact(change.doc.id)
        }
        if(change.type === 'modified') {
            updateContact(change.doc.data(), change.doc.id)
        }
    })
})

const contatcsContainer = document.querySelector('.contacts')
contatcsContainer.addEventListener('click', e => {
    if (e.target.textContent === 'delete_outline') {
        const id = e.target.parentElement.getAttribute('data-id')
        db.collection('contacts').doc(id).delete()
    }
    if (e.target.textContent === 'edit') {
        updateId = e.target.parentElement.getAttribute('data-id')
        let contact = document.querySelector(`.contact-item[data-id=${updateId}]`)
        let name = contact.querySelector('.name').innerHTML
        let number = contact.querySelector('.number').innerHTML
        editContactForm.name.value = name
        editContactForm.number.value = number
    }
    if (e.target.textContent === 'star_border') {
        const id = e.target.parentElement.getAttribute('data-id')
        contact = {favorite:true}
        db.collection('contacts').doc(id).update(contact)
    }
    if (e.target.textContent === 'star') {
        const id = e.target.parentElement.getAttribute('data-id')
        contact = {favorite:false}
        db.collection('contacts').doc(id).update(contact)
    }
})