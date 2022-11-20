module.exports = {
  servers: {
    one: {
      host: 'quizzacious.xyz',
      username: 'root',
      password: 'Qu1ZZac1ous'
    }
  },
  app: {
    // if you edit the app 'name' field, be sure to run 'mup stop' if the app is already running.
    // otherwise you will have two apps deployed at once, with unpredictable results.
    name: 'Quizzacious',
    path: '../',
    servers: { one: {}, },
    buildOptions: { serverOnly: true },
    env: {
      ROOT_URL: 'https://quizzacious.xyz',
      MONGO_URL: 'mongodb://mongodb/meteor',
      MONGO_OPLOG_URL: 'mongodb://mongodb/local',
    },
    docker: { image: 'zodern/meteor:latest' },
    enableUploadProgressBar: true
  },
  proxy: {
    domains: 'quizzacious.xyz',
    ssl: {
      letsEncryptEmail: 'johnson@hawaii.edu',
      forceSSL: true
    }
  },
  mongo: { version: '5.0.5', servers: { one: {} }
  },
};
