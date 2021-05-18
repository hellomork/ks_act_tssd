import Mock from 'mockjs'
import API_LIST from '@/api/config'
const Random = Mock.Random
const list = []

const list1 = Mock.mock(new RegExp('\/api\/' + API_LIST.act.list), 'get', (options) => {
  for (let i = 0; i < 12; i++) { // 可自定义生成的个数
    const template = {
      ocName: Random.ctitle(5, 10),
      ocCover: Random.image('533x354', '#02adea', '作品' + (i + 1)),
      ocVote: Random.integer(1000, 10000),
      ocNumber: Random.integer(1, 20),
      rank: i + 1,
      operateCode: '486d0041-b478-11ea-ba14-9c5c8e7be297',
      ocWrite: Random.cname(),
      firstExpertVote: Random.integer(1, 5),
      secondExpertVote: Random.integer(1, 5)
    }
    list.push(template)
  }
  const data = {
    data: {
      list: list
    },
    status: {
      returnCode: 100,
      msg: '成功'
    }
  }
  return data
})
export default list1
