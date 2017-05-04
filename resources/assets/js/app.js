import Vue from 'vue'
import axios from 'axios'
import Paginate from 'vuejs-paginate'
Vue.component('paginate', Paginate)
var app = new Vue({
  el: '#app',
  data: {
  	rangeProduct: [
  		{ value : 50 , class: 'amount'},
  		{ value : 2000, class: 'amount2'}
  	],
  	
  	products: {},
  	provinces : {},
	province : '',
	cities: {},
	city: '',
	cityVisible: false,
	mainCategoryId: '',
	merchantCategoryId: '',
	merchantSubId: '',
	products: {}
	,
	productLastPage: 1,
	query: {
		fieldName: 'created_at',
		page: 1,
		from: '',
		to: '',
		per_page: 5,
		direction: 'asc',
	},
	sortBy: ['desc', 'asc']
	,
	chunk: 3,
	price_start: '',
	price_end: '',
	showNumberProducts: [10,15,20,25,30],
	windowLocation: window.location.origin + '/',
	loading: true,


  },
  
  created(){
  			this.clickCallback(1)
			this.fetchedProductData()
			this.products = this.products[0]

		},
		methods: {

			 clickCallback: function(pageNum) {
      			var vm = this
      			this.products = [
									{
										data: 

											[
												{ product: 
													[
														{ 
															photos: [
																{ is_primary: true},
																{ path: ''}
															] 
														},
														{ 
															prices: [
																{ is_primary: true},
																{ price: ''}
															] 
														}
													] 
												}
											]
										
									},
									{
										from: 0
									}


								]
      			this.query.page = pageNum
      			this.fetchedProductData()
      			this.loading = true
      			

      		},

			elementClick: function(e){

				alert(e.target)
			},

			isActive: function(num){

				if(this.query.page == num)
					alert(num)
			},
			changePage: function(num){

				this.query.page = num;
				this.fetchedProductData()
			},
			next(){

				if(this.products.next_page_url){

					this.query.page++
					this.fetchedProductData()

				}
			},
			prev(){

				if(this.products.prev_page_url){
					this.query.page--
					this.fetchedProductData()
				}
			},

			fetchedProductData(){
				var vm = this
				var pathArray = window.location.pathname.split( '/' );
					 
					switch (pathArray.length-2){
						case 2:
							this.mainCategoryId = pathArray[pathArray.length - 1]
							break

						case 3:
							this.merchantCategoryId = pathArray[pathArray.length - 1]
							break

						case 4:
							this.merchantSubId = pathArray[pathArray.length - 1]
							break
					}

				axios.get( this.windowLocation + '/api/products' + `?mainCategoryId=${this.mainCategoryId}&merchantCategoryId=${this.merchantCategoryId}&merchantSubId=${this.merchantSubId}&provCode=${this.province}&citymunCode=${this.city}&per_page=${this.query.per_page}&page=${this.query.page}&sortBy=${this.query.direction}&fieldName=${this.query.fieldName}`)
					.then(function(response){
						
						
						Vue.set(vm.$data, 'products', response.data.products)
						Vue.set(vm.$data, 'provinces', response.data.provinces)
						vm.$data.productLastPage = response.data.products.last_page
						Vue.set(vm.$data, 'loading', false)
						

					})
					.catch(function(response){
						console.log(response)
					})
			
			}

		},

		watch: {

			query: {

				handler: function(val, oldVal){

					this.fetchedProductData()
				},

				deep: true

			},

			province: function(){

				var vm = this
				this.loading = true;
				if(this.province != ''){

					axios.get(window.location.origin + '/api/cities/' + this.province)
					.then(function(response){

						Vue.set(vm.$data, 'cities', response.data.cities)
					})
					.catch( function(response){

						console.log(response)
					})

					this.cityVisible = true
				}

				else{
					this.cityVisible = false
				}

				this.fetchedProductData()

				
			},
			city: function(){
				
				this.loading = true;
				this.fetchedProductData()


				
			}
			
		}
})