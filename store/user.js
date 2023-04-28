import myUserinfoVue from "../uni_modules/my-userinfo/components/my-userinfo/my-userinfo.vue"

export default{
	namespaced:true,
	
	state:()=>({
		address:JSON.parse(uni.getStorageSync('address')||'{}'),
		//登录成功之后的token字符串
		token:uni.getStorageSync('token')||'',
		//用户的基本信息
		userinfo:JSON.parse(uni.getStorageSync('userinfo')||'{}')
	}),
	
	mutations:{
		updateAddress(state,address){
			state.address=address
			this.commit('m_user/saveAddressToStorage')
		},
		saveAddressToStorage(state){
			uni.setStorageSync('address',JSON.stringify(state.address))
		},
		updateUserInfo(state,userinfo){
			state.userinfo=userinfo
			this.commit('m_user/saveUserInfoToStorage')
		},
		saveUserInfoToStorage(state){
			uni.setStorageSync('userinfo',JSON.stringify(state.userinfo))
		},
		updateToken(state,token){
			state.token=token
			this.commit('m_user/saveTokenToStorage')
		},
		saveTokenToStorage(state){
			uni.setStorageSync('token',state.token)
		}
	},
	getters:{
		addstr(state){
			if(!state.address.provinceName) return ''
			
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
		}
	}
}