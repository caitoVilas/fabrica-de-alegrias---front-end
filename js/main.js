const d = document;
let usuario, token;

d.addEventListener('DOMContentLoaded', e => {

    registroUsuario('.registro');
    loginUsuario('.login');
    cancelRegistro('.cancel-registro');
    cancelLogin('.cancel-login');
    registroUsuarios('.btn_registro');
    loginUsuarios('.btn-login')
});

function registroUsuario(registro){

    const $btnR = d.querySelector('.registro');
    const $btnl = d.querySelector('.login');

    d.addEventListener('click', e => {

        if(e.target.matches(registro)){
            d.getElementById('panel-registro').classList.toggle('is-active');
            $btnR.setAttribute('disabled','disabled');
            $btnl.setAttribute('disabled','disabled');
        }
    });

}

function loginUsuario(login){

    const $btnl = d.querySelector('.login');
    const $btnR = d.querySelector('.registro');

    d.addEventListener('click', e => {

        if(e.target.matches(login)){
            d.getElementById('panel-login').classList.toggle('is-active');
            $btnR.setAttribute('disabled','disabled');
            $btnl.setAttribute('disabled','disabled');
        }
    });

}

function cancelRegistro(cancel){

    const $btnCancelRegistro = d.querySelector('.cancel-registro');
    const $btnR = d.querySelector('.registro');
    const $btnl = d.querySelector('.login');

    d.addEventListener('click', e => {

        if(e.target.matches(cancel)){
            d.getElementById('panel-registro').classList.toggle('is-active');
            $btnR.removeAttribute('disabled');
            $btnl.removeAttribute('disabled');
        }
    });
}

function cancelLogin(cancel) {

const $btnCancelLogin = d.querySelector('.cancel-login');
    const $btnR = d.querySelector('.registro');
    const $btnl = d.querySelector('.login');

    d.addEventListener('click', e => {

        if(e.target.matches(cancel)){
            d.getElementById('panel-login').classList.toggle('is-active');
            $btnR.removeAttribute('disabled');
            $btnl.removeAttribute('disabled');
        }
    });
}

// ********   REGISTRO USUARIOS **********

function registroUsuarios(registro){

    

    // CAPTURA DE ELEMENTOS

    const $form = d.getElementById('form_registro');
    const $BtnS = d.querySelector('.btn_registro')
    const $btnR = d.querySelector('.registro');
    const $btnl = d.querySelector('.login');
    const $panel =d.getElementById('panel-registro');

    $BtnS.addEventListener('click', e => {

        e.preventDefault();
        e.stopPropagation();

            // Elementos
            const nombre = d.getElementById('name').value;
            const correo = d.getElementById('correo').value;
            const clave  = d.getElementById('clave').value;

            // Spans
            const $sNombre = d.getElementById('s_nombre');
            const $sCorreo = d.getElementById('s_email');
            const $spassword = d.getElementById('s_password');
            const $msje = d.getElementById('msje');

            let validNombre = false;
            let validCorreo = false;
            let validClave = false;

            // VALIDACIONES

            if(nombre === ''){
                $sNombre.textContent = 'El Nombre es Requerido';
                $sNombre.classList.remove('none');
                $sNombre.classList.remove('ok');
                $sNombre.classList.add('error');
            } else{
                $sNombre.textContent = 'Ok';
                $sNombre.classList.remove('none');
                $sNombre.classList.remove('error');
                $sNombre.classList.add('ok');
                validNombre = true;
            }

            if(correo === ''){
                $sCorreo.textContent = 'El correo es Requerido';
                $sCorreo.classList.remove('none');
                $sCorreo.classList.remove('ok');
                $sCorreo.classList.add('error');
            }else{
                const regex = /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/i
                .test(correo);
                if(!regex){
                    $sCorreo.textContent = 'El formato de email no es valido';
                    $sCorreo.classList.remove('none');
                    $sCorreo.classList.remove('ok');
                    $sCorreo.classList.add('error');
                }else{
                    $sCorreo.textContent = 'ok';
                    $sCorreo.classList.remove('none');
                    $sCorreo.classList.remove('error');
                    $sCorreo.classList.add('ok');
                    validCorreo = true;
                }
            }

            if(clave === ''){
                $spassword.textContent = 'El Password es Requerido'; 
                $spassword.classList.remove('none');
                $spassword.classList.remove('ok');
                $spassword.classList.add('error');
            }else{
                if(clave.length < 6 || clave.length > 20){
                    $spassword.textContent = 'El Password debe tener entre 6 y 20 caracteres'; 
                    $spassword.classList.remove('none');
                    $spassword.classList.remove('ok');
                    $spassword.classList.add('error');
                }else{
                    $spassword.textContent = 'ok'; 
                    $spassword.classList.remove('none');
                    $spassword.classList.remove('error');
                    $spassword.classList.add('ok');
                    validClave = true;
                }
            }

            if(validNombre && validCorreo && validClave){
                // RESETEAMOS MENSAJES
                $sNombre.textContent = '';
                $sNombre.classList.remove('ok');
                $sNombre.classList.remove('error');
                $sNombre.classList.add('none');
                $sCorreo.textContent = '';
                $sCorreo.classList.remove('ok');
                $sCorreo.classList.remove('error');
                $sCorreo.classList.add('none');
                $spassword.textContent = ''; 
                $spassword.classList.remove('ok');
                $spassword.classList.remove('error');
                $spassword.classList.add('none');

                //HACEMOS EL FETCH

                const req = {
                    "nombre" : nombre,
                    "nombreUsuario": nombre,
                    "email": correo,
                    "password": clave,
                    "role": ["user"] 
                };

                fetch("http://localhost:8080/auth/nuevo",{
                method: "POST",
                mode: 'cors',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(req)
                })
                .then(response => response.ok? response.json(): Promise.reject(response))
                .then(data =>{
                    setInterval(() =>{
                        $msje.textContent = '';
                        $msje.classList.add('none');
                        $msje.classList.remove('error');
                        $msje.classList.remove('ok');
                        $form.reset();
                        // CERRAMOS PANEL Y reSETEAMOS BOTONES DE NAVBAR
                        $panel.classList.remove('is-active');
                        $btnR.removeAttribute('disabled');
                        $btnl.removeAttribute('disabled');

                    },2000);

                    $msje.textContent = 'El usuario ha sido guardado con exito!!';
                    $msje.classList.remove('none');
                    $msje.classList.remove('error');
                    $msje.classList.add('ok');
                })
                .catch(error => {
                    setInterval(() =>{
                        $msje.textContent = '';
                        $msje.classList.add('none');
                        $msje.classList.remove('ok');
                        $msje.classList.remove('error');
                    },2000);

                    $msje.textContent = 'El nombre de usuario o el email ya existen';
                    $msje.classList.remove('none');
                    $msje.classList.remove('ok');
                    $msje.classList.add('error');
                });

            }

        
    });
}

