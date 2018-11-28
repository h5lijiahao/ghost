var swiper = {
  refreshEnd: false,
    times:0,//加载次数
    oriSpeed:600,
    swiper: new Swiper('.swiperBox',{
      speed: this.oriSpeed,
      slidesPerView: 'auto',
      freeMode: true,
      direction: 'vertical',
      setWrapperSize: true,
      mousewheel: false,
      scrollbar: {
        el: '.swiper-scrollbar',
      },
		  on:{
        //下拉释放刷新
        touchEnd: function(){
          this.swiper=this
          refreshText=this.swiper.$el.find('.refresh')
          if(this.translate>100){console.log(this.translate)
            this.swiper.setTransition(this.params.speed);
            this.swiper.setTranslate(100);
            this.swiper.touchEventsData.isTouched=false;//跳过touchEnd事件后面的跳转(4.0.5)
            refreshText.html('刷新中')
            this.swiper.allowTouchMove=false;
            this.swiper.removeAllSlides();
            refreshText.html('刷新完成');
            this.refreshEnd=true;
            this.swiper.allowTouchMove=true;
            /*setTimeout(function(){//模仿AJAX
              this.swiper.removeAllSlides();
              for(i=0;i<10;i++){
                this.swiper.appendSlide('<div class="swiper-slide">New Slide'+(i+1)+'</div>');
                refreshText.html('刷新完成');
                this.refreshEnd=true;
                this.swiper.allowTouchMove=true;
              }
            },1000)*/
          }
        },
        touchStart: function(){
          if(this.refreshEnd==true){
            this.$el.find('.refresh').html('释放刷新');
            this.refreshEnd=false;
          }
        },
        //加载更多
        momentumBounce: function(){//非正式反弹回调函数，上拉释放加载更多可参考上例
          this.swiper=this
          
          if(this.swiper.translate<-100){
      
            this.swiper.allowTouchMove=false;//禁止触摸
            this.swiper.params.virtualTranslate=true;//定住不给回弹
            /*setTimeout(function(){//模仿AJAX
              for(m=0;m<10;m++){
                  this.swiper.appendSlide(`
                    <div class="swiper-slide container" v-for="item in list">
                      <div class="title">
                        <div class="fr" :id="item.link" @click="detail(item.link)"><a>详情&gt;&gt;</a></div>
                        <h3 v-cloak>{{item.title}}</h3>
                      </div>
                      <div class="content">
                        <div class="pic">
                          <img :src="item.img">
                        </div>
                        <div class="text" v-cloak>
                          {{item.desc}}
                        </div>
                      </div>
                      <div v-show="isShow" v-html="text" class="swiper-container detail">
                        <div class="swiper-wrapper">
                          <div class="swiper-slide">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            sequi velit recusandae! Ipsam, porro. Illum, sit vero.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  `);	
              }
              this.swiper.params.virtualTranslate=false;
              this.swiper.allowTouchMove= true;
              this.times++
            },1000)*/
            
          }
        }
      }
    }),
    swiperSon: new Swiper('.detail', {
      direction: 'vertical',
      slidesPerView: 'auto',
      freeMode: true,
      mousewheel: true,
      nested:true
    })
}