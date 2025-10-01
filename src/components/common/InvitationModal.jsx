import React, { useState } from "react";
import ModalCommon from "./ModalCommon";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { processInvitationResponse } from "../../Store/Actions/userActions";
import { getCurrentUser } from "../../Store/Actions/authActions";

const InvitationModal = ({
  invitation,
  handleOtherFunctionalities = () => {},
}) => {
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(invitation ? true : false);
  const [isLoading, setIsLoading] = useState({
    accept: false,
    reject: false,
  });
  const handleModalChange = async (data = {}) => {
    try {
      if (data?.status === "Rejected") {
        setIsLoading((prev) => ({ ...prev, reject: true }));
      } else setIsLoading((prev) => ({ ...prev, accept: true }));
      console.log("Modal closed");
      if (!!data) {
        console.log("data", data);
        await dispatch(processInvitationResponse(data)).unwrap();
        console.log("Call the api now");
        await dispatch(getCurrentUser()).unwrap();
        handleOtherFunctionalities();
      }
      setOpenModal(!openModal);
    } catch (err) {
      await dispatch(getCurrentUser()).unwrap();
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <ModalCommon
      open={openModal}
      onOpenChange={setOpenModal}
      onCloseData={{ id: invitation?.id, status: "Rejected" }}
      ModalStyle="sm:max-w-[40rem]"
      headerTitle={
        <p className="font-normal">
          <b>
            {invitation?.user_business_role?.business?.business_name ||
              invitation?.business}
          </b>{" "}
          has invited you to collaborate as
          <b>
            {" "}
            {invitation?.user_business_role?.role?.name ||
              invitation?.role_name}
          </b>
        </p>
      }
      headerDescription={
        <p>
          {invitation?.user_business_role?.role?.description ||
            invitation?.role_description}
        </p>
      }
    >
      <div className="flex items-center justify-end gap-3">
        <Button
          variant="destructive"
          onClick={() =>
            handleModalChange({ id: invitation?.id || invitation?.invitation, status: "Rejected" })
          }
          isLoading={isLoading?.reject}
        >
          Reject
        </Button>
        <Button
          variant="hover-blue-fit"
          onClick={() =>
            handleModalChange({
              id: invitation?.id || invitation?.invitation,
              status: "Accepted",
            })
          }
          isLoading={isLoading?.accept}
        >
          Accept
        </Button>
      </div>
    </ModalCommon>
  );
};

export default InvitationModal;
