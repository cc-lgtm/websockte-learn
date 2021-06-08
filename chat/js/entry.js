;((doc, storage, location) => {
  const oUserName = doc.querySelector('#username'),
        oEnterBtn = doc.querySelector('#enter');

  const init = () => {
    bindEevt()
  };

  function bindEevt() {
    oEnterBtn.addEventListener('click', handleEventBtnClick, false);
  };

  function handleEventBtnClick() {
    const username = oUserName.value.trim();

    if (username.length < 6) {
      alert('用户名不能小于6位');
    } else {
      storage.setItem('username', username);
      location.href = 'index.html';
    };
  };

  init();

})(document, localStorage, location);
