const REGEX = {
  NAME: /^[가-힣]{2,18}$/,
  NICKNAME: /^[가-힣]{2,10}$/,
  EMAIL: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  PASSWORD:
    /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?])(?=.{8,16}$)[A-Za-z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]{8,16}$/,
} as const;

const FORM_ERROR_MESSAGE = {
  EMAIL: '올바른 이메일 형식이 아닙니다.',
  PASSWORD: '8~16자 영문자, 특수기호를 사용하세요.',
  NAME: '이름은 한글 2~18자까지 입력.',
  NICKNAME: '별명은 한글 2~10자까지 입력.',
  REQUIRED: '해당란을 입력해주세요.',
  PASSWORD_CHECK: '비밀번호가 일치하지 않습니다.',
} as const;

export {REGEX, FORM_ERROR_MESSAGE};
