;((doc, Socket, stroage, location) => {
  const oList = doc.querySelector('#list'),
        oMessage = doc.querySelector('#message'),
        oSendBtn = doc.querySelector('#send'),
        ws = new Socket('ws:localhost:8000');
  let username = '';

  const init = () => {
    bindEvent();
  };

  function bindEvent() {
    oSendBtn.addEventListener('click', handleEventSendBtnClcik, false);
    ws.addEventListener('open', handleOpen, false);
    ws.addEventListener('close', handleClose, false);
    ws.addEventListener('error', handleError, false);
    ws.addEventListener('message', handleMessage, false);
  };

  function handleEventSendBtnClcik() {
    const message = oMessage.value;

    if (!message.trim().length) {
      return;
    }

    ws.send(JSON.stringify({
      user: username,
      dateTime: new Date().getTime(),
      message: message
    }));

    oMessage.value = '';
  };

  function handleOpen(e) {
    username = stroage.getItem('username');

    if(!username) {
      location.href = 'entry.html';
      return;
    }
  };

  function handleClose() {

  };

  function handleError() {

  };

  function handleMessage(e) {
    const msgdata = JSON.parse(e.data);
    oList.appendChild(createMsg(msgdata));
  };

  function createMsg(data) {
    const { user, dateTime, message } = data;
    const oItem = doc.createElement('li');
    oItem.innerHTML = `
      <p>
        <span>${ user }</span>
        <i>${ new Date(dateTime) }</i>
      </p>
      <p>消息: ${ message }</p>
    `

    return oItem;
  }

  init();

})(document, WebSocket, localStorage, location);