//   ********** LOGIN USUARIOS

function loginUsuarios(btn){

    const $form = d.getElementById('frm_login');
    const $BtnL = d.querySelector('.btn-login');
    const $btnR = d.querySelector('.registro');
    const $btnl = d.querySelector('.login');
    const $panel =d.getElementById('panel-login');
    

    $BtnL.addEventListener('click', e => {

        e.preventDefault();
        e.stopPropagation();

        const nombreUsuario = d.getElementById('nombreUsuario').value;
        const claveUsuario = d.getElementById('claveUsuario').value;
        const $msje = d.getElementById('msjelog');

        // HACEMOS EL FETCH

        const req = {
            "nombreUsuario": nombreUsuario,
            "password": claveUsuario
        }

        console.log(req);

        fetch("http://localhost:8080/auth/login",{
            method: "POST",
            mode: "cors",
            headers: {'content-type':'application/json'},
            body: JSON.stringify(req)
        })
        .then(response => response.ok? response.json(): Promise.reject(response))
        .then(data => {
            setInterval(() => {
                $msje.textContent = '';
                $msje.classList.add('none');
                $msje.classList.remove('ok');
                $msje.classList.remove('error');

                // CERRAMOS LOGIN Y HACEMOS EL CAMBIO DE BOTONES
                $panel.classList.remove('is-active');
                $btnR.removeAttribute('disabled');
                $btnl.removeAttribute('disabled');

                //todo : cambio botones

            },2000);

                $msje.textContent = `Bienvenido ${data.nombreUsuario}`;
                $msje.classList.add('ok');
                $msje.classList.remove('error');
                $msje.classList.remove('none');
                usuario = data.nombreUsuario;
                token = data.token;
                console.log(usuario);
                console.log(token);

        })
        .catch(error => {
            setInterval(() => {
                $msje.textContent = '';
                $msje.classList.add('none');
                $msje.classList.remove('error');
                $msje.classList.remove('ok');
            },2000);

            $msje.textContent = 'Usuario No Autorizado';
                $msje.classList.add('error');
                $msje.classList.remove('none');
                $msje.classList.remove('ok');
        })
    });


    

}

