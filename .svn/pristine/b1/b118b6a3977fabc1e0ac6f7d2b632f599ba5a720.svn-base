import Mock from 'mockjs'
import API_LIST from '@/api/config'
const Random = Mock.Random
// 列表
var list = []
export const data = Mock.mock('/api/' + API_LIST.act.allData, 'get', () => {
  list = []
  for (let i = 0; i < 1; i++) { // 可自定义生成的个数
    const template = {
      votePeopleNum: Random.integer(1000, 100000),
      totalWorkNum: Random.integer(1000, 100000),
      totalVisitNum: Random.integer(1000, 100000),
      totalVoteNum: Random.integer(1000, 100000)
    }
    list.push(template)
  }
  const resData = {
    data: {
      list: list
    },
    status: {
      returnCode: 100,
      msg: '成功'
    }
  }
  return resData
})
// 专家列表
var slist = []
for (let i = 0; i < 5; i++) { // 可自定义生成的个数
  const template = {
    nickName: Random.cname(),
    cover: Random.image('132x132', '#02adea', '专家' + (i + 1)),
    userId: Random.increment(),
    brief: Random.cparagraph(),
    totalVoteNum: Random.integer(1000, 100000)
  }
  slist.push(template)
}
export const specialList = Mock.mock('/api/' + API_LIST.act.special, 'get', () => {
  const res = {
    data: {
      list: slist
    },
    status: {
      returnCode: 100,
      msg: '成功'
    }
  }
  return res
})
export default Object.assign({
  data,
  specialList
})
