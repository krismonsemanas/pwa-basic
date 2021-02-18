const contactForm = document.querySelector('.add-contact form')
const modalContactForm = document.querySelector('#addContact')

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

db.collection('contacts').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        if(change.type === 'added') {
            renderContacts(change.doc.data(), change.doc.id)
        }
        if(change.type === 'removed') {
            console.log(`${change.doc.id} is removed`)
        }
    })
})