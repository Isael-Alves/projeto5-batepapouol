let User = "";
let Messages;


function Login(){
    User = document.querySelector(".Login input").value;
    document.querySelector(".Login").classList.add("Hidden");
    document.querySelector(".Body").classList.remove("Hidden");

    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    promessa.then(FetchMessages);


    
    
}

function FetchMessages(){
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then(LoadMessages);
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