module.exports = {
  servers: {
    one: {
      host: 'quizzacious.xyz', //change
      username: 'root',
      password: 'Qu1ZZac1ous' //change
    }
  },
  app: {
    // if you edit the app 'name' field, be sure to run 'mup stop' if the app is already running.
    // otherwise you will have two apps deployed at once, with unpredictable results.
    name: 'Quizzacious', //title
    path: '../',
    servers: { one: {}, },
    buildOptions: { serverOnly: true },
    env: {
      ROOT_URL: 'https://quizzacious.xyz', //change
      MONGO_URL: 'mongodb://mongodb/meteor',
      MONGO_OPLOG_URL: 'mongodb://mongodb/local',
    },
    docker: { image: 'zodern/meteor:latest' },
    enableUploadProgressBar: true
  },
  proxy: {
    domains: 'quizzacious.xyz', //change
    ssl: {
      letsEncryptEmail: 'johnson@hawaii.edu',
      forceSSL: true
    }
  },
  mongo: { version: '5.0.5', servers: { one: {} }
  },
};
