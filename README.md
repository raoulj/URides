# URide

A Vue.js project with a simple Node backend for Princeton's ORFE401 Lab Projects.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

[Vue] For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Server Configuration Setup

You can set up a server configuration like production to make sure everything is production-ready.

### Steps

1.  (Optional) Locate /etc/hosts and add a redirect as follows:

```
127.0.0.1       localhost
... (other host redirections) ...
192.168.33.10   uride.local.com
```

Where `uride.local.com` can be any name for the server that you would like to use.