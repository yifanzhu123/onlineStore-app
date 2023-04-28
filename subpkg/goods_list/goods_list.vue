<template>
	<view>
		<view class="goods-list">
			<view v-for="(goods,i) in goodsList" :key="i" @click="gotoDetail(goods)">
				<my-goods :goods="goods"></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				 // 请求参数对象
				 queryObj:{
					 //查询关键字
					 query:'',
					 //商品分类Id
					 cid:'',
					 //页码值
					 pagenum:1,
					 //每页显示多少条数据
					 pagesize:10,
				 } ,
					//商品列表的数据
					 goodsList:[],
					 //总数量，用来实现分页
					 total:0,
					 //节流阀，判断是否正在请求数据
					 isloading:false,
					
			};
		},
		onLoad(options){
			//将页面参数转存到this.queryObj对象中
			this.queryObj.query=options.query||''
			this.queryObj.cid=options.cid||''
			this.getGoodsList()
			const goods_id=option.goods_id
			
		},
		methods:{
			async getGoodsList(cb){
				this.isloading=true
				const{data:res}=await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				this.isloading=false
				//数据请求完毕，就立即按需调用cb回调函数
				cb&&cb()
				
				if(res.meta.status!==200)return uni.$showMsg()
				//通过展开运算符的形式，进行新旧数据的拼接
				this.goodsList=[...this.goodsList,...res.message.goods]
				this.total=res.message.total
			},
			gotoDetail(goods){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id
				})
			},
			
		},
		onReachBottom() {
			//判断是否还有下一页数据
			if(this.queryObj.pagenum*this.queryObj.pagesize>=this.total)return uni.$showMsg('数据加载完毕！')
			//判断是否正在请求数据，如果是则直接返回不发起额外请求
			if(this.isloading)return
			//让页码值自增+1
			this.queryObj.pagenum+=1
			//重新获取列表数据
			this.getGoodsList()
		},
		onPullDownRefresh() {
			//重置数据
			this.queryObj.pagenum=1
			this.total=0
			this.isloading=false
			this.goodsList=[]
			//重新发起请求,传入cb回调函数，请求完数据后关闭下拉刷新
			this.getGoodsList(()=>uni.stopPullDownRefresh())
		}
	}
</script>

<style lang="scss">

</style>
