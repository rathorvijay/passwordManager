// buttons
const submit=document.querySelector(".submit");
const copesbtn=document.getElementsByClassName("copy");

// table
const table=document.querySelector(".table");


const updatetable=(website,username,password)=>{

    console.log(website,username,password);
    const localdata=localStorage.getItem("localdata");

    if(website && username && password){
        
        if(localdata==null){
            let json=[];
            json.push({website:website,username:username,password:password});
            localStorage.setItem("localdata",JSON.stringify(json));
        }
        else{
            let json=JSON.parse(localStorage.getItem("localdata"));
            json.push({website:website,username:username,password:password});
            localStorage.setItem("localdata",JSON.stringify(json));
        }
   }

  showdata();
}

const showdata=()=>{

    let str=`<tr>
    <th>website</th>
    <th>username</th>
    <th>password</th>
    <th>delete</th>
    </tr>`

    const localdata=localStorage.getItem("localdata");

    if(localdata==null){
        str+="Not Data Found";
    }
    else{
        JSON.parse(localStorage.getItem("localdata")).map((value,index)=>{
            str+=`<tr>
            <td>${value.website}</td>
            <td>${value.username}</td>
            <td>
                <span class="pass">
                    ${value.password}
                    <button class="copy"  onclick="copyfun(${value.password})" >copy</button>
                </span>
            </td>
            <td>
                <button class="del" onclick="delfun(${index})" >delete</button>
            </td>
          </tr>`;
       });
     }  
    table.innerHTML=str;
}


submit.addEventListener("click",()=>{
    updatetable(website.value,username.value,password.value);
})

function copyfun(text){
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  alert(`password is copy ${text}`)
}

function delfun(ele){
    let json=JSON.parse(localStorage.getItem("localdata"));
    const newArray=Array.from(json).filter((value,index)=>{
        return index!=ele;
    })
    localStorage.setItem("localdata",JSON.stringify(newArray));
    showdata();
}

showdata();
