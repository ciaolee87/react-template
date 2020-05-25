import withReactContent from "sweetalert2-react-content";
import Swal, {SweetAlertIcon} from "sweetalert2";


const MySwal = withReactContent(Swal);


const SwalSimple = (msg: string, icon: SweetAlertIcon, callback?: () => void) => {
	MySwal.fire({
		title: msg,
		icon: icon,
		allowEnterKey: true
	}).then(value => {
		if (callback) {
			callback();
		}
	});
};

export default SwalSimple;
