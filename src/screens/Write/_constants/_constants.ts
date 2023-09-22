export const MOODS = [
  {
    key: 'emoticon-happy-outline',
    value: 'happy',
    description: '행복',
    color: '#FDD835', // 노랑
  },
  {
    key: 'emoticon-lol-outline',
    value: 'lol',
    description: '웃김',
    color: '#FF7043', // 주황
  },
  {
    key: 'emoticon-excited-outline',
    value: 'excited',
    description: '신남',
    color: '#00BCD4', // 청록
  },
  {
    key: 'emoticon-cool-outline',
    value: 'cool',
    description: '멋짐',
    color: '#2196F3', // 파랑
  },
  {
    key: 'emoticon-neutral-outline',
    value: 'neutral',
    description: '평범',
    color: '#9E9E9E', // 회색
  },
  {
    key: 'emoticon-confused-outline',
    value: 'confused',
    description: '혼란',
    color: '#607D8B', // 짙은 회색
  },
  {
    key: 'emoticon-sick-outline',
    value: 'sick',
    description: '아픔',
    color: '#FF5722', // 주황빛 갈색
  },
  {
    key: 'emoticon-cry-outline',
    value: 'cry',
    description: '슬픔',
    color: '#1565C0', // 진한 파랑
  },
  {
    key: 'emoticon-dead-outline',
    value: 'dead',
    description: '죽음',
    color: '#424242', // 짙은 회색
  },
  {
    key: 'emoticon-angry-outline',
    value: 'angry',
    description: '화남',
    color: '#D32F2F', // 빨강
  },
  {
    key: 'emoticon-kiss-outline',
    value: 'love',
    description: '사랑',
    color: '#E91E63', // 분홍
  },
  {
    key: 'emoticon-frown-outline',
    value: 'frown',
    description: '언짢음',
    color: '#795548', // 갈색
  },
] as const;

export const WEATHERS = [
  {
    key: 'weather-sunny',
    value: 'sunny',
    description: '해',
    color: '#FDB813', // 노랑
  },
  {
    key: 'weather-partly-rainy',
    value: 'partlyRainy',
    description: '해 비 조금',
    color: '#67A2FF', // 파랑
  },
  {
    key: 'weather-windy',
    value: 'windy',
    description: '바람',
    color: '#8BC34A', // 연두
  },
  {
    key: 'weather-fog',
    value: 'fog',
    description: '안개',
    color: '#9E9E9E', // 회색
  },
  {
    key: 'weather-cloudy',
    value: 'cloudy',
    description: '흐림',
    color: '#607D8B', // 짙은 회색
  },
  {
    key: 'weather-rainy',
    value: 'rainy',
    description: '비',
    color: '#1565C0', // 진한 파랑
  },
  {
    key: 'weather-pouring',
    value: 'pouring',
    description: '폭우',
    color: '#1A237E', // 진한 남색
  },
  {
    key: 'weather-snowy',
    value: 'snowy',
    description: '눈',
    color: '#BDBDBD', // 밝은 회색
  },
  {
    key: 'weather-lightning',
    value: 'lightning',
    description: '번개',
    color: '#FFEB3B', // 연한 노랑
  },
  {
    key: 'weather-hail',
    value: 'hail',
    description: '우박',
    color: '#757575', // 짙은 회색
  },
  {
    key: 'weather-snowy-rainy',
    value: 'snowyRainy',
    description: '진눈깨비',
    color: '#BDBDBD', // 밝은 회색
  },
  {
    key: 'weather-tornado',
    value: 'tornado',
    description: '태풍',
    color: '#311B92', // 진한 보라
  },
] as const;

export const INITIAL_TEXT_FORM = {
  title: '',
  content: '',
};

export const INITIAL_OPTIONS_FORM = {
  weather: {
    key: '',
    value: '',
    description: '',
    color: '',
  },
  mood: {
    key: '',
    value: '',
    description: '',
    color: '',
  },
};
