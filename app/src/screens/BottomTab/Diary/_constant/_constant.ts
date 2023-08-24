export const MOODS_MAP = {
  happy: {
    key: 'emoticon-happy-outline',
    description: '행복',
    color: '#FDD835', // 노랑
    value: 'happy',
  },
  lol: {
    key: 'emoticon-lol-outline',
    description: '웃김',
    color: '#FF7043', // 주황
    value: 'lol',
  },
  excited: {
    key: 'emoticon-excited-outline',
    description: '신남',
    color: '#00BCD4', // 청록
    value: 'excited',
  },
  cool: {
    key: 'emoticon-cool-outline',
    description: '멋짐',
    color: '#2196F3', // 파랑
    value: 'cool',
  },
  neutral: {
    key: 'emoticon-neutral-outline',
    description: '평범',
    color: '#9E9E9E', // 회색
    value: 'neutral',
  },
  confused: {
    key: 'emoticon-confused-outline',
    description: '혼란',
    color: '#607D8B', // 짙은 회색
    value: 'confused',
  },
  sick: {
    key: 'emoticon-sick-outline',
    description: '아픔',
    color: '#FF5722', // 주황빛 갈색
    value: 'sick',
  },
  cry: {
    key: 'emoticon-cry-outline',
    description: '슬픔',
    color: '#1565C0', // 진한 파랑
    value: 'cry',
  },
  dead: {
    key: 'emoticon-dead-outline',
    description: '죽음',
    color: '#424242', // 짙은 회색
    value: 'dead',
  },
  angry: {
    key: 'emoticon-angry-outline',
    description: '화남',
    color: '#D32F2F', // 빨강
    value: 'angry',
  },
  love: {
    key: 'emoticon-kiss-outline',
    description: '사랑',
    color: '#E91E63', // 분홍
    value: 'love',
  },
  frown: {
    key: 'emoticon-frown-outline',
    description: '언짢음',
    color: '#795548', // 갈색
    value: 'frown',
  },
} as const;

export const WEATHER_MAP = {
  sunny: {
    key: 'weather-sunny',
    description: '해',
    color: '#FDB813', // 노랑
    value: 'sunny',
  },
  partlyRainy: {
    key: 'weather-partly-rainy',
    description: '해 비 조금',
    color: '#67A2FF', // 파랑
    value: 'partlyRainy',
  },
  windy: {
    key: 'weather-windy',
    description: '바람',
    color: '#8BC34A', // 연두
    value: 'windy',
  },
  fog: {
    key: 'weather-fog',
    description: '안개',
    color: '#9E9E9E', // 회색
    value: 'fog',
  },
  cloudy: {
    key: 'weather-cloudy',
    description: '흐림',
    color: '#607D8B', // 짙은 회색
    value: 'cloudy',
  },
  rainy: {
    key: 'weather-rainy',
    description: '비',
    color: '#1565C0', // 진한 파랑
    value: 'rainy',
  },
  pouring: {
    key: 'weather-pouring',
    description: '폭우',
    color: '#1A237E', // 진한 남색
    value: 'pouring',
  },
  snowy: {
    key: 'weather-snowy',
    description: '눈',
    color: '#BDBDBD', // 밝은 회색
    value: 'snowy',
  },
  lightning: {
    key: 'weather-lightning',
    description: '번개',
    color: '#FFEB3B', // 연한 노랑
    value: 'lightning',
  },
  hail: {
    key: 'weather-hail',
    description: '우박',
    color: '#757575', // 짙은 회색
    value: 'hail',
  },
  snowyRainy: {
    key: 'weather-snowy-rainy',
    description: '진눈깨비',
    color: '#BDBDBD', // 밝은 회색
    value: 'snowyRainy',
  },
  tornado: {
    key: 'weather-tornado',
    description: '태풍',
    color: '#311B92', // 진한 보라
    value: 'tornado',
  },
} as const;

export type MoodsMapKey = keyof typeof MOODS_MAP;
export type WeatherMapKey = keyof typeof WEATHER_MAP;
