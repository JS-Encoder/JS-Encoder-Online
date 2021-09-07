const isProd = ['production', 'prod'].includes(process.env.NODE_ENV)

const env = {
  dev: {
    server: 'http://192.168.10.54:8090',
    client: 'http://localhost:8080'
  },
  prod: {
    server: '',
    client: ''
  }
}

module.exports = isProd ? env.prod : env.dev