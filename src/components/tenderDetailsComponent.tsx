import { Collapse, Descriptions, Divider, Drawer, Skeleton, Tag } from "antd";
import { useEffect, useState } from "react";
import { BUDGE_TYPE_LABEL } from "../const/budge";
import { PAYMENT_METHOD_LABEL } from "../const/paymentMethod";
import { TENDER_TYPES_LABELS } from "../const/types";
import { UNITS_TIME_LABEL } from "../const/unitsTime";
import { useGetTenderByCode } from "../hooks/queries/useGetTenderByCode";
import { Tender } from "../interfaces/tender";
import { transformToCurrency } from "../shared/utils/currency";

const { Panel } = Collapse;

export interface TenderDetailsProps {
  code: string;
  onClose: () => void;
  open: boolean;
}

export const TenderDetailsComponent: React.FC<TenderDetailsProps> = ({
  onClose,
  open,
  code,
}) => {
  const [tender, setTender] = useState<Tender>()
  const { data, refetch } = useGetTenderByCode(code);
  console.log({ code })
  useEffect(() => {
    if (code) {
      refetch()
    }
  }, [code]);

  useEffect(()=> {
    if (data) {
      setTender(data.Listado[0])
    }
  }, [data]);

  return (
    <Drawer
      title="Información basica de la licitación"
      placement="right"
      onClose={onClose}
      open={open}
    >
      <>
        <Skeleton active loading={Boolean(!tender?.Descripcion)} />
      </>
      {tender && tender.Descripcion && (
        <div>
          <h1>{tender.Nombre}</h1>
          <Divider orientation="right">
            <Tag color="gold">Reclamos recibidos {tender.CantidadReclamos}</Tag>
          </Divider>
          <p className="tender-type-text">
            * {TENDER_TYPES_LABELS[tender.Tipo]} *
          </p>
          <Collapse defaultActiveKey={["1"]}>
            <Panel header="Descripción" key="1">
              <p className="tender-description-text">{tender.Descripcion}</p>
              <ul className="tender-ul-description">
                <li>
                  Periodos de evaluación:{" "}
                  {UNITS_TIME_LABEL[tender.UnidadTiempoEvaluacion]}
                </li>
                <li>
                  Duración de contrato: {tender.TiempoDuracionContrato}{" "}
                  {UNITS_TIME_LABEL[tender.UnidadTiempoDuracionContrato]}
                </li>
                <li>
                  Modalidad de pago: {PAYMENT_METHOD_LABEL[tender.Modalidad]}
                </li>
                <li>
                  Se permite Sub-Contratacion:{" "}
                  {tender.SubContratacion ? "Si" : "No"}
                </li>
              </ul>
              <p className="tender-amout-info">
                {BUDGE_TYPE_LABEL[tender.Estimacion]}&nbsp; $
                {transformToCurrency(tender.MontoEstimado || 0)} {tender.Moneda}
              </p>
            </Panel>
            {tender && tender.Items.Cantidad > 0 && (
              <Panel
                header={`Productos requeridos (${tender.Items.Cantidad})`}
                key="2"
              >
                {tender.Items.Listado.map((item) => {
                  return (
                    <>
                      <Descriptions title="" bordered key={item.CodigoProducto}>
                        <Descriptions.Item label="Nombre del Producto" span={3}>
                          {item.NombreProducto}
                        </Descriptions.Item>
                        <Descriptions.Item label="Codigo del Producto" span={3}>
                          {item.CodigoProducto}
                        </Descriptions.Item>
                        <Descriptions.Item label="Descripción" span={3}>
                          {item.Descripcion}
                        </Descriptions.Item>
                        <Descriptions.Item label="Codigo Categoria" span={3}>
                          {item.CodigoCategoria}
                        </Descriptions.Item>
                        <Descriptions.Item label="Categoria" span={3}>
                          {item.Categoria}
                        </Descriptions.Item>
                        <Descriptions.Item label="Cantidad" span={3}>
                          {item.Cantidad} {item.UnidadMedida}
                        </Descriptions.Item>
                      </Descriptions>
                      <br />
                    </>
                  );
                })}
              </Panel>
            )}
            <Panel header="Información del comprador" key="3">
              <Descriptions title="" bordered>
                <Descriptions.Item label="Codigo del Organismo" span={3}>
                  {tender.Comprador.CodigoOrganismo}
                </Descriptions.Item>
                <Descriptions.Item label="Nombre" span={3}>
                  {tender.Comprador.NombreOrganismo}
                </Descriptions.Item>
                <Descriptions.Item label="Nombre de Unidad" span={3}>
                  {tender.Comprador.NombreUnidad}
                </Descriptions.Item>
                <Descriptions.Item label="Codigo de Unidad" span={3}>
                  {tender.Comprador.RutUnidad}
                </Descriptions.Item>
                <Descriptions.Item label="Rut de Unidad" span={3}>
                  {tender.Comprador.CodigoUnidad}
                </Descriptions.Item>
                <Descriptions.Item label="Dirección" span={3}>
                  {tender.Comprador.DireccionUnidad},{" "}
                  {tender.Comprador.ComunaUnidad},{" "}
                  {tender.Comprador.RegionUnidad}
                </Descriptions.Item>
                <Descriptions.Item label="Usuario" span={3}>
                  {tender.Comprador.NombreUsuario}
                </Descriptions.Item>
                <Descriptions.Item label="Rut de usuario" span={3}>
                  {tender.Comprador.RutUsuario}
                </Descriptions.Item>
                <Descriptions.Item label="Cargo" span={3}>
                  {tender.Comprador.CargoUsuario}
                </Descriptions.Item>
              </Descriptions>
            </Panel>
          </Collapse>
        </div>
      )}
    </Drawer>
  );
};
