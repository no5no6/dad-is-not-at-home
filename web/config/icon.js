/**
 * @file icon 构建相关配置
 * @author no5no6(work_yuanyang@163.com)
 */

const path = require('path');

module.exports = {

    // 前缀
    prefix: 'svg-',

    // 用户自定义的svg文件夹
    svgDir: path.resolve(__dirname, '../src/assets/svg')

    // ,
    // 项目中使用的fontawesome名
    // icons: [
    //     'envelope'
    // ]
};
