<template>
	<main>
		<div class="container">
			<!-- 头部 -->
			<div class="header">
				<h1>Glad to see you</h1>
				<h3>Login to continue using Wholesale</h3>
			</div>
			<!-- 表单 -->
			<a-form id="components-form-demo-normal-login" :form="form" class="login-form" @submit="handleSubmit" autocomplete="off">
				<div class="email">
					<h3>Email</h3>
				</div>
				<a-form-item>
					<a-input v-decorator="[
                'userName',
                { rules: [{ min: 4,message: '邮箱长度必须大于4位'}] },
              ]">
					</a-input>
				</a-form-item>
				<div class="password">
					<h3>Password</h3>
					<a href="" class="forgot">Fogot your password?</a>
				</div>
				<a-form-item>
					<a-input v-decorator="[
                'password',
                { rules: [{ min: 6,message: '密码长度必须大于6位'}] },
              ]"
					type="password">
					</a-input>
				</a-form-item>
				<a-form-item>
					<a-button type="primary" html-type="submit" class="login-form-button">
						<!-- @click="info" -->
						Login
					</a-button>
					<a-modal v-model="visible" title="BasicModal" @ok="handleOk">
						<p>登陆成功</p>
					</a-modal>
				</a-form-item>
			</a-form>
			<!-- 底部 -->
			<div class="footer">
				<h4>Having trouble logging in?</h4>
				<a href="#">Contact us</a>
			</div>
		</div>
	</main>
</template>

<script>
	export default {
		beforeCreate() {
			this.form = this.$form.createForm(this, {
				name: 'normal_login'
			});
		},
		data() {
			return {
				visible: false,
			};
		},
		methods: {
			// info() {
			//          this.$message.info('msg');
			//        },
			showModal() {
				this.visible = true;
			},
			handleOk() {
				this.visible = false;
			},
			handleSubmit(e) {
				e.preventDefault();
				this.form.validateFields((err, values) => {
					if (!err) {
						// console.log('Received values of form: ', values.userName);
						this.$axios({
								method: 'post',
								url: '/login',
								headers: {
									'Content-Type': "application/json"
								},
								data: {
									username: values.userName,
									password: values.passWord,
								}
							})
							.then(res => {
								if (res.data.code == 0) {
									// 成功弹出模态框
									this.visible = true;
								} else {
									// 失败弹出msg
									this.$message.destroy();
									this.$message.info(res.data.msg);
								}
								// this.visible = true;
							})
					}
				});
			},
		},
	};
</script>

<style>
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	main {
		width: 100vw;
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.container {
		width: 445px;
		height: 410px;
		/* width: 100%; */
		/* height: 100%; */
		border-radius: 5px;
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
		padding: 24px;
		font-size: 16px;
	}

	h1 {
		margin: 0;
		color: rgb(18, 25, 88);
		font-size: 26px;

	}

	h3 {
		margin: 0;
		display: inline-block;
		color: rgb(178, 175, 197);
	}

	h4 {
		display: inline-block;
	}

	#components-form-demo-normal-login .login-form {
		max-width: 300px;
	}

	#components-form-demo-normal-login .login-form-forgot {
		float: right;
	}

	#components-form-demo-normal-login .login-form-button {
		width: 100%;
	}

	.login-form {
		font-size: 16px;
	}

	.email {
		margin-top: 10px;
	}

	.password {
		position: relative;
	}

	.forgot {
		position: absolute;
		right: 0;
	}

	.login {
		width: 100%;
		height: 37px;
	}
</style>
