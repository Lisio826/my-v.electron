<template>
    <div class="loginDiv">
        <el-form :model="ruleForm" label-position="labelPosition" status-icon :rules="rules" ref="ruleForm"
                 label-width="100px" class="demo-ruleForm">
            <el-form-item label="姓名" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password" @keyup.enter="keyupEnter"></el-input> <!--autocomplete="off-->
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {JSEncrypt} from 'jsencrypt/bin/jsencrypt'

    export default {
        name: 'Login',
        data() {
            let validateUsername = (rule, value, cb) => {
                if (value === '') {
                    cb(new Error('请输入用户名'))
                } else {
                    // if (this.ruleForm.checkUsername !== '') {
                    //   this.$refs.ruleForm.validateField('checkUsername')
                    // }
                    cb()
                }
            }
            let validatePassword = (rule, value, cb) => {
                if (value === '') {
                    cb(new Error('请输入密码'))
                } else {
                    // if (this.ruleForm.checkPassword !== '') {
                    //   this.$refs.ruleForm.validateField('checkPassword')
                    // }
                    cb()
                }
            }
            return {
                labelPosition: 'right',
                ruleForm: {
                    password: '',
                    username: ''
                },
                rules: {
                    username: [
                        {validator: validateUsername, trigger: 'blur'}
                    ],
                    password: [
                        {validator: validatePassword, trigger: 'blur'}
                    ]
                }
            }
        },
        created(){
            this.keyupEnter()
        },
        methods: {
            keyupEnter(){
                document.onkeydown = e =>{
                    let body = document.getElementsByTagName('body')[0]
                    if (e.keyCode === 13) { //  e.target.baseURI.match(/inputbook/) &&  && e.target === body
                        this.submitForm('ruleForm')
                    }
                }
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.doLogin()
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            },
            encryptpub(v) {
//                 let pubK = `-----BEGIN PUBLIC KEY-----
// MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDn5Yn0vWX1Fr3OwbQWqHgRxG4N
// 6AHKU16Ad4+uy5vw7PSJRce6sR8cte0HW0KOv7nvl+bBBrs3gpMenUdkmN+HjkQB
// UlyKVfmFSNvoTpEcdn2vu2URjMoRCVEfza/ry9nI6MgsVHGZmOof/t1NofHVoLQk
// i55wN6/bNeOnBRGsXQIDAQAB
// -----END PUBLIC KEY-----`
                let pubK = `-----BEGIN PUBLIC KEY-----
                            MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCXrYqCy3fYvwoSNBZ9q0xc6EVx
                            lGTQWr9hm1hrpCCid1/C+kX2sZlT1YJo+IZ47KaY+tN+sEXujTugWT7BJzz44bv2
                            NUELZCEoNCsHpXsGJh0FzGcJSscg7W1ZBQmRcdHX/zhUNcOodnQIkfXw7ebqAHi2
                            B8mc3VwH8IqqwRLUuwIDAQAB
                            -----END PUBLIC KEY-----
                            `
                let en = new JSEncrypt()
                en.setPublicKey(pubK)
                return en.encrypt(v)
            },
            doLogin() {
                let param = {
                    userName: this.encryptpub(this.ruleForm.username),
                    userPwd: this.encryptpub(this.ruleForm.password)
                }
                // let fromparam = new FormData();
                // fromparam.append('userName', this.encryptpub(this.ruleForm.username));
                // fromparam.append('userPwd', this.encryptpub(this.ruleForm.password));
                // let header = {
                //     headers: {
                //         'Content-Type': 'multipart/form-data',
                //         'Accept': '*/*',
                //         'Accept-Language': 'zh-CN,zh;q=0.9',
                //     },
                // }
                this.PF('/login', param, {}).then((response) => {
                    let res = response.data
                    if (res.code === 0){
                        // alert("abc123")
                        this.jump("/operation")
                    }else{
                        this.$elementMessage(res.msg,"warning")
                    }
                }).catch(function (error) {
                    console.log(error)
                    this.$elementMessage('网络繁忙，请稍后再试',"error")
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .loginDiv {
        width: 400px;
    }
</style>
