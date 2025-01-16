import {ChartCategory} from '../ui/MonthlyChart/MonthlyChart';

const BASE_URL = 'http://52.78.136.17:3000';

const REGEX = {
  USERID: /^[A-Za-z0-9]{6,20}$/,
  NAME: /^[가-힣]{2,18}$/,
  NICKNAME: /^[가-힣]{2,10}$/,
  PASSWORD:
    /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?])(?=.{8,16}$)[A-Za-z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]{8,16}$/,
} as const;

const FORM_ERROR_MESSAGE = {
  USERID: '아이디는 영문자, 숫자 6~20자까지 입력.',
  PASSWORD: '8~16자 영문자, 특수기호를 사용하세요.',
  NAME: '이름은 한글 2~18자까지 입력.',
  NICKNAME: '별명은 한글 2~10자까지 입력.',
  REQUIRED: '해당란을 입력해주세요.',
  PASSWORD_CHECK: '비밀번호가 일치하지 않습니다.',
} as const;

export interface FoodItem {
  name: string;
  calories: number;
  emoji: string;
}

const FOOD_ITEM_LIST: FoodItem[] = [
  {name: '바나나 1개', calories: 100, emoji: '🍌'},
  {name: '달걀 2개', calories: 180, emoji: '🥚'},
  {name: '피자 1조각', calories: 260, emoji: '🍕'},
  {name: '햄버거 절반', calories: 340, emoji: '🍔'},
  {name: '초콜릿 케이크 1조각', calories: 420, emoji: '🍰'},
  {name: '라면 한 그릇', calories: 500, emoji: '🍜'},
  {name: '볶음밥 한 그릇', calories: 580, emoji: '🍛'},
  {name: '크림 파스타 한 접시', calories: 740, emoji: '🍝'},
  {name: '치킨 윙 6조각', calories: 820, emoji: '🍗'},
];

const DAYS_OF_WEEK = ['월', '화', '수', '목', '금', '토', '일'];

const CHART_CATEGORY_UNITS: Record<ChartCategory, string> = {
  distance: 'km',
  stepCount: '걸음',
  burnedCalories: 'kcal',
} as const;

export {
  BASE_URL,
  REGEX,
  FORM_ERROR_MESSAGE,
  FOOD_ITEM_LIST,
  DAYS_OF_WEEK,
  CHART_CATEGORY_UNITS,
};
