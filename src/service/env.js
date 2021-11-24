const isProd = ['production', 'prod'].includes(process.env.NODE_ENV)

const env = {
  dev: {
    server: 'http://106.12.123.56:8090',
    // server: 'http://192.168.10.58:8090',
    // server: 'http://192.169.1.33:8090',
    client: 'http://localhost:8080',
  },
  prod: {
    server: '//106.12.123.56:8090',
    client: 'https://www.lliiooiill.cn',
  }
}

module.exports = isProd ? env.prod : env.dev