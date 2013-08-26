$(function() {
    var Isaora = {
        config: {
            apis: {
                twitter: '/twitter-proxy.php?url=',
                tumblr: 'http://isaora.tumblr.com/api/read/json',
                instagram: 'https://api.instagram.com/v1/users/isaora'
            }
        },

        init: function () {
            console.log('initing');
            Isaora.fetchData();
            return false;
        },

        bindEvents: function () {
            // Placeholder
        },

        fetchData: function () {
            Isaora.fetchTwitterPosts();
            Isaora.fetchTumblrPosts();
            Isaora.fetchInstagramPosts();

        },

        fetchTwitterPosts: function () {    
            var twitterUrl = Isaora.config.apis.twitter + 
                encodeURIComponent('statuses/user_timeline.json?screen_name=Isaora&count=10')
                // Extra params: 
                // encodeURIComponent('&count=10&include_rts=false&exclude_replies=true');

            console.log('twitter url: ' + twitterUrl);
            $.getJSON(twitterUrl)
                .done(function(response) {
                    console.log('success! twitter data: ');
                    console.log(response);
                })
                .fail(function(jqxhr, textStatus, error) {
                    var err = textStatus + ', ' + error;
                    console.log( "Twitter request failed: " + err);
                });
        },

        fetchInstagramPosts: function () {
            var instagramFeed = new Instafeed({
                get: 'user',
                userId: 145933309,
                accessToken: '145933309.467ede5.044b153f6f1b45508c95c019c47a6ce2'
            });
            instagramFeed.run();
        },

        fetchTumblrPosts: function () {
            console.log('tumblr api:');
            console.log(tumblr_api_read);
            
            // $.getJSON(Isaora.config.apis.tumblr)
            //     .done(function(response) {
            //         console.log('\n success! tumblr data: ');
            //         console.log(response);
            //     })
            //     .fail(function(jqxhr, textStatus, error) {
            //         var err = textStatus + ', ' + error;
            //         console.log( "Tumblr request failed: " + err);
            //     });
        }

    };

    $(document).ready(Isaora.init());
});