   
function infiniteScroll(parent, post) {
 
     // Set some variables. We'll use all these later.
     var postIndex = 1,
         execute = true,
         stuffBottom = Y.one(parent).get('clientHeight') + Y.one(parent).getY(),
         urlQuery = window.location.href,
         postNumber = Static.SQUARESPACE_CONTEXT.collection.itemCount,
         title = Static.SQUARESPACE_CONTEXT.collection.title,
         categoryFilter = Static.SQUARESPACE_CONTEXT.collection.categoryFilter,
         presentNumber = Y.all(post).size();
 
     Y.on('scroll', function() {
 
         if (presentNumber >= postNumber && execute === true) {
             Y.one(parent).append('<h1>There are no more posts.</h1>')
             execute = false;
         } else {
 
             // A few more variables.
             var spaceHeight = document.documentElement.clientHeight + window.scrollY,
             next = false;
 
             /*
                 This if statement measures if the distance from
                 the top of the page to the bottom of the content
                 is less than the scrollY position. If it is,
                 it's sets next to true.
             */
             if (stuffBottom < spaceHeight && execute === true) {
                 next = true;
             }
 
             if (next === true) {
 
                 /*
                     Immediately set execute back to false.
                     This prevents the scroll listener from
                     firing too often.
                 */
                 execute = false;
 
                 // Increment the post index.
                 postIndex++;
 
                 // Make the Ajax request.
                 Y.io(urlQuery + '&page=' + postIndex, {
                     on: {
                         success: function (x, o) {
                             try {
                                 d = Y.DOM.create(o.responseText);
                                 console.log(title);
                             } catch (e) {
                                 console.log("JSON Parse failed!");
                                 return;
                             }
 
                             // Append the contents of the next page to this page.
                             Y.one(parent).append(Y.Selector.query(parent, d, true).innerHTML);
 
                             // Reset some variables.
                             stuffBottom = Y.one(parent).get('clientHeight') + Y.one(parent).getY();
                             presentNumber = Y.all(post).size();
                             execute = true;
                             console.log(urlQuery);
 
                         }
                     }
                 });
             }
         }
     });
 }
 
 // Call the function on domready.
 Y.use('node', function() {
     Y.on('domready', function() {
         infiniteScroll('.posts','.lazy-post');
     });
 });
   
   
