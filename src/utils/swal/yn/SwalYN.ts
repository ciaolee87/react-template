import withReactContent from "sweetalert2-react-content";
import Swal, {SweetAlertIcon} from "sweetalert2";


const MySwal = withReactContent(Swal);


const SwalYN = (msg: string, icon: SweetAlertIcon, ok?: () => void, cancel?: () => void) => {
	MySwal.fire({
		title: msg,
		icon: icon,
		showCancelButton: true,
		showConfirmButton: true,
		confirmButtonText: '확인',
		cancelButtonText: '취소'
	}).then(value => {
		if (value.value) {
			if (ok) {
				ok();
			}
		} else {
			if (cancel) {
				cancel();
			}
		}
	});
};

export default SwalYN;
