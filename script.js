let Name = "";
let Messages;


function Login() {
    Name = document.querySelector(".Login input").value;
    const User = { name: Name };
    document.querySelector(".Login").classList.add("Hidden");
    document.querySelector(".Body").classList.remove("Hidden");

    setInterval(() => { axios.post('https://mock-api.driven.com.br/api/v6/uol/status', User) }, 5000);

    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', User);
    promessa.then(() => {
        FetchMessages();
        setInterval(FetchMessages, 3000);
    });

    promessa.catch((answer) => {
        console.log(answer);
        alert("usuário offline ou nome do usuário já existente, faça login novamente");
        window.location.reload();
    });
    return Name;
}

function FetchMessages() {
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then(LoadMessages);
}

function LoadMessages(messages) {
    Messages = "";
    Messages = messages.data;

    for (let i = 0; i < Messages.length; i++) {
        let recipient = Messages[i].to;
        let sender = Messages[i].from;
        let messageType = Messages[i].type;

        if (messageType === "status") {
            document.querySelector("ul").innerHTML +=
                `<li class="msg ${Messages[i].type}">
                    <span><p>(${Messages[i].time})</p> <strong> ${sender} </strong> ${Messages[i].text}</span>
                </li>`;
        }

        if (messageType === "message") {
            document.querySelector("ul").innerHTML +=
                `<li class="msg ${Messages[i].type}">
                    <span><p>(${Messages[i].time})</p> <strong> ${sender} </strong> para <strong> ${recipient} </strong> ${Messages[i].text}</span>
                </li>`;
        }

        if (messageType === "private_message" && (Name === recipient || Name === sender)) {
            document.querySelector("ul").innerHTML +=
                `<li class="msg ${Messages[i].type}">
                    <span>
                    <p>(${Messages[i].time})</p> 
                    <strong> ${sender} </strong>
                    reservadamente para 
                    <strong> ${recipient} </strong> 
                    ${Messages[i].text}
                    </span>
                </li>`;
        }
    }
    const LastMessage = document.querySelector("li:last-child");
    LastMessage.scrollIntoView();
}

function SendMessage() {
    const Text = document.querySelector("footer input").value;
    if (Text !== "") {

        axios.post('https://mock-api.driven.com.br/api/v6/uol/messages',
            {
                from: Name,
                to: "Todos",
                text: Text,
                type: "message"
            });

    } else {

        alert("Digite alguma mensagem.");
        const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
        promise.then(LoadMessages);

    }

    document.querySelector("footer input").value = "";
}