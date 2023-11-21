let userForm = document.getElementById("user-form");
 let userEntries=[]
const retrieveEntries=()=>{
    let entries=localStorage.getItem("user-entries");
    if(entries){
        entries=JSON.parse(entries);
    }else{
        entries=[]
    }
    return entries;
};
const displayEntries=()=>{
    const entries=retrieveEntries();
    const tableEntries = entries.map((entry)=>{
        const namecell = `<td>${entry.name}</td>`;
        const emailcell = `<td>${entry.email}</td>`;
        const passwordcell = `<td>${entry.password}</td>`;
        const dobcell = `<td>${entry.dob}</td>`;
        const acceptTermscell = `<td>${entry.acceptedTermsAndconditions}</td>`;
        const row=`<tr>${namecell} ${emailcell} ${passwordcell} ${dobcell} ${acceptTermscell}</tr>`;
        return row
    }).join('\n');
    const table=`<thead><tr>
    <th>Name</th>
    <th>Email</th>
    <th>Password</th>
    <th>Dob</th>
    <th>Accepted Terms?</th>
    </tr></thead>
    <body>${tableEntries}</body>`;
    let details=document.getElementById("user-entries");
    details.innerHTML=table;
};


const saveUserForm=(event)=>{
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptedTermsAndconditions = document.getElementById("acceptTerms").checked;
    let year = Number(dob.split("-")[0]);
    let today = new Date();
    let y = today.getFullYear();
    let a=y-year;
    if(a>55 || a<18 ){
        document.getElementById('dob')
        return alert("Age should be between 18 and 55")
    }
    else{
        const entry = {
            name,
            email,
            password,
            dob,
            acceptedTermsAndconditions
    };
    userEntries=retrieveEntries();
    userEntries.push(entry);
    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    displayEntries();
    userForm.reset();
}
};
userForm.addEventListener("submit", saveUserForm);
displayEntries();