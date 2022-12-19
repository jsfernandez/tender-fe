import { PushpinOutlined, ZoomInOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { RECORD_STATES_LABEL } from "../const/states";
import { Tender } from "../interfaces/tender";
import { convertToCLTime } from "../shared/utils/dates";

export interface MarkedTenderProps {
  tender: Tender;
  index: number;
  unmarkTender: (index: number) => void;
  openDrawer: (codigo: string) => void;
}

export const MarkedTenderComponent: React.FC<MarkedTenderProps> = ({
  tender,
  index,
  unmarkTender,
  openDrawer,
}) => {
  return (
    <Card
      hoverable
      title={RECORD_STATES_LABEL[tender.CodigoEstado]}
      bordered={false}
      className="card"
      actions={[
        <PushpinOutlined
          key="pushpin"
          onClick={() => {
            unmarkTender(index);
          }}
        />,
        <ZoomInOutlined
          key="search"
          onClick={() => {
            openDrawer(tender.CodigoExterno);
          }}
        />,
      ]}
      key={tender.CodigoExterno}
    >
      <p className="text">{tender.Nombre.toLocaleLowerCase()}</p>
      <p className="close-date">
        {convertToCLTime(new Date(tender.FechaCierre))}
      </p>
    </Card>
  );
};
