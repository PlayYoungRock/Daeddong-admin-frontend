export const OPTION_LIST = {
  toiletType: [
    { label: '선택안함', value: '' },
    { label: '공중화장실', value: '공중화장실' },
    { label: '개방화장실', value: '개방화장실' },
  ],
  babyYn: [
    { label: '가능', value: 'Y' },
    { label: '불가능', value: 'N' },
  ],
  unusualYn: [
    { label: '가능', value: 'Y' },
    { label: '불가능', value: 'N' },
  ],
  cctvYn: [
    { label: '있음', value: 'Y' },
    { label: '없음', value: 'N' },
  ],
  alarmYn: [
    { label: '있음', value: 'Y' },
    { label: '없음', value: 'N' },
  ],
  pwdYn: [
    { label: '있음', value: 'Y' },
    { label: '없음', value: 'N' },
  ],
  openYn: [
    { label: '예', value: 'Y' },
    { label: '아니오', value: 'N' },
  ],
};

export const INITIAL_FORM = {
  name: '',
  address: '',
  latitude: 37.3595704,
  longitude: 127.105399,
  openTime: '00:00',
  closeTime: '23:59',
  toiletType: '',
  countMan: '',
  countWomen: '',
  babyYn: 'N',
  unusualYn: 'N',
  cctvYn: 'N',
  alarmYn: 'N',
  pwdYn: 'N',
  etc: '',
  openYn: 'N',
};
