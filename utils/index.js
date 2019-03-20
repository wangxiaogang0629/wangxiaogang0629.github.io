const Utils = {

  /**
   * 时间格式化
   * 参数 date标准时间、 split分隔符
   * 返回值 所有的时间信息，包括单独的年、月、日等信息
   */
  toDate(date, split) {
    if (typeof(split) == 'undefined') {
      split = '.';
    }

    function _filterResult(result) {
      return !date ? '--' : result;
    }

    var _n = new Date(date),
      _ny = _n.getFullYear(),
      _nm = _n.getMonth() < 9 ? '0' + (_n.getMonth()+ 1) : (_n.getMonth()+1),
      // _nm = _n.getMonth() + 1,
      _newm = _n.getMonth()+ 1,
      _nd = _n.getDate() < 10 ? '0' + _n.getDate() : _n.getDate(),
      // _nd = _n.getDate(),
      _newd = _n.getDate(),
      _nth = _n.getHours() < 10 ? '0' + _n.getHours() : _n.getHours(),
      _ntm = _n.getMinutes() < 10 ? '0' + _n.getMinutes() : _n.getMinutes(),
      _nts = _n.getSeconds() < 10 ? '0' + _n.getSeconds() : _n.getSeconds();
    return {
      y: _filterResult(_ny),
      m: _filterResult(_nm),
      newm: _filterResult(_newm),
      d: _filterResult(_nd),
      newd: _filterResult(_newd),
      th: _filterResult(_nth),
      tm: _filterResult(_ntm),
      ts: _filterResult(_nts),
      formatL: _filterResult(
        _ny+split+_nm+split+_nd+' '+_nth+':'+_ntm+':'+_nts),
      formatS: _filterResult(_ny+split+_nm+split+_nd),
      formatNS: _filterResult(_nth+':'+_ntm),
      formatLt: _filterResult(_ny+split+_nm+split+_nd+' '+_nth+':'+_ntm),
      formatCL: _filterResult(_ny+'年'+_nm+'月'+_nd+'日 '+_nth+':'+_ntm),
      formatCLt: _filterResult(
        _ny+'年'+_nm+'月'+_nd+'日 '+_nth+':'+_ntm+':'+_nts),
      formatCS: _filterResult(_ny+'年'+_nm+'月'+_nd+'日')
    };
  },

  /**
   * 时间显示规则:
   * 1m  内          显示 刚刚
   * 1h  内          显示 多少'分钟前'
   * 24h 内          显示 多少'小时前'
   * 24h 至 48h      显示 昨天
   * 48h 至 30天     显示 多少 '天前'
   * 30天 至 12个月   显示 多少 '个月前'
   * 12个月 至 至今   显示 多少 '年前'
   */
  dateForMoment(date) {
    let distanceMillis = new Date().getTime() - new Date(date).getTime();
    let seconds = Math.abs(distanceMillis) / 1000;
    let minutes = seconds / 60;
    let hours = minutes / 60;
    let days = hours / 24;
    let years = days / 365;
    let month = days/30;
    if (seconds < 60) {
      return '刚刚';
    } else if (minutes > 1 && minutes < 60) {
      return Math.round(minutes) + '分钟前';
    } else if (1 < hours && hours < 24) {
      return Math.round(hours) + '小时前';
    } else if (24 <= hours && hours < 48) {
      return '昨天';
    } else if (48 <= hours && days < 30) {
      return Math.floor(days) + '天前';
    } else if (30 <= days && month < 12) {
      return Math.round(month) + '个月前';
    } else if (month >= 12) {
      return Math.round(years) + '年前';
    }
    return '';
  },

  /**
    * 时间格式化 －－ 超过三天时间显示以中文拼接，如： 2012年12月22日 17时35分
    * 需要传参数，时间戳
    */
   timeFormat(time) {


     var nowDate = new Date();
     var timeDate = new Date(time);

     var gap = nowDate.getTime()/1000 - timeDate.getTime()/1000;
     var year = timeDate.getYear() + 1900;
     var month = timeDate.getMonth() + 1;
     var date = timeDate.getDate();
     var hours = timeDate.getHours();
     var minutes = timeDate.getMinutes();
     if (year < nowDate.getYear() + 1900) {
       return year + '年' + month + '月' + date + '日 ' +
       hours + '时' + minutes + '分';
     } else {
       if (gap >= 31536000) {  // 大于一年
         return year + '年' + month + '月' + date + '日 ' +
         hours + '时' + minutes + '分';
       } else if (gap >= 259200) {  // 3天<时间<1年
         return month + '月' + date + '日 ' + hours + '时' + minutes + '分';
       } else if (gap >= 86400) {  // 24小时<时间<3天
         return parseInt(gap/86400) + '天前';
       } else if (gap >= 3600) {  // 60分钟<时间<24小时
         hours = parseInt(gap/3600) + '小时';
         minutes = '';
         if ((gap%3600) >= 60) {
           minutes = parseInt((gap%3600) / 60) + '分钟';
         }
         return hours + minutes + '前';
       } else if (gap >= 60) { // 1分钟<时间<60分钟
         return parseInt((gap%3600) / 60) + '分钟前';
       } else {  // 1分钟以内
         return '刚刚';
       }
     }

   },


    /**
     * 时间显示规则:
     * 1m  内          显示 刚刚
     * 1h  内          显示 多少'分钟前'
     * 24h 内          显示 12:00
     * 24h 后          显示 2019-3-19
     */
    timeFormatS(time) {

      var nowDate = new Date();
      var timeDate = new Date(time);
      var _time = time.split(' ')[1];

      var gap = nowDate.getTime()/1000 - timeDate.getTime()/1000;
      var year = timeDate.getYear() + 1900;
      var month = timeDate.getMonth() + 1 > 9 ? timeDate.getMonth() + 1 : '0' + (timeDate.getMonth() + 1);
      var date = timeDate.getDate() > 9 ? timeDate.getDate() : '0' + timeDate.getDate() ;
      var _nowDate = nowDate.getDate();
      var hours = timeDate.getHours();
      var minutes = timeDate.getMinutes();

      if (date < _nowDate) {
        return year + '-' + month + '-' + date;
      } else {
        if (gap >= 3600) {  // 60分钟<时间<24小时
          return _time.split(':')[0] + ':' + _time.split(':')[1];
        } else if (gap >= 60) { // 1分钟<时间<60分钟
          return parseInt((gap%3600) / 60) + '分钟前';
        } else {  // 1分钟以内
          return '刚刚';
        }
      }

    },

    /** 时间格式化 需要传参数，时间戳
     * 时间显示规则:
     * 1m  内          显示 刚刚
     * 1h  内          显示 多少'分钟前'
     * 当日24h 内       显示 12:00
     * 隔日48h 内       显示 昨天 12:00
     * 48h 后          显示 3月19日 12:00
     * 48h 内          显示 昨天 12:00
     * 大于一年         显示 2019年3月19日 12:00
     */
   timeFormatD(time) {

     var nowDate = new Date();
     var gap = nowDate.getTime()/1000 - time/1000;

     var timeDate = new Date(time);
     var year = timeDate.getFullYear();
     var month = timeDate.getMonth() + 1;
     var date = timeDate.getDate();
     var hours = timeDate.getHours();
     var minutes = timeDate.getMinutes();
     if (minutes == 0) {
       minutes = '00';
     } else if (minutes < 10) {
       minutes = '0' + minutes;
     }

     if (hours < 10) {
       hours = '0' + hours;
     }
     // 今天凌晨
     var today = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate()).getTime(); // eslint-disable-line max-len
     var yestday = new Date(today - 24*3600*1000).getTime();

     if (year < nowDate.getYear() + 1900) {
       return year + '年' + month + '月' + date + '日 ' +
       hours + ':' + minutes;
     } else {
       if (gap >= 31536000) { // 大于一年
         return year + '年' + month + '月' + date + '日 ' +
                hours + ':' + minutes;
       } else if (yestday >= timeDate) {
         return month + '月' + date + '日 ' + hours + ':' + minutes;
       } else if (timeDate < today && yestday <= timeDate) {
        //  console.log('time', date, nowDay);
          return '昨天 ' + hours + ':' + minutes;
       } else if (timeDate >= today && (gap%3600) >= 60) {
         return hours + ':' + minutes;
       } else if (gap >= 60) {
         return parseInt((gap%3600) / 60) + '分钟前';
       } else {
         return '刚刚';
       }
     }
  },
  /**
   * 判断是否为昨天
   * @param   time [时间戳]
   * @return {Boolean}       [description]
   */
  isYestday(theDate) {
    var date = (new Date());    //当前时间
    // 今天凌晨
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(); //eslint-disable-line max-len
    var yestday = new Date(today - 24*3600*1000).getTime();
    return theDate.getTime() < today && yestday <= theDate.getTime();
  },
   /**
    * 验证有效手机号码
    * @param  {String}  phone [description]
    * @return {Boolean}       [description]
    */
   isValidMobileNo(phone) {
     let _reg =
       /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
     return _reg.test(phone);
   },
   /**
    * 验证有效电话号码
    * @param  {String}  phone [description]
    * @return {Boolean}       [description]
    */
   isValidPhoneNo(phone) {
     let _reg = /\d{3}-\d{8}|\d{4}-\{7,8}/;
     return _reg.test(phone);
   },
   /**
    * @param {Integer} len
    * @return {Boolean}
    */
   strLengthLess(str, len) {
     return str.length < len + 1;
   },
   isEmail(str) {
     let reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/; //eslint-disable-line
     return reg.test(str);
   },

  /*
   *  @param {Integer} len
   *  @return {Boolean}
   */
   isNewEmail(str) {
    let reg = /^[a-z0-9]{6,25}$/; //eslint-disable-line
    return reg.test(str);
   },

  /**
   *  获取某年某月最后一天
   *  参数 年、月
   */
   getMonthLastDay(year, month) {
     let newYear = year;
     let newMonth = month++;
     if (month>12) {
       newMonth -=12;
       newYear++;
     }
     let newDate = new Date(newYear, newMonth, 1);
     return new Date(newDate.getTime()-1000*60*60*24);
   },

  /**
   * 时间格式化
   * 显示格式   2012年12月22日 17:35
   * 需要传参数，时间戳\标准日期
   */
  timestampFormat(time) {

     var timeDate = new Date(time);
     var year = timeDate.getYear() + 1900;
     var month = timeDate.getMonth() + 1;
     var date = timeDate.getDate();
     var hours = timeDate.getHours();
     var minutes = timeDate.getMinutes();
     if (minutes < 10) {
       minutes = '0' + minutes;
     }
     return year + '年' + month + '月' + date + '日'+
     ' ' + ' ' + hours + ':' + minutes;
  },

  /**
   * 时间格式化
   * 显示格式   2012年12月22日
   * 需要传参数，时间戳／标准时间
   */
  timeFormatDate(time) {

     var timeDate = new Date(time);
     var year = timeDate.getYear() + 1900;
     var month = timeDate.getMonth() + 1;
     var date = timeDate.getDate();
     return year + '年' + month + '月' + date + '日';
  },

  /**
   * 时间格式化
   * 获取星期几
   * 需要传参数，时间戳／标准时间
   */
  timeFormatWeek(time) {

     var timeDate = new Date(time);
     var _weekArr = ['日', '一', '二', '三', '四', '五', '六'];
     var _weekDay = timeDate.getDay();
     return _weekArr[_weekDay];
  },

  /**
  * 时间格式化
  * 显示格式  时:分钟 01:01
  * 需要传参数，时间(单位秒)
  */
  timerestFormat(time) {

     var hours = parseInt(time / 3600);
     var minutes = parseInt((time % 3600) / 60);
     if (hours < 10) {
       hours = '0' + hours;
     }
     if (minutes < 10) {
       minutes = '0' + minutes;
     }
     return hours + ':' + minutes;
  },

  /**
  * 时间格式化
  * 显示格式 分钟:秒 01:01
  * 需要传参数，时间(单位秒)
  */
  timerestFormatMS(time) {
     var minutes = parseInt(time / 60);
     var seconds = parseInt(time % 60);

     if (minutes < 10) {
       minutes = '0' + minutes;
     }

     if (seconds < 10) {
       seconds = '0' + seconds;
     }

     return minutes + ':' + seconds;
  },

  /**
   * 去除字符串开头结尾空格
   */
  trim(val) {
    return val.replace(/(^\s*)|(\s*$)/g, '');
  },

  /**
   * 设置本地存储
   * 参数 key键, value值
   */
  setLocalStorage(key, value) {
    localStorage.setItem(key, value);
  },

  /**
   * 获取本地存储
   * 参数 key键
   * 返回 value值
   */
  getLocalStorage(key) {
    return localStorage.getItem(key);
  },

  /**
   *  @param {string}
   *  @return {Boolean}
   *  限制英文及数字
   */
  isEnglishNub(str) {
    let reg = /^[0-9a-zA-Z]+$/g;
    return reg.test(str);
  },

  /**
   *  @param {string}
   *  @return {Boolean}
   *  限制英文、数字及逗号
   */
  isEnglishNubComma: function(str) {
    let reg = /[0-9a-fA-F\,]/g;
    return reg.test(str);
  },

  /**
   *  @param {string}
   *  @return {Boolean}
   *  限制英文、数字及算法(+、-、*、/、（）)
   */
  isEnglishNubCount: function(str) {
    let reg = /[0-9a-fA-F\-+*/()]/g;
    return reg.test(str);
  },

  /**
   *  @param {string}
   *  @return {Boolean}
   *  限制中文输入
   */
  isChinaName: function(str) {
    let reg = /[\u4e00-\u9fa5]+$/;
    return reg.test(str);
  },


  /**
   *  @param {string}
   *  @return {Boolean}
   *  限制特殊字符（表情）
   *  弊端：针对搜狗
   */
  isHandleExpression(value) {
    let regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]/ig;
    let regStr1 = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]/ig;
    let regStr2 = /[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3/ig;
    let regStr3 = /[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F/ig;
    let regStr4 = /[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;

    if (regStr.test(value) || regStr1.test(value) ||
    regStr2.test(value) || regStr3.test(value) || regStr4.test(value)) {
      return true;
    } else {
      return false;
    }
  },

  /**
   * 金额输入限制
   * number 类型为字符串
   * 规则：
   *  1.禁止录入整数部分两位以上，但首位为0
   *  2.禁止录入任何非数字和点
   *  3.禁止录入两个以上的点
   *  4.禁止录入小数点后两位以上
   */
  isValidNumber(number) {
    let _regStrs = [
                    ['^0(\\d+)$', '$1'], //禁止录入整数部分两位以上，但首位为0
                    ['[^\\d\\.]+$', ''], //禁止录入任何非数字和点
                    ['\\.(\\d?)\\.+', '.$1'], //禁止录入两个以上的点
                    ['^(\\d+\\.\\d{2}).+', '$1'] //禁止录入小数点后两位以上
                   ];
    for (let i = 0; i < _regStrs.length; i++) {
       let _reg = new RegExp(_regStrs[i][0]);
       number = number.replace(_reg, _regStrs[i][1]);
    }
    return number;
  },

  /**
   * 将数值四舍五入(保留2位小数)后格式化成金额形式
   *
   * @param num 数值(Number或者String)
   * @return 金额格式的字符串,如'1,234,567.45'
   * @type String
   */
  formatCurrency(num) {
      num = Number(num).toString().replace(/\$|\,/g,'');
      if(isNaN(num))
          num = "0";
      let sign = (num == (num = Math.abs(num)));
      num = Math.floor(num*100+0.50000000001);
      let cents = num%100;
      num = Math.floor(num/100).toString();
      if(cents<10)
      cents = "0" + cents;
      for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
      num = num.substring(0,num.length-(4*i+3))+','+
      num.substring(num.length-(4*i+3));

      return (((sign)?'':'-') + num + '.' + cents);
  },

  /**
   * [encrypt description]
   *  根据加密的密码 pwd 和需要加密的字符串 进行加密
   * @param    {String}                str [description]
   * @param    {String}                pwd [description]
   * @return   {String}                    [description]
   * @Author   haohuan
   * @datetime 2017-10-23T09:59:55+080
   * @version  [version]
   */
  encrypt(str, pwd) {
    if(pwd == null || pwd.length <= 0) {
      console.log("请输入加密消息的密码。");
      return null;
    }
    var prand = "";
    for(var i=0; i<pwd.length; i++) {
      prand += pwd.charCodeAt(i).toString();
    }
    var sPos = Math.floor(prand.length / 5);
    var mult = parseInt(prand.charAt(sPos) + prand.charAt(sPos*2) + prand.charAt(sPos*3) + prand.charAt(sPos*4) + prand.charAt(sPos*5));
    var incr = Math.ceil(pwd.length / 2);
    var modu = Math.pow(2, 31) - 1;
    if(mult < 2) {
      console.log("算法找不到合适的哈希。请选择其他密码。\ n可能考虑选择一个更复杂的或更长的密码。");
      return null;
    }
    // var salt = Math.round(Math.random() * 1000000000) % 100000000;
    // prand += salt;
    while(prand.length > 10) {
      prand = (parseInt(prand.substring(0, 10)) + parseInt(prand.substring(10, prand.length))).toString();
    }
    prand = (mult * prand + incr) % modu;
    var enc_chr = "";
    var enc_str = "";
    for(var i=0; i<str.length; i++) {
      enc_chr = parseInt(str.charCodeAt(i) ^ Math.floor((prand / modu) * 255));
      if(enc_chr < 16) {
        enc_str += "0" + enc_chr.toString(16);
      } else enc_str += enc_chr.toString(16);
      prand = (mult * prand + incr) % modu;
    }
    // salt = salt.toString(16);
    // while(salt.length < 8)salt = "0" + salt;
    // enc_str += salt;
    return enc_str;
  },
  /**
   * [decrypt description]
   * 根据加密的密码 pwd和加密后的字符串 进行解密
   * @param    {[type]}                str [description]
   * @param    {[type]}                pwd [description]
   * @return   {[type]}                    [description]
   * @Author   haohuan
   * @datetime 2017-10-23T10:05:29+080-
   * @version  [version]
   */
  decrypt(str, pwd) {
    if(str == null || str.length < 8) {
      console.log("A salt value could not be extracted from the encrypted message because it's length is too short. The message cannot be decrypted.");
      return;
    }
    if(pwd == null || pwd.length <= 0) {
      console.log("Please enter a password with which to decrypt the message.");
      return;
    }
    var prand = "";
    for(var i=0; i<pwd.length; i++) {
      prand += pwd.charCodeAt(i).toString();
    }
    var sPos = Math.floor(prand.length / 5);
    var mult = parseInt(prand.charAt(sPos) + prand.charAt(sPos*2) + prand.charAt(sPos*3) + prand.charAt(sPos*4) + prand.charAt(sPos*5));
    var incr = Math.round(pwd.length / 2);
    var modu = Math.pow(2, 31) - 1;
    // var salt = parseInt(str.substring(str.length - 8, str.length), 16);
    // str = str.substring(0, str.length - 8);
    // prand += salt;
    while(prand.length > 10) {
      prand = (parseInt(prand.substring(0, 10)) + parseInt(prand.substring(10, prand.length))).toString();
    }
    prand = (mult * prand + incr) % modu;
    var enc_chr = "";
    var enc_str = "";
    for(var i=0; i<str.length; i+=2) {
      enc_chr = parseInt(parseInt(str.substring(i, i+2), 16) ^ Math.floor((prand / modu) * 255));
      enc_str += String.fromCharCode(enc_chr);
      prand = (mult * prand + incr) % modu;
    }
    return enc_str;
  },


  getCookie: function(sName) {
		let aCookie = document.cookie.split('; ');
		for (var i=0; i < aCookie.length; i++){
			var aCrumb = aCookie[i].split('=');
			if (sName == aCrumb[0]) {
				aCrumb.shift();
				return decodeURIComponent(aCrumb.join('='));
			}
		}
		return '';
	},


  /**
   * 日期转换时间戳
   * 参数格式 年-月-日
   * 返回时间戳
   */
  getTimestampOne(date) {
    var newTime;
    var arr = date.split('-');
    newTime = new Date(parseInt(arr[0]), parseInt(arr[1])-1, parseInt(arr[2]));
    var timestamp = Date.parse(new Date(newTime));

    return timestamp;
  },

  /**
   * 日期转换时间戳
   * 参数格式 年-月-日 时:分:秒 (其中连接符可为-、:、/)
   * 兼容 safari处理时间问题
   * 返回时间戳
   */
  getTimestamp(date) {
    var newTime;
    var arr = date.split(/[- : \/]/),
    newTime = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
    var timestamp = Date.parse(new Date(newTime));
    return timestamp ;
  },

  /*
  *  @param {Number}                scrollTo [滚动的距离]
  *  @param {Number}(单位：毫秒)      time     [动画时间]
  *  @param {callback}(可选)         callback [动画完成后的回调函数]
  *  页面滚动到指定位置
  */
  scrollMove(scrollTo, time, callback) {
    var scrollFrom = window.pageYOffset || document.documentElement.scrollTop
                     || document.body.scrollTop;
    var _count = 0;
    var baseTime = 10;
    var _scrollTo = 0;
    scrollTo = parseInt(scrollTo);

    if (time == 0) {
      _scrollTo = scrollTo;
      baseTime = 0;
    } else {
      time /= baseTime;
      _scrollTo = (scrollTo - scrollFrom) / time
    }

    var interval = setInterval(function () {
      _count++;

      if (time != 0) {
        document.documentElement.scrollTop = document.body.scrollTop =
          _scrollTo * _count + scrollFrom;
      } else {
        document.documentElement.scrollTop = document.body.scrollTop =
          _scrollTo;
      }

      if (_count >= time) {

        if (callback) {
          callback();
        }
        clearInterval(interval);
      }

    }, baseTime);

  },

  /**
   * 日期格式化
   * 替换 形式为'2008年01月01日' 中的年月日 为指定字符
   * 参数 date时间、str字符
   */
  replaceYearMonthDay(date, str) {
    return date.slice(0, date.length-1).replace(/年|月|日/g, str);
  },

  /**
   * 获取当前浏览器信息
   * 返回 浏览器名称、及版本号
   */
  getBrowserInfo(){
		var Sys = {};
		var ua = navigator.userAgent.toLowerCase();
		var re =/(msie|firefox|chrome|opera|version).*?([\d.]+)/;
		var m = ua.match(re);
		Sys.browser = m[1].replace(/version/, "'safari");
		Sys.ver = m[2];
		return Sys;
	},
 

};
