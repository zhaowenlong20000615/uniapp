import type { TVtype } from "./type";

export const validate = (value: any, vtype: TVtype, lgh?: any) => {
  // 自定义正则校验
  if ("regular" === vtype) {
    return lgh.test(value);
  }
  //长度校验
  if (vtype === "length") {
    let val = lgh.split(",");
    let len = value.length;
    if (val.length == 1) {
      return val == len;
    } else {
      return len >= val[0] && len <= val[1];
    }
  }
  if ("require" === vtype) {
    return !!value;
  }
  if ("phone" === vtype) {
    return /^1[3-9]\d{9}$/.test(value);
  }
  // 验证码
  if ("captcha" === vtype) {
    return /^[0-9]{4,6}$/.test(value);
  }
  // 不知道干啥的
  if ("isnumber" === vtype) {
    return /^[0-9]{5,11}$/.test(value);
  }
  if ("isqq" === vtype) {
    return /^[1-9][0-9]{4,10}$/.test(value);
  }
  // // 身份证号码验证不准确
  // if ('idcard' === vtype) {
  //   return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value);
  // }
  // 身份证号码验证
  if ("idcard" === vtype) {
    var checkProv = function (val: any) {
      var pattern = /^[1-9][0-9]/;
      var provs: any = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江 ",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北 ",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏 ",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
      };
      if (pattern.test(val)) if (provs[val]) return true;
      return false;
    };
    var checkDate = function (val: any) {
      var pattern =
        /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/;
      if (pattern.test(val)) {
        var year = val.substring(0, 4);
        var month = val.substring(4, 6);
        var date = val.substring(6, 8);
        var date2 = new Date(year + "-" + month + "-" + date);
        if (date2 && date2.getMonth() == parseInt(month) - 1) return true;
      }
      return false;
    };
    var checkCode = function (val: any) {
      var p =
        /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      var parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
      var code = val.substring(17);
      if (p.test(val)) {
        var sum = 0;
        for (var i = 0; i < 17; i++) {
          sum += val[i] * factor[i];
        }
        if (parity[sum % 11] == code.toUpperCase()) {
          return true;
        }
      }
      return false;
    };
    var checkID = function (val: any) {
      if (checkCode(val)) {
        var date = val.substring(6, 14);
        if (checkDate(date)) {
          if (checkProv(val.substring(0, 2))) {
            return true;
          }
        }
      }
      return false;
    };
    return checkID(value + "");
  }
  if ("password" === vtype) {
    return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]{6,12}$/.test(value);
  }
  // 邀请码验证
  if ("invitecode" === vtype) {
    return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]$/.test(value);
  }
  // 判断不准确 比如123.
  if ("ismoney" === vtype) {
    return /^(([1-9]\d*)|\d)(\.\d{1,2})?$/.test(value);
  }
  if ("email" === vtype) {
    // return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
    return /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/.test(value);
  }
  if ("url" === vtype) {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
      value
    );
  }
  if ("paragraph" === vtype) {
    return /^[A-Z0-9]{18}$/.test(value);
  }
  // 银行卡验证
  if ("card" === vtype) {
    let bankno = value;
    let lastNum = bankno.substr(bankno.length - 1, 1); //取出最后一位（与luhm进行比较）
    let first15Num = bankno.substr(0, bankno.length - 1); //前15或18位
    let newArr = [];

    // 前15或18位倒序存进数组
    for (let i = first15Num.length - 1; i > -1; i--)
      newArr.push(first15Num.substr(i, 1));

    let arrJiShu: any = []; // 奇数位*2的积 <9
    let arrJiShu2: any = []; // 奇数位*2的积 >9
    let arrOuShu = []; // 偶数位数组
    for (let j = 0; j < newArr.length; j++) {
      if ((j + 1) % 2 == 1) {
        //奇数位
        if (parseInt(newArr[j]) * 2 < 9) arrJiShu.push(parseInt(newArr[j]) * 2);
        else arrJiShu2.push(parseInt(newArr[j]) * 2);
      } else arrOuShu.push(newArr[j]); // 偶数位
    }

    let jishu_child1: any = []; //奇数位*2 >9 的分割之后的数组个位数
    let jishu_child2: any = []; //奇数位*2 >9 的分割之后的数组十位数
    for (let h = 0; h < arrJiShu2.length; h++) {
      jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
      jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
    }

    let sumJiShu: any = 0; //奇数位*2 < 9 的数组之和
    let sumOuShu: any = 0; //偶数位数组之和
    let sumJiShuChild1: any = 0; //奇数位*2 >9 的分割之后的数组个位数之和
    let sumJiShuChild2: any = 0; //奇数位*2 >9 的分割之后的数组十位数之和
    let sumTotal: any = 0;

    for (let m = 0; m < arrJiShu.length; m++)
      sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
    for (let n = 0; n < arrOuShu.length; n++)
      sumOuShu = sumOuShu + parseInt(arrOuShu[n]);

    for (let p = 0; p < jishu_child1.length; p++) {
      sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
      sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
    }
    //计算总和
    sumTotal =
      parseInt(sumJiShu) +
      parseInt(sumOuShu) +
      parseInt(sumJiShuChild1) +
      parseInt(sumJiShuChild2);
    //计算Luhm值
    let k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
    let luhm = 10 - k;
    return lastNum == luhm;
  }
};
