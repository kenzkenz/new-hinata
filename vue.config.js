//ビルドしたときパスを合わせる。
module.exports = {
    baseUrl: process.env.NODE_ENV === 'production'
        ? '/aaa/'
        : ''
}
