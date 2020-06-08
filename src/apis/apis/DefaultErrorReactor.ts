import SwalSimple from "../../utils/swal/simple/SwalSimple";
import {LocalStorage} from "../../utils/localstorage/LocalStorage";

export const DefaultErrorReactor: { [code: number]: () => void } = {
	401: () => {
		// 토큰 없음
		SwalSimple('세션이 종료 되었습니다', 'info', () => {
			LocalStorage.clearToken();
			window.location.href = '/';
		});

	},

	403: () => {
		// 세션 만료
		SwalSimple('세션이 종료 되었습니다', 'error', () => {
			LocalStorage.clearToken();
			window.location.href = '/';
		});

	},
	500: () => {
		SwalSimple('실패하였습니다.<br/>다시 시도하여 주십시오', 'error');
	}
};
