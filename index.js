const button = document.querySelector("#button");

button.addEventListener("click", function(e) {
    e.preventDefault(); 
    limpar();

    const textbox = document.querySelector("#box")
    const value = textbox.value; //onde concentra o valor do input
    const span = document.querySelector('#span')
    const body =  document.querySelector('body')

        family(value) //passando sobrenome na caixa de texto.
            .then(lastname => {  
                console.log(lastname)  //resolve entra no .then
                span.innerHTML = lastname.msg //retorna msg na pagina web.
                bestPerson(lastname)
            .then(response => {
                console.log(response)
                var p = document.createElement('p')
                p.innerText = response  //outra forma de inserir na pagina web.
                body.appendChild(p)
            })
            .catch(response => {
                console.log(response)
            })
        })
            .catch(response => {
                console.log(response)  //passando reject da function family.
                span.innerHTML = response.msg
                bestPerson(response)
            .then(obj => {
                console.log(obj)
            })
            .catch(obj => {
                console.log(obj)
                var p = document.createElement('p')
                p.innerHTML = obj
                body.appendChild(p)
            })
        });

    
})

function family (lastname) {
    return new Promise((resolve, reject) => {
        if(lastname == 'Monteiro') {
            resolve({
                success: true,
                name: lastname,
                msg: lastname + ' best family! '
            });
        }else {
            reject({
                success: false, 
                name: lastname,
                msg: lastname + ' isnt best family! '
            })
        }
    })
}

function bestPerson (response) {
    return new Promise((resolve, reject) => {
        if(response.success == true) {
            resolve('The best person in the family is Tania ' + response.name);
        } else {
            reject(response.name + ' is not valid! ');
        }
    });
}

function limpar() {
    var l = document.querySelector('span')
    l.innerHTML = ''
    var p = document.querySelectorAll('p')
    p.forEach(a => {
        document.body.removeChild(a)
    })
}



