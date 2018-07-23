const Koa = require('koa')
const path = require('path')
const serve = require('koa-static')
const Router = require('koa-router')
const logger = require('koa-logger')
const koaBody = require('koa-body')
const fs = require('fs')

const app = new Koa()
app.use(logger())
app.use(koaBody({
    multipart: true, // 支持文件上传
    encoding: 'gzip',
    formidable: {
        uploadDir: path.join(__dirname, 'upload/'), // 设置文件上传目录
        keepExtensions: true, // 保持文件的后缀
        maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
        onFileBegin: (name, file) => { // 文件上传前的设置
            console.log('name: ${name}');
            console.log(file);
        },
    }
}))

let root = new Router()
let home = new Router()

home.redirect('/', '/examples/homepage.html');
home.post('upload', async (ctx) => {
    console.log(ctx.request.files);
    console.log(ctx.request.body);
    ctx.body = JSON.stringify(ctx.request.files);

    // const file = ctx.request.files
    // console.log('file', file, ' ,filepath', file.path)
    // const reader = fs.createReadStream(file.path)
    // const ext = file.name.split('.').pop()
    // const upStream = fs.createWriteStream('d:/upload/' + Math.random().toString() + '.' + ext)
    // reader.pipe(upStream)

})

// home.get('upload', async (ctx) => {
//     return ctx.body = 'upload';
// })

root.use('/', home.routes(), home.allowedMethods)
app.use(root.routes()).use(root.allowedMethods())

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = '.'
var opts = {}
app.use(serve(
    path.join(__dirname, staticPath)
))

app.listen(3000, () => {
    console.log('[demo] static-use-middleware is starting at port 3000')
})