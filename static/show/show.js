$(function () {
  var showPage = {
    initSwiper : function () {
      var rootSwiper = new Swiper('#root', {
        direction: 'vertical',
        speed: 600,
        spaceBetween: 0,
        onInit: function(swiper){
          swiperAnimateCache(swiper);
          swiperAnimate(swiper);
        },
        onSlideChangeEnd: function(swiper){
          swiperAnimate(swiper);
          // 下拉箭头是否展示
          if (swiper.activeIndex >= 1 && swiper.activeIndex < swiper.slides.length - 1) {
            $('#arrow').css({ 'display': 'block' });
          } else {
            $('#arrow').css({ 'display': 'none' });
          }

          /**
           * 具体到每个page的操作
           */
          if (swiper.activeIndex === 2) {
            $('#userCount').text('0');
            $('#compCount').text('0');
            $('#areaCount').text('0');
            setTimeout(function () {
              $('#userCount').countTo({
                from: 0,
                to: 3000,
                speed: 1000,
                refreshInterval: 50
              });
              $('#compCount').countTo({
                from: 0,
                to: 500,
                speed: 1000,
                refreshInterval: 50
              });
              $('#areaCount').countTo({
                from: 0,
                to: 34,
                speed: 1000,
                refreshInterval: 50
              });
            }, 200)
          }

          if (swiper.activeIndex === 3) {
            if (!window.historySwiper) {
              var historySwiper = new Swiper('#historySwiperContainer', {
                slidesPerView: 'auto',
                centeredSlides: true,
                spaceBetween: 50,
                autoplay: 3000,
                autoplayDisableOnInteraction: false,
                onInit: function () {
                  var str = '';
                  showPage.historyData['data2019'].list.forEach(function (item) {
                    str += '<li class="info-item"><h4>' + item.title + '</h4><p>' + item.content + '</p></li>';
                  });
                  str += '<li class="info-item"><p class="dot">......</p></li>';
                  $('#historyInfoContainer').html(str)
                },
                onSlideChangeEnd: function (hSwiper){
                  var key = hSwiper.slides[hSwiper.activeIndex].childNodes[0].attributes['ql-item-key'].value;
                  if (key) {
                    var currentData = showPage.historyData['data' + key];
                    var str = '';
                    currentData.list.forEach(function (item) {
                      str += '<li class="info-item"><h4>' + item.title + '</h4><p>' + item.content + '</p></li>';
                    });
                    if (String(key) === '2019') {
                      str += '<li class="info-item"><p class="dot">......</p></li>';
                    }
                    $('#historyInfoContainer').html(str)
                  }
                },
                onTap: function (hSwiper) {
                  hSwiper.slideTo(hSwiper.clickedIndex);
                }
              });
              window.historySwiper = historySwiper;
            }
          }

          if (swiper.activeIndex === 4) {
            if (!window.honorSwiper) {
              var honorSwiper = new Swiper('#honorSwiperContainer', {
                slidesPerView: 'auto',
                centeredSlides: true,
                spaceBetween: 0,
                autoplay: 3000,
                autoplayDisableOnInteraction: false,
                loop: true,
                onTap: function (hSwiper) {
                  hSwiper.slideTo(hSwiper.clickedIndex);
                }
              });
              window.honorSwiper = honorSwiper;
            }
          }
        },
        onTransitionEnd: function(swiper){
          swiperAnimate(swiper);
        },
      });
      window.rootSwiper = rootSwiper;
    },
    bindHandler: function () {
      $('#arrow').on('click', function () {
        window.rootSwiper.slideNext();
      });
      $('#page-index-btn').on('click', function () {
        window.rootSwiper.slideNext();
      })
    },
    getFinal : function () {
      var oldUrl = window.location.href;
      var arr = (oldUrl.substring(oldUrl.lastIndexOf('?') + 1, oldUrl.length)).split('&');
      var obj = {};
      for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].split('=');
        obj[arr[i][0]] = arr[i][1];
      }
      return obj;
    },
    // 初始化
    init : function () {
      this.initSwiper();
      this.bindHandler();
    },
    historyData: {
      'data2019': {
        activeImg: '/img/show/2019active.png',
        normalImg: '/img/show/2019normal.png',
        list: [
          { title: '1月', content: '旗下产品累计用户数突破3000万'},
          { title: '3月', content: '荣获浙江省创新企业百强' },
        ]
      },
      'data2018': {
        activeImg: '/img/show/2018active.png',
        normalImg: '/img/show/2018normal.png',
        list: [
          { title: '1月', content: '钱粒科技三周年庆典暨品牌发布会，布局新金融'},
          { title: '4月', content: '荣获浙江省软件行业协会“双软”企业认证' },
          { title: '11月', content: '当选浙江省人工智能学会常务理事单位' },
        ]
      },
      'data2017': {
        activeImg: '/img/show/2017active.png',
        normalImg: '/img/show/2017normal.png',
        list: [
          { title: '7月', content: '当选浙江省大数据科技协会副会长单位'},
          { title: '11月', content: '核心产品分期管家升级为钱粒账单\n云兔科技正式更名为浙江钱粒科技有限公司\n荣获国家高新技术企业认证' },
          { title: '12月', content: '钱粒科技旗下产品累计撮合资金总量超过100亿元' },
        ]
      },
      'data2016': {
        activeImg: '/img/show/2016active.png',
        normalImg: '/img/show/2016normal.png',
        list: [
          { title: '1月', content: '旗下产品累计注册用户数突破100万'},
          { title: '4月', content: '获得51信用卡和蛮子基金千万级A轮融资' },
        ]
      },
      'data2015': {
        activeImg: '/img/show/2015active.png',
        normalImg: '/img/show/2015normal.png',
        list: [
          { title: '1月', content: '杭州云兔科技有限公司（钱粒科技前身）正式成立'},
          { title: '3月', content: '获得薛蛮子和盈动资本数百万元天使投资' },
        ]
      },
    }
  };
  showPage.init();
});