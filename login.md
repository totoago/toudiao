### login

- 加载
  - this.\$toast.loading({
    message:'登录'，
    forbidClick:true,
    duration:0
    })
  - 成功
    - this.\$toast.success('登录成功')
  - 失败 - this.\$toast.fail('登录失败')

> 表单验证

- submit 提交表单且验证通过后触发
- rules
  - required 是否为必选字段
  - pattern 通过正则表达式进行校验

> 验证码

- `native-type='button'`阻止表单提交
- `this.$refs.form 名.validate('name名')` 只验证手机号

> 倒计时

- format 展示样式
- finish 倒计时结束事件

```html
<van-count-down
  v-if="isdownshow"
  :time="60*1000"
  format="ss s"
  @finish="isdownshow=false"
/>
```

> 发送验证码

```js
export const send = mobile => {
  return request({
    method: 'get',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}
```

```html
try{ await sendsms(this.user.mobile) this.$toast('发送验证码成功') }catch(err){
if(err.response.status===429){ this.$toast('请输入正确手机号或验证码') }else{
this.$toast('发送太频繁，请稍等') } }
```

> token 存取

- `vuex`响应式+`localStotage`持久化
  - vuex state{
    user:window.localStorage.getItem('token')}
    - mutations:{
      setuser(state,data){
      state.user=data
      window.localDtorage.setItem('token',data)
      }
      }
- 初始化：本地存储数据
- 设置：存入本地

> 存数据

```js
export const setItem=(key,value)=>{
if(typeOf value==='object){
value=JSON.stringif(value)
}
window.localStorage.setItem(key,value)
}
```

> 读取

```js
export const getItem = key => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}
```

> 删除

```js
export const removeItem = key => {
  window.localStorage.removeItem(key)
}
```
