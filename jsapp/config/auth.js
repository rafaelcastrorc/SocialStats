module.exports = {

    'facebookAuth' : {
        'clientID'      : '495523660828633', // your App ID
        'clientSecret'  : '5f242f5b933ef672ef048a16a795130d', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback',
        'profileURL'    : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields' : ['id', 'name'] // For requesting permissions from Facebook API
    },

    'twitterAuth' : {
        'consumerKey'       : '0eAIHGavtTR5r3vWK6xlfgPB8',
        'consumerSecret'    : 'USjpuNsgmSIiOjwzEMrVd75JZ7RlkFqiYhNwq9lMsqJDpQCQqu',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

};
