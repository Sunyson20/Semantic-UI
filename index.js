const Koa = require('koa')
const path = require('path')
const serve = require('koa-static')
const Router = require('koa-router')
const logger = require('koa-logger')
const koaBody = require('koa-body')
const os = require('os')

const app = new Koa()
app.use(logger())

app.use(
    koaBody({
        multipart: true,
        // formLimit: '1mb',
        // encoding: 'gzip',
        formidable: {
            uploadDir: path.join(__dirname,'upload/'), // 设置文件上传目录
            keepExtensions: true, // 保持文件的后缀
            onFileBegin: (name, file) => { // 文件上传前的设置
                console.log('fileBegin file.name: '+file.name)
                var targetFolder = path.dirname(file.path)
                file.path = path.join(targetFolder,file.name)
                console.log('new path: '+file.path)
            },
        },
        onError: function(error, ctx){
            console.log("Upload Error:", error)
            throw(error)
        },
    })
);


let root = new Router()
let home = new Router()

home.redirect('/', '/examples/homepage.html');
home.post('upload', async (ctx) => {
    console.log('files:', ctx.request.files);
    console.log('body:', ctx.request.body);
    ctx.body = JSON.stringify(ctx.request.files);

    // const file = ctx.request.files
    // console.log('file', file, ' ,filepath', file.path)
    // const reader = fs.createReadStream(file.path)
    // const ext = file.name.split('.').pop()
    // const upStream = fs.createWriteStream('d:/upload/' + Math.random().toString() + '.' + ext)
    // reader.pipe(upStream)

})


root.use('/', home.routes(), home.allowedMethods)
app.use(root.routes()).use(root.allowedMethods())

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = '.'
app.use(serve(
    path.join(__dirname, staticPath)
))

app.listen(3000, () => {
    console.log('[demo] static-use-middleware is starting at port 3000')
})