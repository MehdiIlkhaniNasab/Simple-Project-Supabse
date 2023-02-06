import supabaseConfig from "../../confing/supabaseConfig.js";
const btnGroups = document.querySelector('.btn-groups')
const updateInfoBtn = document.querySelector('.edit-user-form .accept-btn')
let userId = null;
// Fetch Get All User
async function getAllUser() {

    const { data, error } = await supabaseConfig
        .from('users')
        .select()

    if (error) return error
    if (data) return data

}
async function deleteUserFetch(userId) {

    const { error } = await supabaseConfig
        .from('users')
        .delete()
        .eq('id', userId)

    if (error) {
        return false
    } else {
        return true
    }

}

async function showAllUsers() {
    const allUser = await getAllUser()
    const usersContainer = document.querySelector('.users-container')
    const usersWrapper = document.createElement('div')
    const fragmentUser = document.createDocumentFragment()
    usersWrapper.setAttribute('id', 'wrap-users')
    usersContainer.innerHTML = ''
    allUser.forEach(user => {
        usersWrapper.insertAdjacentHTML('beforeend', `
            <div class="user">
                <div class="user-profile-wrap">
                    <img class="user-profile" src="assest/images/noimg.png" alt="default-image">
                    <div class="user-profile-description">
                        <h1 class="user-profile-name">${user.firstname} ${user.lastname}<span class="user-age">${user.age}</span> </h1>
                        <h3 class="user-explanations">${user.password}</h3>
                    </div>
                </div>
                <div class="btn-groups-column">
                    <button class="delete-user-btn" id="delete-btn" data-id="${user.id}">delete</button>
                    <button class="edit-user-btn" id="edit-btn" data-id="${user.id}">edit</button>
                </div>
        </div>
        `)

        fragmentUser.append(usersWrapper)

    })
    usersContainer.append(fragmentUser)
    const btnGroupsModal = document.querySelectorAll('.btn-groups-column')
    btnGroupsModal.forEach(btnGroup => {
        btnGroup.addEventListener('click', deleteEditFunc)
    })
}

async function getInfoSingleUser(userId) {
    const { data, error } = await supabaseConfig
        .from('users')
        .select()
        .eq('id', userId)

    if (error) return false
    if (data.length > 0) {
        return data
    } else {
        return false
    }
}

async function updateNewInfo(newInfo, userId) {
    const { error } = await supabaseConfig
        .from('users')
        .update(newInfo)
        .eq('id', userId)

    if (error) {
        return false
    } else {
        return true
    }
}


function deleteEditFunc(event) {
    const targetBtn = event.target
    userId = event.target.dataset.id
    if (targetBtn.id == 'delete-btn') {
        visiblaModal('delete-modal')
    } else if (targetBtn.id == 'edit-btn') {
        visiblaModal('edit-modal')
    }
}

function visiblaModal(idModal) {
    const modal = document.querySelector(`#${idModal}`)
    modal.classList.add('visible')

    if (idModal == 'edit-modal') {
        showOldInfo(userId)
    }
}

async function showOldInfo(userId) {
    const targetUser = await getInfoSingleUser(userId)
    const firstname = document.querySelector('.firstname')
    const lastname = document.querySelector('.lastname')
    const age = document.querySelector('.age')
    const password = document.querySelector('.password')

    firstname.value = targetUser[0].firstname
    lastname.value = targetUser[0].lastname
    age.value = targetUser[0].age
    password.value = targetUser[0].password

}

function unvisibleModal(idModal) {
    const modal = document.querySelector(`#${idModal}`)
    modal.classList.remove('visible')
}

function acceptRejectDel(event) {
    const targetBtn = event.target
    if (targetBtn.classList.contains('accept-btn')) {
        deleteUser(userId)
    } else if (targetBtn.classList.contains('unaccept-btn')) {
        unvisibleModal('delete-modal')
    }
}

async function deleteUser(userId) {
    const resultFetch = await deleteUserFetch(userId)

    if (resultFetch) {
        showAllUsers()
        unvisibleModal('delete-modal')
    }
}

async function loadPage() {
    const allUser = await getAllUser()

    showAllUsers(allUser)
}

function getNewInfoEdit() {
    const firstname = document.querySelector('.firstname')
    const lastname = document.querySelector('.lastname')
    const age = document.querySelector('.age')
    const password = document.querySelector('.password')
    const firstnameValue = firstname.value
    const lastnameValue = lastname.value
    const ageValue = age.value
    const passwordValue = password.value

    const formEdit = document.querySelector('.edit-user-form:invalid')

    if (formEdit) {
        return false
    } else {
        let infoNewUser = {
            firstname: firstnameValue,
            lastname: lastnameValue,
            password: passwordValue,
            age: ageValue
        }

        return infoNewUser
    }

}

async function updateUserInfo(event) {
    event.preventDefault()
    const formEdit = document.querySelector('.edit-user-form:invalid')
    const formEditReset = document.querySelector('.edit-user-form')
    const newInfoUser = getNewInfoEdit()
    if (newInfoUser) {
        const resultUpdateFetch = await updateNewInfo(newInfoUser, userId)
        console.log(resultUpdateFetch);
        if (resultUpdateFetch) {
            alert('Successfuly, Your Regsaiter Is Done')
            resetForm(formEditReset)
            unvisibleModal('edit-modal')
            showAllUsers()
        } else {
            alert('Please Fill All Inputs')
        }
    } else {
        alert('Please Fill All Inputs')
    }
}


function resetForm(form) {
    form.reset()
}

window.addEventListener('load', loadPage)
btnGroups.addEventListener('click', acceptRejectDel)
updateInfoBtn.addEventListener('click', updateUserInfo)