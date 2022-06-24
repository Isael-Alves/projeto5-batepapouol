let Name = "";
let Messages;


function Login() {
    Name = document.querySelector(".Login input").value;
    const User = { name: Name };
    document.querySelector(".Login").classList.add("Hidden");
    document.querySelector(".Body").classList.remove("Hidden");

    setInterval(() => { axios.post('https://mock-api.driven.com.br/api/v6/uol/status', User)}, 5000);
    
    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', User);
    promessa.then(() => {

        const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
        promise.then(LoadMessages);

    });

    promessa.catch((answer) => {
        console.log(answer);
        alert("usuário offline ou nome do usuário já existente, faça login novamente");
        window.location.reload();
    });
}

function LoadMessages(messages) {

    Messages = messages.data;

    for (let i = 0; i < Messages.length; i++) {
        let messageType = Messages[i].type;
        if (messageType === "status") {
            document.querySelector("ul").innerHTML +=
                `<li class="msg ${Messages[i].type}">
                    <span><p>(${Messages[i].time})</p> <strong> ${Messages[i].from} </strong> ${Messages[i].text}</span>
                </li>`;
        }

        if (messageType === "message") {
            document.querySelector("ul").innerHTML +=
                `<li class="msg ${Messages[i].type}">
                    <span><p>(${Messages[i].time})</p> <strong> ${Messages[i].from} </strong> para <strong> ${Messages[i].to} </strong> ${Messages[i].text}</span>
                </li>`;
        }

        if (messageType === "private_message") {
            document.querySelector("ul").innerHTML +=
                `<li class="msg ${Messages[i].type}">
                    <span>
                    <p>(${Messages[i].time})</p> 
                    <strong> ${Messages[i].from} </strong>
                    reservadamente para 
                    <strong> ${Messages[i].to} </strong> 
                    ${Messages[i].text}
                    </span>
                </li>`;
        }
    }
}