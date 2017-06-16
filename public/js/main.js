window.onload = function() {
  let convoCards = document.getElementsByClassName('conversation-card')

  Array.prototype.slice.call(convoCards).forEach(convo => {
    let objectBottom = (convo.offsetHeight + convo.offsetTop) / 1.04;

    window.addEventListener('scroll', function(){
      let windowBottom = window.innerHeight + window.scrollY;

      if (windowBottom > objectBottom && !convo.className.includes('finished')) {
        convo.className += " current finished";

        let chatList = document.querySelectorAll(`.current > .narrow-padding > .-chat > .bubble`);

        document.querySelector(`.current > .about-flo-icon`).className += " animate";


        Array.prototype.slice.call(chatList).forEach(text => {
          text.style.animationDelay = `${text.dataset.delay}ms`;
          text.style.animationPlayState = 'running';

          setTimeout(function(){
            text.className += " finished";
          }, `${1000 + Number(text.dataset.delay)}`)
        })

        convo.classList.remove("current");
      }
    })

  })



}

