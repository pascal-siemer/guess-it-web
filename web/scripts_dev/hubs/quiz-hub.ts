// const url = 'localhost';
// const connection = new signalR.HubConnectionBuilder()
//     .withUrl(url)
//     .build();
//
// connection.on("messageReceived", (username: string, message: string) => {
//    const paragraph = document.createElement('p');
//    paragraph.innerText = `{username}: ${message}`;
//
//    document.body.append(paragraph);
//
// });
//
// connection.start().catch((error) => alert(error));
//
// async function send() {
//     await connection.send("newMessage", "Max Mustermann", "Mustermessage");
// }