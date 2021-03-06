const API_LIST = {
  common: {
    share: 'common/getFShareAutograph.oc'
    // share: 'share/getFShareAutograph.show'// old
  },
  user: {
    sysTime: 'common/getSystemInfo.login',
    info: 'users/getSessionThridUserInfo.oc',
    infoLogin: 'users/getSessionUserInfo.oc',
    login: 'users/managerLogin.login',
    loginPic: 'common/getLoginCode.login',
    loginOut: 'common/loginOut.login',
    bindMobile: 'users/bindUserMobile.login', // 绑定手机/注册
    verifyCodes: 'common/getVerifyCodes.login', // 获取手机验证码
    checkCodes: 'common/checkVerifyCodes.login', // 验证验证码是否正确
    signature: 'common/getSignature.oc',
    vote: 'oc_statistic/insertKaOcStatistic.oc'// 用户点赞
  },
  act: {
    list: 'operate/getFrontOperateContentList.oc',
    upload: 'operate/userContributionList.oc',
    totalNum: 'operate_content/getTotalNum.oc',
    actDetail: 'operate_content/getOpContentDetail.oc',
    readerCount: 'operate/usersReade.oc'
  },
  visit: {
    insert: 'visitor/insertKaVisitor.oc',
    insertOld: 'visit/insertVisitInfo.show'// old
  },
  backEnd: {
    list: 'operate/getFrontOperateContentList.oc', // 后台获取投稿列表
    detail: 'operate_content/getKaOperateContent.oc',
    update: 'operate_content/updateKaOperateContent.oc',
    boutique: 'operate_content_boutique/updateBoutique.oc', // 后台入围或待定
    deleteBoutique: 'operate_content_boutique/deleteBoutiqueByOcCode.oc', // 取消待定与入围
    check: 'operate_content/updateKaOperateContent.oc', // 后台审核为精选
    delete: 'operate_content/updateKaOperateContent.oc' // 后台删除
  }
}

export default API_LIST
