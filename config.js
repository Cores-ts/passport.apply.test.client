const cfg = {
    port: 9090,
    get baseUrl() {
        return 'http://localhost:' + this.port
    },
    get client(){
        return {
            clientId: 'JJTNgYBZgAsDB52ixfAg4NTc7XnJSQD9',
            clientSecret: 'ZkMMEwK5GfDBXNxHiNJNP6tTGyW2E4XbzGmGMuYjNcuMYpqZRSqF4qzuM5GtzmzN2eQ3nWio8j7L7uEGfh44sqjmYgvseY6kdX2PSiPQh69vWDaN5zyyys2zdEAtLXs3',
            accessTokenUri: 'https://auth.onepassport.eu/token',
            authorizationUri: 'https://auth.onepassport.eu/apply?slug=opport',
            getApplicationUri: 'https://auth.onepassport.eu/applications/',
            redirectUri: this.baseUrl + this.paths.authFlowCallback,
            scopes: ['apply.opportunity'],
            state: '1234567890'
            
        }
    },
    paths: {
        applyFlowStart: '/oauth-client/auth',
        authFlowCallback: '/oauth-client/auth/callback',
        resourceData: '/oauth-client/auth/identity'
    }
};

module.exports = cfg;