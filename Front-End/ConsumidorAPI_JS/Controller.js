const btnGetAllSuperHero = document.getElementById("btnGetAllSuperHero");
const btnGetSuperHeroById = document.getElementById("btnGetSuperHeroById");
const AddSuperHero = document.getElementById("AddSuperHero");
const UpdateSuperHero = document.getElementById("UpdateSuperHero");
const btnDeleteSuperHeroById = document.getElementById("btnDeleteSuperHeroById");


let data = "...";
let obj = {

}


function Get_GetAll(data, divId) {
    if (data != null) {
        const DivList = document.getElementById(`${divId}`);
        DivList.innerHTML = "";
        let items = "";
        if (Array.isArray(data)) {
            data.forEach(element => {
                items +=
                    `
            <p>====================================================================</p>
            <p>Id: ${element.id}</p>
            <p>Name: ${element.name}</p>
            <p>First Name: ${element.firstName}</p>
            <p>Last Name: ${element.lastName}</p>
            <p>Place: ${element.place}</p>  
            <br>
            <p>====================================================================</p>          
            `;
            });
        }
        else {
            items +=
                `
            <p>====================================================================</p>
            <p>Id: ${data.id}</p>
            <p>Name: ${data.name}</p>
            <p>First Name: ${data.firstName}</p>
            <p>Last Name: ${data.lastName}</p>
            <p>Place: ${data.place}</p>  
            <br>
            <p>====================================================================</p>          
            `;
        }
        DivList.innerHTML = items;
        items = "";
    }

}

function GetObj(_name, _firstname, _lastname, _place, _id = null ? null : 0) {

    const name = document.getElementById(_name).value;
    const firstName = document.getElementById(_firstname).value;
    const lastName = document.getElementById(_lastname).value;
    const place = document.getElementById(_place).value;

    return obj = {
        "id": _id,
        "name": name,
        "firstName": firstName,
        "lastName": lastName,
        "place": place
    }
}

const AddHero = async () => {

    obj = GetObj("txtAddName", "txtAddFirstName", "txtAddLastName", "txtAddPlace");

    data = await request("addsuperhero", "POST", obj);
    if (Array.isArray(data)) {
        alert("Super Hero Criado!")
    }
}

const GetAllHeroes = async () => {
    data = await RequestGet("getallsuperheroes");
    Get_GetAll(data, "ListAllSuperHero");
}

const GetHeroe = async (id) => {
    if (id == null || id == 0) {
        alert("O id não pode null ou 0!")
    }
    else {
        data = await RequestGet("getsuperhero/" + id);

        Get_GetAll(data, "ListSuperHero");
    }
}

const UpdatHero = async (id) => {
    if (id == null || id == 0) {
        alert("O id não pode null ou 0!")
    } else {
        obj = GetObj("txtUpdateName", "txtUpdateFirstName", "txtUpdateLastName", "txtUpdatePlace", id);

        data = await request("updatesuperhero", "PUT", obj);

        if (Array.isArray(data)) {
            alert("Super Hero Atualizado!")
        }
    }
}

const DeleteHero = async (id) => {
    if (id == null || id == 0) {
        alert("O id não pode null ou 0!")
    }
    else {
        data = await request(`deletesuperhero/${id}`, "DELETE");
        if (Array.isArray(data)) {
            alert("Super Hero Deletado!")
        }
    }
}


AddSuperHero.addEventListener("click", (e) => {
    AddHero();
})

btnGetAllSuperHero.addEventListener("click", (e) => {
    GetAllHeroes();
})

btnGetSuperHeroById.addEventListener("click", (e) => {
    const idSuperHero = document.getElementById("txtGetSuperHeroById").value;
    GetHeroe(idSuperHero);
})

UpdateSuperHero.addEventListener("click", (e) => {
    const idSuperHero = document.getElementById("txtGetSuperHeroByIdUpdate").value;
    UpdatHero(idSuperHero);
})

btnDeleteSuperHeroById.addEventListener("click", (e) => {
    const idSuperHero = document.getElementById("txtGetSuperHeroByIdDelete").value;
    DeleteHero(idSuperHero);
})
