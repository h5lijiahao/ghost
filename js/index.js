Vue.config.productionTip = false
var app = new Vue({
  el:".app",
  data:{
    id:'',
    page:1,  //共563页
    text:'',
    isShow:false,
    list:[],
  },
  mounted(){
    if(this.list == ''){
      let url="https://route.showapi.com/955-1?showapi_appid=80127&showapi_sign=0cc85f1b0d304a33926e01e888949822&type=dp&page="
        + this.page
      this.$http.get(url).then(result => {
        this.list = result.body.showapi_res_body.pagebean.contentlist
      })
    }
    window.addEventListener('scroll',this.handleScroll)
    window.addEventListener('click', (e)=> {
      if ((e.target.nodeName != 'P') && (e.target.className != 'detailClick')) {
        this.isShow = false;
      }
    })
    
  },
  methods:{
    detail(id){
      this.list.findIndex(item => {
        this.id = item.link
        if(this.id==id){
            return true;
        }
      });
      this.isShow = !this.isShow
      //console.log(this.id)
      let url = "https://route.showapi.com/955-2?showapi_appid=80127&showapi_sign=0cc85f1b0d304a33926e01e888949822&id="
       + this.id
      this.$http.get(url).then(result => {
        this.text = result.body.showapi_res_body.text
      })
    },
    loadMore(){
        let url="https://route.showapi.com/955-1?showapi_appid=80127&showapi_sign=0cc85f1b0d304a33926e01e888949822&type=dp&page="
          + (++this.page)
        this.$http.get(url).then(result => {
            var moreData = result.body.showapi_res_body.pagebean.contentlist
            for(let i=0;i<moreData.length;i++){
              this.list.push(moreData[i])
            }
            //console.log(this.list)
        })
    },
    handleScroll(){
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
      let pHeight = document.documentElement.scrollHeight || this.$refs.page.offsetHeight
      let viewHeight = document.documentElement.clientHeight || document.body.clientHeight
      //console.log(pHeight,viewHeight)
      if(pHeight-viewHeight-scrollTop <= 50 ){
        this.loadMore()
      }
    }
  }
})
