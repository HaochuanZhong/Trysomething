function toggleFormVisibility() {
  document.querySelector('#form--container').classList.toggle('active')
}

function clearFormInputs() {
  document.querySelector('#firstname').value = ''
  document.querySelector('#lastname').value = ''
  document.querySelector('#phonenumber').value = ''
  document.querySelector('#index').value = ''
}

function formIsValid() {
  var nameCheck = /^[a-zA-Z]*$/
  var numberCheck = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
  if(nameCheck.test(document.querySelector('#firstname').value) && nameCheck.test(document.querySelector('#lastname').value) && numberCheck.test(document.querySelector('#phonenumber').value)){
    return true
  }
}

function getAllContacts() {
  if (JSON.parse(localStorage.getItem('contacts'))) {
    return JSON.parse(localStorage.getItem('contacts'))
  }
  else {
    return []
  }
}

function addContact() {
  if (!formIsValid()) {
      alert('nope')
      return
  }

  if (index = document.querySelector('#index').value) {
      editContact(index)
      return
  }

  var contacts = getAllContacts()
  contacts.push({
      firstName: document.querySelector('#firstname').value,
      lastName: document.querySelector('#lastname').value,
      phoneNumber: document.querySelector('#phonenumber').value
  })

  updateContacts(contacts)

  toggleFormVisibility()
  clearFormInputs()
}


function updateContacts(contacts) {
  localStorage.setItem('contacts', JSON.stringify(contacts))

  displayContacts()
}

function displayContacts() {
  var contactList = document.querySelector('#contacts--result')
  contactList.innerHTML = ''
  
  getAllContacts().forEach( (contact, index) => {
      var contactContainer = document.createElement('div')
      contactContainer.classList.add('contact--item')

      var name = document.createElement('h3')
      name.textContent = `${contact.firstName} ${contact.lastName}`
      contactContainer.appendChild(name)

      var phoneNumber = document.createElement('p')
      phoneNumber.textContent = contact.phoneNumber
      contactContainer.appendChild(phoneNumber)

      var editButton = document.createElement('button')
      editButton.textContent = 'Edit'
      editButton.classList.add('edit-button')
      editButton.dataset.id = index
      editButton.addEventListener('click', showEditForm)
      contactContainer.appendChild(editButton)

      var deleteButton = document.createElement('button')
      deleteButton.textContent = 'Delete'
      deleteButton.classList.add('delete-button')
      deleteButton.dataset.id = index
      deleteButton.addEventListener('click', deleteContact)
      contactContainer.appendChild(deleteButton)

      contactList.appendChild(contactContainer)
  })
}


function deleteContact() {
  var contacts = getAllContacts()
  contacts.splice(this.dataset.id, 1)

  updateContacts(contacts)
}

function showEditForm() {
  console.log('show')
  document.querySelector('#index').value = this.dataset.id

  var contact = getAllContacts()[this.dataset.id]

  document.querySelector('#add_new--button').textContent = 'Edit contact'

  document.querySelector('#firstname').value = contact.firstName
  document.querySelector('#lastname').value = contact.lastName
  document.querySelector('#phonenumber').value = contact.phoneNumber

  if (!document.querySelector('#form--container').classList.contains('active')) {
      toggleFormVisibility()
  }
}

function editContact(index) {
  console.log('show')
  var contacts = getAllContacts()
  contacts[index] = {
      firstName: document.querySelector('#firstname').value,
      lastName: document.querySelector('#lastname').value,
      phoneNumber: document.querySelector('#phonenumber').value
  }

  updateContacts(contacts)

  toggleFormVisibility()
  clearFormInputs()

  document.querySelector('#add_new--button').textContent = 'Add new contact'
}

document.querySelector('#form_toggle').addEventListener('click', toggleFormVisibility)
document.querySelector('#add_new--button').addEventListener('click', addContact)
document.addEventListener('DOMContentLoaded', displayContacts)