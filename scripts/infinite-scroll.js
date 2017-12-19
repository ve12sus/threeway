   
function infiniteScroll(parent, post) {
 
     // Set some variables. We'll use all these later.
     var postIndex = 1,
         execute = true,
         stuffBottom = Y.one(parent).get('clientHeight') + Y.one(parent).getY(),
         urlQuery = window.location.href,
         postNumber = Static.SQUARESPACE_CONTEXT.collection.itemCount,
         paramtype,
         presentNumber = Y.all(post).size();

     if (urlQuery.indexOf('?category') > -1 ) {
         paramtype = '&page=';
     } else {   
         paramtype = '?page=';
     }
 
     console.log(urlQuery);
     Y.on('scroll', function() {
 
         if (presentNumber >= postNumber && execute === true) {
             Y.one(parent).append('<h1>There are no more posts.</h1>')
             execute = false;
         } else {
 
             // A few more variables.
             var spaceHeight = document.documentElement.clientHeight + window.pageYOffset,
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
                 Y.io(urlQuery + paramtype + postIndex, {
                     on: {
                         success: function (x, o) {
                             try {
                                 d = Y.DOM.create(o.responseText);
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
   
   
