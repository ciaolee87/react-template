export class LocalStorage {
	static setSession(token: string) {
		localStorage.setItem('session-cookie', token);
	}

	static getSession(): string {
		return localStorage.getItem('session-cookie') || '';
	}

	static clearSession() {
		localStorage.removeItem('session-cookie');
	}
}
