/** @format */

import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogOut } from "./useLogOut";
import SpinnerMini from "../../ui/SpinnerMini";

function LogOut() {
  const { logout, isLoading } = useLogOut();
  return (
    <ButtonIcon disabled={isLoading} onClick={logout}>
      {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default LogOut;
