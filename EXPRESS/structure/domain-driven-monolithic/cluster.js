const pm2 = require('pm2')

const instances = process.env.WEB_CONCURRENCY || -1
const maxMemory = process.env.WEB_MEMORY || 512

pm2.connect(() => {
  pm2.start({
    script: 'index.js',
    instances: instances,
    max_memory_restart: `${maxMemory}M`,
    env: {
      NODE_ENV: process.env.NODE_ENV || 'development',
      NODE_PATH: '.'
    }
  }, (err) => {
    if (err) {
      return console.error('Error while launching applications', err.stack || err)
    }
    pm2.launchBus((_, bus) => {

      bus.on('log:out', (packet) => {
      })

      bus.on('log:err', (packet) => {
      })
    })
  })
})
