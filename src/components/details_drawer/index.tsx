import "./drawer-details.css";
import { Drawer, Spin, Modal } from "antd";
import { useEffect, useState } from "react";
import { Tender } from "../../interfaces/tender";
import { useGetTenderByCode } from "../../hooks/queries/useGetTenderByCode";

export interface drawerDetailsProps {
  code: string;
  drawerState: boolean;
  setCode: (code: string) => void;
  setDrawerState: (open: boolean) => void;
}

const DrawerDetails: React.FC<drawerDetailsProps> = (props) => {
  const [tender, setTender] = useState<Tender>();
  const { isLoading, error, refetch, data } = useGetTenderByCode(props.code);

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  
  useEffect(()=> {setConfirmLoading(isLoading);}, [isLoading]);

  useEffect(() => {
    if (props.drawerState) {
      setOpen(props.drawerState);
    }
  }, [props.drawerState]);

  useEffect(() => {
    if (data && data.Listado) {
      console.log({ result: data.Listado[0] });
      setTender(data.Listado[0]);
    }
  }, [data]);

  return (
    <div className="main">
      <Modal
        title="Title"
        open={open}
        confirmLoading={confirmLoading}
      >
        <p>{modalText}</p>
      </Modal>
    </div>
  );
};

export default DrawerDetails;
