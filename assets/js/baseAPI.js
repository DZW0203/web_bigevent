// 每次调用$.get(),$.post()或$.ajax()时
// 会先调用ajaxPrefilter（）这个函数
// 在这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options){
    // 在发送真正的ajax请求之前，统一拼接请求的根路径
    options.url = 'http://127.0.0.1:3007' + options.url

    // 统一为有权限的接口，设置headers请求头
    if(options.url.indexOf('/my') !==-1){
        options.headers = {
            Authorization:localStorage.getItem('token') || ''
        }
    }

    // 全局统一挂载complete回调函数
    options.complete= function(res){
        if(res.responseJSON.status ===1){
            // 强制消除本地存储的token
            localStorage.removeItem('token')
            // 强制跳转
            location.href='/login.html'
        }
    }
   
})