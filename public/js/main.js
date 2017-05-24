$(document).ready(function () {

  var $tabsContainer = $(".tabs"),
      $tabIndicator = $("#tab-indicator");

  //add click handlers to each tab
  ['bio', 'experience', 'reviews', 'resources'].forEach(tab => {
    let $newTab = $(`.tab-link.${tab}`);

    $newTab.click(() => {
      let $currentTab = $("[aria-selected='true']"),
          currentTabPosition = $currentTab.offset().left;

      //turn current tab off
      $currentTab.attr("aria-selected", "false")

      //turn the clicked one on
      $newTab.attr("aria-selected", "true")

      //animate transition from one tab to another
      handleTransition($newTab, currentTabPosition, tab);
    })
  })


  function handleTransition($newTab, currentTabPosition, tab) {

    let textPosition = $newTab.offset().left,
        tabsPosition = $tabsContainer.offset().left,
        distance = textPosition - tabsPosition,
        //direction that tab is moving towards will influence which animation gets triggered
        direction = currentTabPosition < textPosition ? 'right' : 'left';

    //hide content that's currently being shown
    $('.show-content').removeClass('show-content').css('animation', `${direction}-hide 0.3s ease-in-out`);

    //show content that matches clicked tab
    $(`.content.${tab}`).addClass('show-content').css('animation', `${direction}-show 0.3s ease-in-out`);

    //move indicator and scale it to fit tab
    $tabIndicator.css('transform', `translateX(${distance}px) scaleX(${($newTab.width() + 19) * 0.01})`);
  }
});

