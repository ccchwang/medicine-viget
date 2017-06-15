window.onload = function() {
  let chatList = document.getElementsByClassName('bubble')

  Array.prototype.slice.call(chatList).forEach(text => {

    text.style.animationDelay = `${text.dataset.delay}ms`;
    text.style.animationPlayState = 'running';
    text.className += " finished";


    if (!text.className.includes('-response')) {
      Array.prototype.slice.call(text.children).forEach(child => {
        child.style.transitionDelay = `${1000 + Number(text.dataset.delay)}ms`;
      })
    }

  })
}

