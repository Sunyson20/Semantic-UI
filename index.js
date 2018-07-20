const Koa = require('koa')
const path = require('path')
const serve = require('koa-static')

const app = new Koa()

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './'

app.use(serve(
    path.join(__dirname, staticPath)
));

app.use(serve(__dirname + '/homepage.html'));

app.use(async (ctx) => {
    ctx.body = 'hello world'
})

app.listen(3000, () => {
    console.log('[demo] static-use-middleware is starting at port 3000')
})