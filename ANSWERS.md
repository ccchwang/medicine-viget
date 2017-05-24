### How I prioritzed work

I prioritized mobile first, in congruence with responsive design guidelines.The bulk of my CSS is for a screen smaller than 375px. With this base, I used media queries to make tweaks for larger screens.

After the mobile layout was done, I spent a bulk of my time working on menu tabs for mobile. I didn't want the tabs to take up too much precious space on smaller screens. So I decided that making them horizontally scrollable was better than vertically stacking. Scrollable menus are intuitive for touch screens. I made sure to add white blur to the ends of the menu, to indicate that there's more to see. Keeping the tabs horizontal also meant I didn't have to make too many tweaks for desktop - animations and general layout could be kept the same.


### Browser Incompatabilities

+ Scrollable tabs depend on a webkit feature to hide scrollbar - I couldn't find a solution for other browsers.
+ jQuery might run into problems on older browsers.
+ Keyframe animations look a bit different on Safari vs. Chrome. With more time, I would fix.
+ Need to add proper vendor prefixes to keyframes, transitions, etc.


### File Structure

+ External tools (jQuery, Bootstrap) and precompiled code go in assets folder.
+ Static files (images, CSS, JS) go in public folder under file-specific folders.


### CSS Conventions

+ Mobile design is coded first. Media queries are used for bigger screens.
+ Code is grouped by markup sections. This makes it easier to find and fix relevant CSS.

I used Sass as my precompiler. I like it because it's:
+ Actively supported.
+ Nesting allows you to keep single source of truth per section.
+ Variables make it easy to keep track of various options.


### JS Syntax

+ Used jQuery for ease of manipulating DOM and CSS.
+ Used some ES6 for cleaner looking code.
