//Animating chat bubbles on conversation cards:

window.onload = function() {
  //find all convo cards and loop through them
  let convoCards = document.getElementsByClassName('conversation-card')

  Array.prototype.slice.call(convoCards).forEach(convo => {

    //for each card, add event listener to be triggered when user scrolls down a percentage of its height
    window.addEventListener('scroll', function(){
      let objectBottom = (convo.offsetHeight + convo.offsetTop) / 1.03;
      let windowBottom = window.innerHeight + window.scrollY;

      if (windowBottom > objectBottom && !convo.className.includes('finished')) {
        //add 'current' class to card to indicate that this is the convo card currently in motion. add 'finished' class to indicate that animation has been applied.
        convo.className += " current finished";

        //find all chat bubbles inside the current convo card
        let chatList = document.querySelectorAll(`.current > .narrow-padding > .-chat > .bubble`);

        //for each bubble, apply animation delay as indicated by element's data-delay attribute
        Array.prototype.slice.call(chatList).forEach(text => {
          text.style.animationDelay = `${text.dataset.delay}ms`;
          text.style.animationPlayState = 'running';

          //adding 'finished' class will cause bubble's spinner to hide and bubble's text to appear
          setTimeout(function(){
            text.className += " finished";
          }, `${1000 + Number(text.dataset.delay)}`)
        })

        //find and animate the header icon associated with each card
        document.querySelector(`.current > .about-flo-icon`).className += " animate";

        //remove 'current' class from convo card because animation was successfully triggered
        convo.classList.remove("current");
      }
    })

  })



}

