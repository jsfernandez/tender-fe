import { PushpinOutlined, ZoomInOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { RECORD_STATES_LABEL } from "../const/states";
import { Tender } from "../interfaces/tender";
import { convertToCLTime } from "../shared/utils/dates";

export interface SimpleTenderProps {
  tender: Tender;
  markTender: (tender: Tender) => void;
  openDrawer: (codigo: string) => void;
}

export const SimpleTenderComponent: React.FC<SimpleTenderProps> = ({
  tender,
  markTender,
  openDrawer,
}) => {
  return (
    <Card
      hoverable
      title={RECORD_STATES_LABEL[tender.CodigoEstado!]}
      bordered={false}
      className="card"
      actions={[
        <PushpinOutlined
          key="pushpin"
          onClick={() => {
            markTender(tender as Tender);
          }}
        />,
        <ZoomInOutlined
          key="search"
          onClick={() => {
            openDrawer(tender.CodigoExterno || "1");
          }}
        />,
      ]}
      key={tender.CodigoExterno}
    >
      <p className="text">{tender.Nombre!.toLocaleLowerCase()}</p>
      <p className="close-date">
        {convertToCLTime(new Date(tender.FechaCierre!))}
      </p>
    </Card>
  );
};
