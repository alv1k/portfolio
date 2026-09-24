import puppeteer from 'puppeteer'
import { createServer } from 'http'
import { readFileSync, writeFileSync } from 'fs'
import { join, extname, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = join(__dirname, '..', 'dist')
const PORT = 4173
const BASE = `http://localhost:${PORT}`

const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
}

const server = createServer((req, res) => {
  const url = new URL(req.url, BASE)
  let filePath = join(DIST, url.pathname === '/' ? 'index.html' : url.pathname)
  try {
    const content = readFileSync(filePath)
    const ext = extname(filePath)
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' })
    res.end(content)
  } catch {
    const index = readFileSync(join(DIST, 'index.html'))
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(index)
  }
})

server.listen(PORT)
console.log(`[prerender] server on ${BASE}`)

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})
const page = await browser.newPage()

await page.goto(BASE, { waitUntil: 'networkidle0' })
await page.waitForSelector('#hero h1')
await page.waitForSelector('#about')
await page.waitForSelector('#projects')
await page.waitForSelector('#skills')
await page.waitForSelector('#contact')

const ruHtml = await page.content()
writeFileSync(join(DIST, 'index.html'), ruHtml)
console.log('[prerender] index.html saved')

await browser.close()
server.close()
console.log('[prerender] done')
