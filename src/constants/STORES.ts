const JOIN_SNS = [ // 가입경로
  { key: 'email', text: '이메일' },
  { key: 'naver', text: '네이버' },
  { key: 'kakao', text: '카카오' },
  { key: 'google', text: '구글' },
  { key: 'facebook', text: '페이스북' },
  { key: 'apple', text: '애플' },
]

const USER_FLOW = { // 일자별 유저 흐름데이터
  date: '', // DateTime 형식 (yyyy-LL-dd)
  new_visit: 0,
  return_visit: 0,
  total_visit: 0,
  login: 0,
  join: 0,
  join_sns: {
    naver: 0,
    kakao: 0,
    google: 0,
    facebook: 0,
    apple: 0,
  },
  withdraw: 0,
  dormant: 0,
  return: 0,
}

const PAYMENT = { // 결제
  date: '', // DateTime 형식 (yyyy-LL-dd)
  payer: 0,
  payment_amount: 0,
  refunder: 0,
  refund_amount: 0,
}

const PURCHASERS = [
  { id: 1, image: '/image/character/astronaut_cat.jpeg', first_name: 'Lorem', last_name: 'lacinia' },
  { id: 2, image: '/image/character/astronaut_fox.jpeg', first_name: 'ipsum', last_name: 'nec' },
  { id: 3, image: '/image/character/chef_cat.jpeg', first_name: 'dolor', last_name: 'libero' },
  { id: 4, image: '/image/character/cosplay_wolf.jpeg', first_name: 'sit', last_name: 'eget' },
  { id: 5, image: '/image/character/hip_hop_cat.jpeg', first_name: 'amet', last_name: 'tincidunt' },
  { id: 6, image: '/image/character/hip_hop_dog.jpeg', first_name: 'consectetur', last_name: 'aliquet' },
  { id: 7, image: '/image/character/hip_hop_panda.jpeg', first_name: 'adipiscing', last_name: 'odio' },
  { id: 8, image: '/image/character/hip_hop_pig.jpeg', first_name: 'elit', last_name: 'Nam' },
  { id: 9, image: '/image/character/pirate_cat.jpeg', first_name: 'Nulla', last_name: 'hendrerit' },
  { id: 10, image: '/image/character/suit_dog.jpeg', first_name: 'consequat', last_name: 'tortor' },
  { id: 11, image: '/image/character/astronaut_cat.jpeg', first_name: 'elit', last_name: 'accumsan' },
  { id: 12, image: '/image/character/astronaut_fox.jpeg', first_name: 'sit', last_name: 'rutrum' },
  { id: 13, image: '/image/character/chef_cat.jpeg', first_name: 'amet', last_name: 'ornare' },
  { id: 14, image: '/image/character/cosplay_wolf.jpeg', first_name: 'dignissim', last_name: 'ipsum' },
  { id: 15, image: '/image/character/hip_hop_cat.jpeg', first_name: 'consequat', last_name: 'dignissim' },
  { id: 16, image: '/image/character/hip_hop_dog.jpeg', first_name: 'lorem', last_name: 'sapien' },
  { id: 17, image: '/image/character/hip_hop_panda.jpeg', first_name: 'accumsan', last_name: 'Praesent' },
  { id: 18, image: '/image/character/hip_hop_pig.jpeg', first_name: 'Nunc', last_name: 'sollicitudin' },
  { id: 19, image: '/image/character/pirate_cat.jpeg', first_name: 'dui', last_name: 'tempor' },
  { id: 20, image: '/image/character/suit_dog.jpeg', first_name: 'mauris', last_name: 'neque' },
]

export {
  JOIN_SNS,
  USER_FLOW,
  PAYMENT,
  PURCHASERS
}