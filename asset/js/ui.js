const contacts = document.querySelector('.contacts')

document.addEventListener('DOMContentLoaded', function() {
    var sideNav = document.querySelectorAll('.sidenav');
    var modal = document.querySelectorAll('.modal');
    var FloatActionButton = document.querySelectorAll('.fixed-action-btn');
    M.Sidenav.init(sideNav);
    M.Modal.init(modal);
    M.FloatingActionButton.init(FloatActionButton);
});

const renderContacts = (data, id) => {
    const html = `<li class="collection-item contact-item avatar" data-id="${id}">
    <i class="material-icons circle">folder</i>
    Nama: <span class="name">${data.name}</span>
    <p>
        Nomor: <span class="number">${data.number}</span>
    </p>
    <div class="secondary-content" data-id="${id}" style="text-align: right">
        <i class="material-icons modal-trigger" style="cursor: pointer;" href="#editModal">edit</i>
        <i class="material-icons fav" style="cursor: pointer;">${data.favorite ? 'star' : 'star_border'}</i>
        <i class="material-icons red-text" style="cursor: pointer;">delete_outline</i>
    </div>
</li>`
    contacts.innerHTML += html
} 

const removeContact = (id) => {
    const contact = document.querySelector(`.contact-item[data-id=${id}]`)
    contact.remove()
}

const updateContact = (data, id) => {
    const contact = document.querySelector(`.contact-item[data-id=${id}]`)
    contact.querySelector('.name').innerHTML = data.name
    contact.querySelector('.number').innerHTML = data.number
    contact.querySelector('.fav').textContent = data.favorite ? 'star' : 'star_border'
}