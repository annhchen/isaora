$(function() {
    var Isaora = {
        config: {
            apis: {
                twitter: '/twitter-proxy.php?url=',
                tumblr: '',
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
        }
    };

    $(document).ready(Isaora.init());
});