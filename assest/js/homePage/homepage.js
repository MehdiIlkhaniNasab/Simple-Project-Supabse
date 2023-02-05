import supabaseConfig from "../../confing/supabaseConfig.js";
const btnGroups = document.querySelector('.btn-groups')
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
        .eq('id',userId)

    if (error) {
        return false
    }else{
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
}

function unvisibleModal(idModal){
    const modal = document.querySelector(`#${idModal}`)
    modal.classList.remove('visible')
}

function acceptRejectDel(event){
    const targetBtn = event.target
    if(targetBtn.classList.contains('accept-btn') ){
        deleteUser(userId)
    }else if(targetBtn.classList.contains('unaccept-btn')){
        unvisibleModal('delete-modal')
    }
}

async function deleteUser(userId){
    const resultFetch= await  deleteUserFetch(userId)

    if(resultFetch){
        showAllUsers()
        unvisibleModal('delete-modal')
    }
}

async function loadPage() {
    const allUser = await getAllUser()

    showAllUsers(allUser)
}


window.addEventListener('load', loadPage)
btnGroups.addEventListener('click', acceptRejectDel)