jQuery(document).ready(function($) {
  let $tabsContainer = $(".tabs"),
      $tabIndicator = $("#tab-indicator");


['bio', 'experience', 'reviews', 'resources'].forEach(tab => {
  let $newTab = $(`.tab-link.${tab}`);

  $newTab.click(function(e){
    let $currentTab = $("[aria-selected='true']"),
        currentTabPosition = $currentTab.offset().left;

    // Turn current tab off
    $currentTab.attr("aria-selected", "false")

    // Set the clicked one on
    $newTab.attr("aria-selected", "true")
    moveIndicator($newTab, currentTabPosition, tab);
  })
})




  function moveIndicator(newTab, currentTabPosition, tab) {

    let textPosition = newTab.offset().left,
        tabsPosition = $tabsContainer.offset().left,
        distance = textPosition - tabsPosition,
        direction = currentTabPosition < textPosition ? 'right' : 'left';

    //hide content that's currently being shown
    $('.show-content').removeClass('show-content').css('animation', `${direction}-hide 0.3s ease-in-out`);

    //show content that matches clicked tab
    $(`.content.${tab}`).addClass('show-content').css('animation', `${direction}-show 0.3s ease-in-out`);

    $tabIndicator.css('transform', `translateX(${distance}px) scaleX(${newTab.width() * 0.01})`);
  }


});

