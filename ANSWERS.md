### How I prioritzed work

I prioritized mobile first, in congruence with responsive design guidelines.The bulk of my CSS is for a screen smaller than 375px. With this base, I used media queries to make tweaks for larger screens.

After the mobile layout was done, I spent a bulk of my time working on menu tabs for mobile. I didn't want the tabs to take up too much precious space on smaller screens. So I decided that making them horizontally scrollable was better than vertically stacking. Scrollable menus are intuitive for touch screens. I made sure to add white blur to the ends of the menu, to indicate that there is more to see. Keeping the tabs horizontal also meant that I didn't have to make too many additional tweaks for desktop.


### Browser incompatabilities

+ The scrollable tabs depend on a webkit feature to hide the scrollbar - I could not find a solution for other browsers.
+ jQuery might run into problems in older browsers.
+ With more time, I would add proper vendor prefixes to keyframes, transitions, etc.



### preferred file structure, CSS conventions, JS syntax. explain


### explain sass
