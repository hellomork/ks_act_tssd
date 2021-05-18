<template>
  <div class="whole">
    <!-- pc -->
    <div class="pc_award" v-if="!isMobile">
      <headbg></headbg>
      <pcnav :navNum="navNum"></pcnav>
      <div class="contain">
        <div class="act-container">
          <!-- 获奖名次 -->
          <!-- 特别大奖 -->
          <div class="firstprice">
            <div class="cover">
              <div class="picc">
              </div>
            </div>
            <div class="getprice">
              <ul>
                <li>序号</li>
                <li>编号</li>
                <li>作品名称</li>
                <li>作者</li>
                <!-- <li>票数</li> -->
              </ul>
              <div class="dd">
                <ul>
                  <li style="width:208px">1</li>
                  <li style="width:208px">#2181</li>
                  <li style="width:409px">《托举希望》</li>
                  <li  style="width:209px">王军</li>
                  <!-- <li>123213</li> -->
                </ul>
              </div>
            </div>
          </div>
          <!-- 金奖 -->
          <div class="firstprice pricetwo">
            <div class="cover">
              <!-- <img src="@/assets/img/hzcat/img_title.png" alt=""> -->
              <div class="picc1">

              </div>
            </div>
            <div class="getprice">
              <div class="getprice">
              <ul>
                <li>序号</li>
                <li>编号</li>
                <li>作品名称</li>
                <li>作者</li>
                <!-- <li>票数</li> -->
              </ul>
              <div class="dd">
                <ul>
                  <li style="width:208px">1</li>
                  <li style="width:208px">#2674</li>
                  <li style="width:409px">《老哥，秋雨下不停啊！小雀与鸳鸯的对话》</li>
                  <li  style="width:209px">————</li>
                  <!-- <li>123213</li> -->
                </ul>
              </div>
            </div>
            </div>
          </div>
          <!-- 银奖 -->
          <div class="firstprice pricethree">
            <div class="cover">
              <!-- <img src="@/assets/img/hzcat/img_title.png" alt=""> -->
              <div class="picc2">
              </div>
            </div>
            <div class="getprice">
             <div class="getprice">
              <ul>
                <li>序号</li>
                <li>编号</li>
                <li>作品名称</li>
                <li>作者</li>
                <!-- <li>票数</li> -->
              </ul>
              <div class="dd">
                <ul>
                  <li style="width:208px">1</li>
                  <li style="width:208px">#2029</li>
                  <li style="width:409px">《最美人墙》</li>
                  <li  style="width:209px">————</li>
                  <!-- <li>123213</li> -->
                </ul>
                <ul>
                  <li style="width:208px">2</li>
                  <li style="width:208px">#3338</li>
                  <li style="width:409px">《声声入耳》</li>
                  <li  style="width:209px">王荣贵</li>
                  <!-- <li>123213</li> -->
                </ul>
                <ul>
                  <li style="width:208px">3</li>
                  <li style="width:208px">#5547</li>
                  <li style="width:409px">《2020年，村播元年》（组照）</li>
                  <li  style="width:209px">廖峥艳</li>
                  <!-- <li>123213</li> -->
                </ul>
              </div>
            </div>
            </div>
          </div>
          <!-- 铜奖 -->
          <div class="firstprice pricethree" style="margin-top: 150px;">
            <div class="cover">
              <!-- <img src="@/assets/img/hzcat/img_title.png" alt=""> -->
              <div class="picc3">
              </div>
            </div>
            <div class="getprice">
             <div class="getprice">
              <ul>
                <li>序号</li>
                <li>编号</li>
                <li>作品名称</li>
                <li>作者</li>
                <!-- <li>票数</li> -->
              </ul>
              <div class="dd">
                <ul>
                  <li style="width:208px">1</li>
                  <li style="width:208px">#815</li>
                  <li style="width:409px">《齐心协力上演生死救援》（组照）</li>
                  <li  style="width:209px">马荣壮 张引</li>
                  <!-- <li>123213</li> -->
                </ul>
                <ul>
                  <li style="width:208px">2</li>
                  <li style="width:208px">#759</li>
                  <li style="width:409px">《33年西湖姐弟情》</li>
                  <li  style="width:209px">黄衍农</li>
                  <!-- <li>123213</li> -->
                </ul>
                <ul>
                  <li style="width:208px">3</li>
                  <li style="width:208px">#3333</li>
                  <li style="width:409px">《手机加油站》</li>
                  <li  style="width:209px">阮晓</li>
                  <!-- <li>123213</li> -->
                </ul>
                <ul>
                  <li style="width:208px">4</li>
                  <li style="width:208px">#5161</li>
                  <li style="width:409px">《厉害的外卖小哥》</li>
                  <li  style="width:209px">钱银荣</li>
                  <!-- <li>123213</li> -->
                </ul>
                <ul>
                  <li style="width:208px">5</li>
                  <li style="width:208px">#6632</li>
                  <li style="width:409px">《妈妈回来了》</li>
                  <li  style="width:209px">李洪新</li>
                  <!-- <li>123213</li> -->
                </ul>
                <ul>
                  <li style="width:208px">6</li>
                  <li style="width:208px">#8090</li>
                  <li style="width:409px">《“好八连”上街》</li>
                  <li  style="width:209px">周琤</li>
                  <!-- <li>123213</li> -->
                </ul>
                <ul>
                  <li style="width:208px">7</li>
                  <li style="width:208px">#3565</li>
                  <li style="width:409px">《向前》</li>
                  <li  style="width:209px">阮晓</li>
                  <!-- <li>123213</li> -->
                </ul>
                <ul>
                  <li style="width:208px">8</li>
                  <li style="width:208px">#8452</li>
                  <li style="width:409px">《休闲市民》</li>
                  <li  style="width:209px">孙新尖</li>
                  <!-- <li>123213</li> -->
                </ul>
              </div>
            </div>
            </div>
          </div>
          <!-- 佳作奖 -->
          <div class="firstprice pricethree" style="margin-top: 420px;">
            <div class="cover">
              <!-- <img src="@/assets/img/hzcat/img_title.png" alt=""> -->
              <div class="picc4">
              </div>
            </div>
            <div class="getprice">
             <div class="getprice">
              <ul>
                <li>序号</li>
                <li>编号</li>
                <li>作品名称</li>
                <li>作者</li>
                <!-- <li>票数</li> -->
              </ul>
              <div class="dd">
                <ul>
                  <li style="width:208px">1</li>
                  <li style="width:208px">#8264</li>
                  <li style="width:409px">《斯马特后备箱集市》（组图）</li>
                  <li  style="width:209px">孙新尖</li>
                  <!-- <li>123213</li> -->
                </ul>
                <ul>
                  <li style="width:208px">2</li>
                  <li style="width:208px">#2915</li>
                  <li style="width:409px">《观战》</li>
                  <li  style="width:209px">————</li>
                  <!-- <li>123213</li> -->
                </ul>
                <ul>
                  <li style="width:208px">3</li>
                  <li style="width:208px">#3118</li>
                  <li style="width:409px">《旅游警察湖滨宣传防诈骗》</li>
                  <li  style="width:209px">————</li>
                  <!-- <li>123213</li> -->
                </ul>
                <ul>
                  <li style="width:208px">4</li>
                  <li style="width:208px">#3324</li>
                  <li style="width:409px">《过马路》</li>
                  <li  style="width:209px">韩盛</li>
                  <!-- <li>123213</li> -->
                </ul>
                <ul>
                  <li style="width:208px">5</li>
                  <li style="width:208px">#5193</li>
                  <li style="width:409px">《齐心协力把盐收》</li>
                  <li  style="width:209px">边少卿</li>
                  <!-- <li>123213</li> -->
                </ul>
                <ul>
                  <li style="width:208px">6</li>
                  <li style="width:208px">#5197</li>
                  <li style="width:409px">《清凉消暑嗨翻天》</li>
                  <li  style="width:209px">————</li>
                  <!-- <li>123213</li> -->
                </ul>
                <ul>
                  <li style="width:208px">7</li>
                  <li style="width:208px">#5350</li>
                  <li style="width:409px">《回家的讯息》</li>
                  <li  style="width:209px">吴韶辉</li>
                  <!-- <li>123213</li> -->
                </ul>
                <ul>
                  <li style="width:208px">8</li>
                  <li style="width:208px">#5452</li>
                  <li style="width:409px">《展示》</li>
                  <li  style="width:209px">李武</li>
                  <!-- <li>123213</li> -->
                </ul>
                <ul>
                  <li style="width:208px">9</li>
                  <li style="width:208px">#5610</li>
                  <li style="width:409px">《翡翠湖中一滴泪》</li>
                  <li  style="width:209px">————</li>
                  <!-- <li>123213</li> -->
                </ul>
                <ul>
                  <li style="width:208px">10</li>
                  <li style="width:208px">#5745</li>
                  <li style="width:409px">《骑行风景中》</li>
                  <li  style="width:209px">王建才</li>
                  <!-- <li>123213</li> -->
                </ul>
                <ul>
                  <li style="width:208px">11</li>
                  <li style="width:208px">#5787</li>
                  <li style="width:409px">《晨练遛鸟两不误》</li>
                  <li  style="width:209px">————</li>
                  <!-- <li>123213</li> -->
                </ul>
                <ul>
                  <li style="width:208px">12</li>
                  <li style="width:208px">#5840</li>
                  <li style="width:409px">《吊起太阳的人们》</li>
                  <li  style="width:209px">林志刚</li>
                  <!-- <li>123213</li> -->
                </ul>
                <ul>
                  <li style="width:208px">13</li>
                  <li style="width:208px">#6102</li>
                  <li style="width:409px">《御街百工》</li>
                  <li  style="width:209px">————</li>
                  <!-- <li>123213</li> -->
                </ul>
                <ul>
                  <li style="width:208px">14</li>
                  <li style="width:208px">#6323</li>
                  <li style="width:409px">《姊妹摊》</li>
                  <li  style="width:209px">樊豹声</li>
                  <!-- <li>123213</li> -->
                </ul>
                <ul>
                  <li style="width:208px">15</li>
                  <li style="width:208px">#6328</li>
                  <li style="width:409px">《“我们终于毕业啦！”》</li>
                  <li  style="width:209px">时乐</li>
                  <!-- <li>123213</li> -->
                </ul>
                <ul>
                  <li style="width:208px">16</li>
                  <li style="width:208px">#6796</li>
                  <li style="width:409px">《地摊经济》</li>
                  <li  style="width:209px">李泽浩</li>
                  <!-- <li>123213</li> -->
                </ul>
                <ul>
                  <li style="width:208px">17</li>
                  <li style="width:208px">#6810</li>
                  <li style="width:409px">《洪涝灾区大营救》</li>
                  <li  style="width:209px">赵洪亮</li>
                  <!-- <li>123213</li> -->
                </ul>
                <ul>
                  <li style="width:208px">18</li>
                  <li style="width:208px">#7166</li>
                  <li style="width:409px">《引导》</li>
                  <li  style="width:209px">————</li>
                  <!-- <li>123213</li> -->
                </ul>
                <ul>
                  <li style="width:208px">19</li>
                  <li style="width:208px">#7306</li>
                  <li style="width:409px">《天坛绝活秀》</li>
                  <li  style="width:209px">袁奕</li>
                  <!-- <li>123213</li> -->
                </ul>
                <ul>
                  <li style="width:208px">20</li>
                  <li style="width:208px">#7857</li>
                  <li style="width:409px">《团聚》</li>
                  <li  style="width:209px">闫雨婷</li>
                  <!-- <li>123213</li> -->
                </ul>
                <ul>
                  <li style="width:208px">21</li>
                  <li style="width:208px">#7978</li>
                  <li style="width:409px">《断桥上再次见证了爱的力度》</li>
                  <li  style="width:209px">————</li>
                  <!-- <li>123213</li> -->
                </ul>
                <ul>
                  <li style="width:208px">22</li>
                  <li style="width:208px">#8014</li>
                  <li style="width:409px">《对话》</li>
                  <li  style="width:209px">宋义勇</li>
                  <!-- <li>123213</li> -->
                </ul>
                <ul>
                  <li style="width:208px">23</li>
                  <li style="width:208px">#8021</li>
                  <li style="width:409px">《建设者之歌》</li>
                  <li  style="width:209px">宋义勇</li>
                  <!-- <li>123213</li> -->
                </ul>
                <ul>
                  <li style="width:208px">24</li>
                  <li style="width:208px">#6326</li>
                  <li style="width:409px">《幸福时刻》</li>
                  <li  style="width:209px">樊豹声</li>
                  <!-- <li>123213</li> -->
                </ul>
                <ul>
                  <li style="width:208px">25</li>
                  <li style="width:208px">#8314</li>
                  <li style="width:409px">《井然有序》</li>
                  <li  style="width:209px">————</li>
                  <!-- <li>123213</li> -->
                </ul>
                <ul>
                  <li style="width:208px">26</li>
                  <li style="width:208px">#8357</li>
                  <li style="width:409px">《玻璃桥云雾》</li>
                  <li  style="width:209px">孙新尖</li>
                  <!-- <li>123213</li> -->
                </ul>
                <ul>
                  <li style="width:208px">27</li>
                  <li style="width:208px">#8383</li>
                  <li style="width:409px">《雨后晨跑》</li>
                  <li  style="width:209px">————</li>
                  <!-- <li>123213</li> -->
                </ul>
                <ul>
                  <li style="width:208px">28</li>
                  <li style="width:208px">#8608</li>
                  <li style="width:409px">《快乐的肥皂泡》</li>
                  <li  style="width:209px">————</li>
                  <!-- <li>123213</li> -->
                </ul>
                <ul>
                  <li style="width:208px">29</li>
                  <li style="width:208px">#8658</li>
                  <li style="width:409px">《妈妈的高跟鞋》</li>
                  <li  style="width:209px">————</li>
                  <!-- <li>123213</li> -->
                </ul>
                <ul>
                  <li style="width:208px">30</li>
                  <li style="width:208px">#8699</li>
                  <li style="width:409px">《谁跑得快》</li>
                  <li  style="width:209px">————</li>
                  <!-- <li>123213</li> -->
                </ul>
              </div>
            </div>
            </div>
          </div>
          <!-- 网络人气奖 -->
          <div class="firstprice pricethree" style="margin-top: 1600px;">
            <div class="cover">
              <!-- <img src="@/assets/img/hzcat/img_title.png" alt=""> -->
              <div class="picc5">
              </div>
            </div>
            <div class="getprice">
             <div class="getprice">
              <ul>
                <li>序号</li>
                <li>编号</li>
                <li>作品名称</li>
                <li>作者</li>
                <li>票数</li>
              </ul>
              <div class="dd">
                <ul>
                  <li>1</li>
                  <li>#1633</li>
                  <li>《亚洲美食在杭州》</li>
                  <li>汪锡刚</li>
                  <li>21763</li>
                </ul>
                <ul>
                  <li>2</li>
                  <li>#4218</li>
                  <li>《巧遇古桥旗袍秀》</li>
                  <li>鲁忠道</li>
                  <li>17478</li>
                </ul>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="wx_award" v-if="isMobile">
      <wxheadbg></wxheadbg>
      <wxnav :navNum="navNum"></wxnav>
      <div class="result_view">
        <!-- 特别大奖 -->
        <div class="special">
          <div class="title_head">
            <img src="@/assets/imgwx/hzmovie/title_special.png" alt="">
          </div>
          <div class="againresult">
            <ul class="tit">
              <!-- <li class="tit1">序号</li>
              <li class="tit1">编号</li>
              <li class="tit1">作品名称</li>
              <li class="tit1">作者</li> -->
              <!-- <li>票数</li> -->
              <li>
                <span>序号</span><!--
                --><span style="width:1.5rem">编号</span><!--
                --><span style="width:6rem">作品名称</span><!--
                --><span style="width:1.5rem">作者</span>
              </li>
              <div class="dd">
                <ul>
                  <li>
                    <span>1</span><!--
                    --><span style="width:1.5rem">#2181</span><!--
                    --><span style="width:6rem">《托举希望》</span><!--
                    --><span  style="width:1.5rem">王军</span>
                  </li>
                </ul>
              </div>
            </ul>
          </div>
        </div>
        <!-- 金奖 -->
        <div class="special">
          <div class="title_head">
            <img src="@/assets/imgwx/hzmovie/title_jin.png" alt="">
          </div>
          <div class="againresult">
            <ul class="tit">
              <!-- <li class="tit1">序号</li>
              <li class="tit1">编号</li>
              <li class="tit1">作品名称</li>
              <li class="tit1">作者</li> -->
              <!-- <li>票数</li> -->
              <li>
                <span>序号</span><!--
                --><span style="width:1.5rem">编号</span><!--
                --><span style="width:6rem">作品名称</span><!--
                --><span style="width:1.5rem">作者</span>
              </li>
              <div class="dd">
                <ul>
                  <li>
                    <span>1</span><!--
                    --><span style="width:1.5rem">#2674</span><!--
                    --><span style="width:6rem">《老哥，秋雨下不停啊！小雀与鸳鸯的对话》</span><!--
                    --><span  style="width:1.5rem">————</span>
                  </li>
                </ul>
              </div>
            </ul>
          </div>
        </div>
        <!-- 银奖 -->
        <div class="special">
          <div class="title_head">
            <img src="@/assets/imgwx/hzmovie/title_yin.png" alt="">
          </div>
          <div class="againresult">
            <ul class="tit">
              <!-- <li class="tit1">序号</li>
              <li class="tit1">编号</li>
              <li class="tit1">作品名称</li>
              <li class="tit1">作者</li> -->
              <!-- <li>票数</li> -->
              <li>
                <span>序号</span><!--
                --><span style="width:1.5rem">编号</span><!--
                --><span style="width:6rem">作品名称</span><!--
                --><span style="width:1.5rem">作者</span>
              </li>
              <div class="dd">
                <ul>
                  <li>
                    <span>1</span><!--
                    --><span style="width:1.5rem">#2029</span><!--
                    --><span style="width:6rem">《最美人墙》</span><!--
                    --><span  style="width:1.5rem">————</span>
                  </li>
                </ul>
                <ul>
                  <li>
                    <span>2</span><!--
                    --><span style="width:1.5rem">#3338</span><!--
                    --><span style="width:6rem">《声声入耳》</span><!--
                    --><span  style="width:1.5rem">王荣贵</span>
                  </li>
                </ul>
                 <ul>
                  <li>
                    <span>3</span><!--
                    --><span style="width:1.5rem">#5547</span><!--
                    --><span style="width:6rem">《2020年，村播元年》（组照）</span><!--
                    --><span  style="width:1.5rem">廖峥艳</span>
                  </li>
                </ul>
              </div>
            </ul>
          </div>
        </div>
        <!-- 铜奖 -->
        <div class="special">
          <div class="title_head">
            <img src="@/assets/imgwx/hzmovie/title_tong.png" alt="">
          </div>
            <div class="againresult">
            <ul class="tit">
              <!-- <li class="tit1">序号</li>
              <li class="tit1">编号</li>
              <li class="tit1">作品名称</li>
              <li class="tit1">作者</li> -->
              <!-- <li>票数</li> -->
              <li>
                <span>序号</span><!--
                --><span style="width:1.5rem">编号</span><!--
                --><span style="width:6rem">作品名称</span><!--
                --><span style="width:1.5rem">作者</span>
              </li>
              <div class="dd">
                <ul>
                  <li>
                    <span>1</span><!--
                    --><span style="width:1.5rem">#815</span><!--
                    --><span style="width:6rem">《齐心协力上演生死救援》（组照）</span><!--
                    --><span  style="width:1.5rem">马荣壮 张引</span>
                  </li>
                </ul>
                <ul>
                  <li>
                    <span>2</span><!--
                    --><span style="width:1.5rem">#759</span><!--
                    --><span style="width:6rem">《33年西湖姐弟情》</span><!--
                    --><span  style="width:1.5rem">黄衍农</span>
                  </li>
                </ul>
                 <ul>
                  <li>
                    <span>3</span><!--
                    --><span style="width:1.5rem">#3333</span><!--
                    --><span style="width:6rem">《手机加油站》</span><!--
                    --><span  style="width:1.5rem">阮晓</span>
                  </li>
                </ul>
                <ul>
                  <li>
                    <span>4</span><!--
                    --><span style="width:1.5rem">#5161</span><!--
                    --><span style="width:6rem">《厉害的外卖小哥》</span><!--
                    --><span  style="width:1.5rem">钱银荣</span>
                  </li>
                </ul>
                  <ul>
                  <li>
                    <span>5</span><!--
                    --><span style="width:1.5rem">#6632</span><!--
                    --><span style="width:6rem">《妈妈回来了》</span><!--
                    --><span  style="width:1.5rem">李洪新</span>
                  </li>
                </ul>
                      <ul>
                  <li>
                    <span>6</span><!--
                    --><span style="width:1.5rem">#8090</span><!--
                    --><span style="width:6rem">《“好八连”上街》</span><!--
                    --><span  style="width:1.5rem">周琤</span>
                  </li>
                </ul>
                <ul>
                  <li>
                    <span>7</span><!--
                    --><span style="width:1.5rem">#3565</span><!--
                    --><span style="width:6rem">《向前》</span><!--
                    --><span  style="width:1.5rem">阮晓</span>
                  </li>
                </ul>
                <ul>
                  <li>
                    <span>8</span><!--
                    --><span style="width:1.5rem">#8452</span><!--
                    --><span style="width:6rem">《休闲市民》</span><!--
                    --><span  style="width:1.5rem">孙新尖</span>
                  </li>
                </ul>
              </div>
            </ul>
          </div>
        </div>
        <!-- 佳作奖 -->
        <div class="special">
          <div class="title_head">
            <img src="@/assets/imgwx/hzmovie/title_jiazuo.png" alt="">
          </div>
          <div class="againresult">
            <ul class="tit">
              <!-- <li class="tit1">序号</li>
              <li class="tit1">编号</li>
              <li class="tit1">作品名称</li>
              <li class="tit1">作者</li> -->
              <!-- <li>票数</li> -->
              <li>
                <span>序号</span><!--
                --><span style="width:1.5rem">编号</span><!--
                --><span style="width:6rem">作品名称</span><!--
                --><span style="width:1.5rem">作者</span>
              </li>
              <div class="dd">
                <ul>
                  <li>
                    <span>1</span><!--
                    --><span style="width:1.5rem">#8264</span><!--
                    --><span style="width:6rem">《斯马特后备箱集市》（组图）</span><!--
                    --><span  style="width:1.5rem">孙新尖</span>
                  </li>
                </ul>
                <ul>
                  <li>
                    <span>2</span><!--
                    --><span style="width:1.5rem">#2915</span><!--
                    --><span style="width:6rem">《观战》</span><!--
                    --><span  style="width:1.5rem">————</span>
                  </li>
                </ul>
                 <ul>
                  <li>
                    <span>3</span><!--
                    --><span style="width:1.5rem">#3118</span><!--
                    --><span style="width:6rem">《旅游警察湖滨宣传防诈骗》</span><!--
                    --><span  style="width:1.5rem">————</span>
                  </li>
                </ul>
                <ul>
                  <li>
                    <span>4</span><!--
                    --><span style="width:1.5rem">#3324</span><!--
                    --><span style="width:6rem">《过马路》</span><!--
                    --><span  style="width:1.5rem">韩盛</span>
                  </li>
                </ul>
                  <ul>
                  <li>
                    <span>5</span><!--
                    --><span style="width:1.5rem">#5193</span><!--
                    --><span style="width:6rem">《齐心协力把盐收》</span><!--
                    --><span  style="width:1.5rem">边少卿</span>
                  </li>
                </ul>
                      <ul>
                  <li>
                    <span>6</span><!--
                    --><span style="width:1.5rem">#5197</span><!--
                    --><span style="width:6rem">《清凉消暑嗨翻天》</span><!--
                    --><span  style="width:1.5rem">————</span>
                  </li>
                </ul>
                <ul>
                  <li>
                    <span>7</span><!--
                    --><span style="width:1.5rem">#5350</span><!--
                    --><span style="width:6rem">《回家的讯息》</span><!--
                    --><span  style="width:1.5rem">吴韶辉</span>
                  </li>
                </ul>
                <ul>
                  <li>
                    <span>8</span><!--
                    --><span style="width:1.5rem">#5452</span><!--
                    --><span style="width:6rem">《展示》</span><!--
                    --><span  style="width:1.5rem">李武</span>
                  </li>
                </ul>
                <ul>
                  <li>
                    <span>9</span><!--
                    --><span style="width:1.5rem">#5610</span><!--
                    --><span style="width:6rem">《翡翠湖中一滴泪》</span><!--
                    --><span  style="width:1.5rem">————</span>
                  </li>
                </ul>
                <ul>
                  <li>
                    <span>10</span><!--
                    --><span style="width:1.5rem">#5745</span><!--
                    --><span style="width:6rem">《骑行风景中》</span><!--
                    --><span  style="width:1.5rem">王建才</span>
                  </li>
                </ul>
                 <ul>
                  <li>
                    <span>11</span><!--
                    --><span style="width:1.5rem">#5787</span><!--
                    --><span style="width:6rem">《晨练遛鸟两不误》</span><!--
                    --><span  style="width:1.5rem">————</span>
                  </li>
                </ul>
                                <ul>
                  <li>
                    <span>12</span><!--
                    --><span style="width:1.5rem">#5840</span><!--
                    --><span style="width:6rem">《吊起太阳的人们》</span><!--
                    --><span  style="width:1.5rem">林志刚</span>
                  </li>
                </ul>
                                <ul>
                  <li>
                    <span>13</span><!--
                    --><span style="width:1.5rem">#6102</span><!--
                    --><span style="width:6rem">《御街百工》</span><!--
                    --><span  style="width:1.5rem">————</span>
                  </li>
                </ul>
                                <ul>
                  <li>
                    <span>14</span><!--
                    --><span style="width:1.5rem">#6323</span><!--
                    --><span style="width:6rem">《姊妹摊》</span><!--
                    --><span  style="width:1.5rem">樊豹声</span>
                  </li>
                </ul>

                                <ul>
                  <li>
                    <span>15</span><!--
                    --><span style="width:1.5rem">#6328</span><!--
                    --><span style="width:6rem">《“我们终于毕业啦！”》</span><!--
                    --><span  style="width:1.5rem">时乐</span>
                  </li>
                </ul>
                                <ul>
                  <li>
                    <span>16</span><!--
                    --><span style="width:1.5rem">#6796</span><!--
                    --><span style="width:6rem">《地摊经济》</span><!--
                    --><span  style="width:1.5rem">李泽浩</span>
                  </li>
                </ul>
                                <ul>
                  <li>
                    <span>17</span><!--
                    --><span style="width:1.5rem">#6810</span><!--
                    --><span style="width:6rem">《洪涝灾区大营救》</span><!--
                    --><span  style="width:1.5rem">赵洪亮</span>
                  </li>
                </ul>
                  <ul>
                  <li>
                    <span>18</span><!--
                    --><span style="width:1.5rem">#7166</span><!--
                    --><span style="width:6rem">《引导》</span><!--
                    --><span  style="width:1.5rem">————</span>
                  </li>
                </ul>
                     <ul>
                  <li>
                    <span>19</span><!--
                    --><span style="width:1.5rem">#7306</span><!--
                    --><span style="width:6rem">《天坛绝活秀》</span><!--
                    --><span  style="width:1.5rem">袁奕</span>
                  </li>
                </ul>
                     <ul>
                  <li>
                    <span>20</span><!--
                    --><span style="width:1.5rem">#7857</span><!--
                    --><span style="width:6rem">《团聚》</span><!--
                    --><span  style="width:1.5rem">闫雨婷</span>
                  </li>
                </ul>
                     <ul>
                  <li>
                    <span>21</span><!--
                    --><span style="width:1.5rem">#7978</span><!--
                    --><span style="width:6rem">《断桥上再次见证了爱的力度》</span><!--
                    --><span  style="width:1.5rem">————</span>
                  </li>
                </ul>
                     <ul>
                  <li>
                    <span>22</span><!--
                    --><span style="width:1.5rem">#8014</span><!--
                    --><span style="width:6rem">《对话》</span><!--
                    --><span  style="width:1.5rem">宋义勇</span>
                  </li>
                </ul>
                     <ul>
                  <li>
                    <span>23</span><!--
                    --><span style="width:1.5rem">#8021</span><!--
                    --><span style="width:6rem">《建设者之歌》</span><!--
                    --><span  style="width:1.5rem">宋义勇</span>
                  </li>
                </ul>
                     <ul>
                  <li>
                    <span>24</span><!--
                    --><span style="width:1.5rem">#6326</span><!--
                    --><span style="width:6rem">《幸福时刻》</span><!--
                    --><span  style="width:1.5rem">樊豹声</span>
                  </li>
                </ul>
                     <ul>
                  <li>
                    <span>25</span><!--
                    --><span style="width:1.5rem">#8314</span><!--
                    --><span style="width:6rem">《井然有序》</span><!--
                    --><span  style="width:1.5rem">————</span>
                  </li>
                </ul>
                     <ul>
                  <li>
                    <span>26</span><!--
                    --><span style="width:1.5rem">#8357</span><!--
                    --><span style="width:6rem">《玻璃桥云雾》</span><!--
                    --><span  style="width:1.5rem">孙新尖</span>
                  </li>
                </ul>
                     <ul>
                  <li>
                    <span>27</span><!--
                    --><span style="width:1.5rem">#8383</span><!--
                    --><span style="width:6rem">《雨后晨跑》</span><!--
                    --><span  style="width:1.5rem">————</span>
                  </li>
                </ul>

                     <ul>
                  <li>
                    <span>28</span><!--
                    --><span style="width:1.5rem">#8608</span><!--
                    --><span style="width:6rem">《快乐的肥皂泡》</span><!--
                    --><span  style="width:1.5rem">————</span>
                  </li>
                </ul>
                     <ul>
                  <li>
                    <span>29</span><!--
                    --><span style="width:1.5rem">#8658</span><!--
                    --><span style="width:6rem">《妈妈的高跟鞋》</span><!--
                    --><span  style="width:1.5rem">————</span>
                  </li>
                </ul>
                       <ul>
                  <li>
                    <span>30</span><!--
                    --><span style="width:1.5rem">#8699</span><!--
                    --><span style="width:6rem">《谁跑得快》</span><!--
                    --><span  style="width:1.5rem">————</span>
                  </li>
                </ul>
              </div>
            </ul>
          </div>
        </div>
        <!-- 网络人气奖 -->
        <div class="special">
          <div class="title_head">
            <img src="@/assets/imgwx/hzmovie/title_wangluo.png" alt="">
          </div>
            <div class="againresult">
            <ul class="tit">
              <!-- <li class="tit1">序号</li>
              <li class="tit1">编号</li>
              <li class="tit1">作品名称</li>
              <li class="tit1">作者</li> -->
              <!-- <li>票数</li> -->
              <li>
                <span>序号</span><!--
                --><span style="width:1.5rem">编号</span><!--
                --><span style="width:6rem">作品名称</span><!--
                --><span style="width:1.5rem">作者</span><!--
                --><span >票数</span>
              </li>
              <div class="dd">
                <ul>
                  <li>
                    <span>1</span><!--
                    --><span style="width:1.5rem">#1633</span><!--
                    --><span style="width:6rem">《亚洲美食在杭州》</span><!--
                    --><span  style="width:1.5rem">汪锡刚</span><!--
                      --><span>21763</span>
                  </li>
                </ul>
                <ul>
                  <li>
                    <span>2</span><!--
                    --><span style="width:1.5rem">#4218</span><!--
                    --><span style="width:6rem">《巧遇古桥旗袍秀》</span><!--
                    --><span  style="width:1.5rem">鲁忠道</span><!--
                      --><span>17478</span>
                  </li>
                </ul>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import headbg from './components/pcheader'
import pcnav from './components/pcnav'
import wxheadbg from './components/wxheadbg'
import wxnav from './components/wxnav'
import wxService from '@/api/wxService'
// var imgURrl = require('@/assets/img/shareicon.png')
export default {
  components: {
    headbg,
    pcnav,
    wxheadbg,
    wxnav
  },
  computed: {
    ...mapGetters(['isMobile'])
  },
  data() {
    return {
      navNum: 4
    }
  },
  methods: {},
  mounted() {
    if (this.isMobile) {
      var shareConfig = {}
      shareConfig.currentTitle = '“童声诵党”庆党100周年昆山市少儿朗诵大赛'
      shareConfig.share_url = window.location.href
      shareConfig.currentCover = 'https://hzszwhg.oss-cn-beijing.aliyuncs.com/cloud/www.zjhzart.cn/2021/03/1615172625060_123.png'
      shareConfig.currentDetail = '结果公示'
      // console.log('分享参数：', shareConfig)
      wxService.setWXConfig(shareConfig)
    }
  }
}
</script>
