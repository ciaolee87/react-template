// 숫자, 영어 섞어서 8자리 이상 16자리 미만
export const PasswdRegEx = '^(?=.*[a-zA-Z])(?=.*[0-9]).{8,16}$';
export const EmailRegEx = '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$';


export const Validator = {
    password: (str: string): boolean => {
        return new RegExp(PasswdRegEx).test(str);
    },
    email: (str: string): boolean => {
        return new RegExp(EmailRegEx).test(str);
    }
}
