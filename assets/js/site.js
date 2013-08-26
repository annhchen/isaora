$(function() {
    var Isaora = {
        config: {
            apis: {
                twitter   : '/twitter-proxy.php?url=',
                tumblr    : 'http://isaora.tumblr.com/api/read/json',
                instagram : 'https://api.instagram.com/v1/users/145933309/media/recent/?callback=?&count=10'
            },
            timer: 500
        },

        data: {
            twitter     : [],
            tumblr      : [],
            instagram   : []     
        },

        dataSorted: [],

        init: function () {
            console.log('initing');
            Isaora.fetchData();
            return false;
        },

        bindEvents: function () {
            // placeholder
        },

        fetchData: function () {
            Isaora.fetchTwitterPosts();
            Isaora.fetchTumblrPosts();
            Isaora.fetchInstagramPosts();
        },

        fetchTwitterPosts: function () {    
            var twitterUrl = Isaora.config.apis.twitter + 
                encodeURIComponent('statuses/user_timeline.json?screen_name=Isaora&count=10');

                // Extra params: 
                // encodeURIComponent('&count=10&include_rts=false&exclude_replies=true');

            console.log('twitter url: ' + twitterUrl);
            $.getJSON(twitterUrl)
                .done(function(response) {
                    console.log('success! twitter data: ');
                    console.log(response);
                    Isaora.data.twitter = response;
                    Isaora.sortResults();
                })
                .fail(function(jqxhr, textStatus, error) {
                    var err = textStatus + ', ' + error;
                    console.log("Twitter request failed: " + err);
                });
        },

        fetchInstagramPosts: function () {
            var accessToken = '145933309.467ede5.044b153f6f1b45508c95c019c47a6ce2',
                accessParameters = {
                    access_token: accessToken
                };

            $.getJSON(Isaora.config.apis.instagram, accessParameters, function (response) {
                Isaora.data.instagram = response.data;
                console.log(Isaora.data.instagram);
            });
        },

        fetchTumblrPosts: function () {
            console.log('tumblr api:');
            console.log(tumblr_api_read);

            Isaora.data.tumblr = tumblr_api_read;
        },

        sortResults: function () {
            var isData = Isaora.checkData(),
                timer;

            // Do we have all the data we need? 
            if (!isData) {
                // Add a setTimeout to check again
                //console.log('not enough data, checking again in ' + Isaora.config.timer + 'ms');
                timer = window.setTimeout(Isaora.sortResults, Isaora.config.timer);
                return false;
            } else {
                // Clear timer 
                //console.log('there is enough data!');
                window.clearTimeout(timer);
                delete timer;
            }

            // Placeholder for date sort stuff
            console.log('sort data by date now');

        },

        checkData: function () {
            var isData = true;
            $.each(Isaora.data, function (dataType, dataset) {
                // console.log(dataType + ': ' + dataset);
                if (dataset.length === 0) {
                    isData = false;
                    return false;
                }
            });
            return isData;
        }
    };

    $(document).ready(Isaora.init());
});