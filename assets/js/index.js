$(function(){
    // 调用getUserInfo获取用户基本信息
    getUserInfo()
    let layer = layui.layer

    $('#btnLogout').on('click',function(){
        layer.confirm('确定退出登录?',{icon:3,title:'提示'},function(index){
            // 将本地缓存的token消除
            localStorage.removeItem('token')
            //跳转到登录页
            location.href = '/login.html'

            // 关闭confirm询问框
            layer.close(indexx)
        })
    })
})
// 获取用户信息
function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        // headers:{
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success:(res) => {
           if(res.status !== 0){
               return layui.layer.msg('获取用户信息失败！')
           }
        //    调用renderAvatar渲染用户头像
           renderAvatar(res.data)
        },

        // // 无论成功还是失败，最终都会调用complete回调函数
        // complete:function(res){
        //     if(res.responseJSON.status ===1){
        //         // 强制消除本地存储的token
        //         localStorage.removeItem('token')
        //         // 强制跳转
        //         location.href='/login.html'
        //     }
        // }
    })
}

// 
function renderAvatar(user){
    // 获取用户名称
    let name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 按需渲染用户头像
    if(user.user_pic !== null){
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    }else{
        // 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}