import Axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {BizReactor, BizResponse} from "./types";
import {DefaultErrorReactor} from "./DefaultErrorReactor";
import SwalPasswd from "../../utils/swal/passwd/SwalPasswd";
import {pbkdf2Sync} from "crypto";
import {LocalStorage} from "../../utils/localstorage/LocalStorage";
import {saveAs} from 'file-saver';


class ApiUnit {
	// T 는 응답 형태, response.data 형
	protected post<T>(url: string, reactor: BizReactor<T>, data?: any, config?: AxiosRequestConfig) {
		Axios.post<BizResponse<T>, AxiosResponse<BizResponse<T>>>(url, data, this.getConfig(config))
		.then(res => {
			this.react(res.data, reactor);
		})
		.catch(reason => {
			this.errorReactor(reason, reactor);
		})
	}

	protected postWithPasswd<T>(url: string, reactor: BizReactor<T>, data?: any, config?: AxiosRequestConfig) {
		SwalPasswd(password => {
			Axios.get<BizResponse<string>, AxiosResponse<BizResponse<string>>>('/api/member/salt', this.getConfig(config)).then(resSalt => {
				const salt = resSalt.data.body;
				const saltedPasswd = pbkdf2Sync(password, salt, 10324, 64, 'sha512').toString('hex');
				const body = {...data, passwd: saltedPasswd};
				this.post(url, reactor, body, this.getConfig(config));
			});
		});
	}

	protected get<T>(url: string, reactor: BizReactor<T>, config?: AxiosRequestConfig) {
		Axios.get<BizResponse<T>, AxiosResponse<BizResponse<T>>>(url, this.getConfig(config)).then(res => {
			this.react(res.data, reactor);
		})
		.catch(reason => {
			this.errorReactor(reason, reactor);
		})
	}

	protected put<T>(url: string, reactor: BizReactor<T>, data?: any, config?: AxiosRequestConfig) {
		Axios.put<BizResponse<T>, AxiosResponse<BizResponse<T>>>(url, data, this.getConfig(config))
		.then(res => {
			this.react(res.data, reactor);
		})
		.catch(reason => {
			this.errorReactor(reason, reactor);
		});
	}

	// post 방식
	protected downloadPost(url: string, filename: string, fileType: string, cb: () => void, body?: any) {
		Axios.post(url, body, this.getConfig({responseType: "blob"})).then(res => {
			saveAs(new Blob([res.data], {type: fileType}), filename);
			cb();
		});
	}

	private react<T>(value: BizResponse<T>, reactor: BizReactor<T>) {
		if (reactor.before) {
			reactor.before();
		}

		if (value.code === 200) {
			reactor.success(value);
		} else if (reactor.hasOwnProperty(value.code)) {
			reactor[value.code](value);
		} else if (reactor.default) {
			reactor.default(value);
		}

		if (reactor.complete) {
			reactor.complete(value);
		}
	}

	private errorReactor<T>(reason: any, reactor: BizReactor<T>) {

		if (!reason.response) {
			console.log(reason);
			return;
		}

		if (!reason.response.hasOwnProperty('status')) {
			return;
		}
		const errorCode = reason.response.status;
		if (DefaultErrorReactor.hasOwnProperty(errorCode)) {
			DefaultErrorReactor[errorCode]();
		}
	}

	// 헤더에 키값 입력해주는 메소
	private getConfig(config?: AxiosRequestConfig): AxiosRequestConfig {

		const session = LocalStorage.getSession();

		if (config) {
			if (config.headers) {
				config.headers = {
					...config.headers,
					'session-cookie': LocalStorage.getSession()
				}
			} else {
				config.headers = {
					'session-cookie': LocalStorage.getSession()
				}
			}

			return config
		} else {
			return {
				headers: {
					'session-cookie': LocalStorage.getSession()
				}
			}
		}

	}
}


export default ApiUnit;
