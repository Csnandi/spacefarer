const cds = require('@sap/cds')

cds.on('bootstrap', app => {
  // 1. Check if we have a list of allowed users in the config
  const userConfig = cds.env.requires?.auth?.users
  if (!userConfig) return

  // Create a simple list of allowed usernames
  const allowedUsers = Object.keys(userConfig).map(u => u.toLowerCase())

  app.use((req, res, next) => {
    // 2. Try to get the username from the request
    const username = getBasicAuthUser(req)

    // 3. If the user is on the list, let them through
    if (username && allowedUsers.includes(username.toLowerCase())) {
      return next()
    }

    // Otherwise, block the request
    console.warn(`[auth] Access denied for: ${username || 'unknown'}`)
    
    // Send 401 with WWW-Authenticate header to trigger browser login prompt
    res.set('WWW-Authenticate', 'Basic realm="Users"')
    res.status(401).send('Unauthorized')
  })
})

// Helper function to read the Basic Auth header
function getBasicAuthUser (req) {
  const header = req.headers.authorization || req.headers.Authorization
  if (!header || !header.startsWith('Basic ')) return null

  try {
    // Decode the base64 string
    const decoded = Buffer.from(header.slice(6), 'base64').toString()
    return decoded.split(':')[0]
  } catch (err) {
    return null
  }
}

module.exports = cds.server
