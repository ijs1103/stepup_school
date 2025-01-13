export interface ISignUpForm {
    USERID: string;
    NAME: string;
    NICKNAME: string;
    PASSWORD: string;
}

export type ISignUpFormField = keyof ISignUpForm;
