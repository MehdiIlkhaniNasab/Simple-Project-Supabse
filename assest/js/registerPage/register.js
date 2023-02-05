import supabaseConfig from "../../confing/supabaseConfig.js";
const submitRegister = document.querySelector('.login-form button')
function getInfoNewUser() {

    const inputFirstname = document.querySelector('.firstname')
    const inputLastname = document.querySelector('.lastname')
    const inputPassword = document.querySelector('.password')
    const inputAge = document.querySelector('.age')
    const inputFirstnameValue = inputFirstname.value.trim()
    const inputLastnameValue = inputLastname.value.trim()
    const inputPasswordValue = inputPassword.value.trim()
    const inputAgeValue = inputAge.value.trim()

    const formRegsiter = document.querySelector('.login-form:invalid')
    if (!formRegsiter) {
        let infoNewUser = {
            firstname: inputFirstnameValue,
            lastname: inputLastnameValue,
            password: inputPasswordValue,
            age: inputAgeValue
        }

        return infoNewUser
    } else {
        return false
    }

}

async function submitNewUser(event) {
    event.preventDefault()
    const infoNewuser = getInfoNewUser()

    const formLogin = document.querySelector('.login-form')
    console.log(infoNewuser);
    if (infoNewuser) {
        const resultInsertNewUser = await insertNewUserDB(infoNewuser)
        console.log(resultInsertNewUser);
        if (resultInsertNewUser) {
            alert('Successfuly, Your Regsaiter Is Done')
            resetForm(formLogin)
        } else {
            alert('Please Fill All Inputs')
        }
    } else {
        alert('Please Fill All Inputs')
    }
}

async function insertNewUserDB(newUser) {
    const { error } = await supabaseConfig
        .from('users')
        .insert([newUser])
    if (error) {
        return false
    } else {
        return true
    }
}

function resetForm(form){
    form.reset()
}

submitRegister.addEventListener('click', submitNewUser)

