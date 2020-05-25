import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import SwalSimple from "../simple/SwalSimple";


const MySwal = withReactContent(Swal);


const SwalPasswd = (callback: (password: string) => void) => {
	MySwal.fire({
		title: '2차 비밀번호를 입력하여 주십시오',
		input: 'password',
		inputPlaceholder: '비밀번호',
		inputAttributes: {
			autocapitalize: 'off',
			autocorrect: 'off'
		},
		backdrop: false,
		showCancelButton: true
	}).then(value => {
		if (value.dismiss !== Swal.DismissReason.cancel) {
			const password = value.value;
			if (password) {
				callback(password);
			} else {
				SwalSimple('비밀번호를 입력하여 주십시오.', 'error');
			}
		}
	});
};

export default SwalPasswd;
