export class LocalStorage {
	static setToken(token: string) {
		localStorage.setItem('auth-token', token);
	}

	static getToken(): string {
		return localStorage.getItem('auth-token') || '';
	}

	static clearToken() {
		localStorage.removeItem('auth-token');
	}
}
