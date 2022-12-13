import "./dashboard.css";
import {
  EllipsisOutlined,
  StarOutlined,
  ZoomInOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Card,
  Collapse,
  Descriptions,
  Divider,
  Drawer,
  Empty,
  Input,
  Skeleton,
  Spin,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import { RECORD_STATES_LABEL } from "../../const/states";
import { convertToCLTime } from "../../shared/utils/dates";
import { Tender } from "../../interfaces/tender";
import { useGetTenderList } from "../../hooks/queries/useGetTenderList";
import { useGetTenderByCode } from "../../hooks/queries/useGetTenderByCode";
import { transformToCurrency } from "../../shared/utils/currency";
import { TENDER_TYPES_LABELS } from "../../const/types";
import { BUDGE_TYPE_LABEL } from "../../const/budge";
import { PAYMENT_METHOD_LABEL } from "../../const/paymentMethod";
import { UNITS_TIME_LABEL } from "../../const/unitsTime";

const { Panel } = Collapse;
const { Search } = Input;

const Dashboard = () => {
  const [tender, setTender] = useState<Tender>();
  const [tenderList, setTenderList] = useState<Tender[]>([]);
  const [querySearch, setQuerySearch] = useState("");
  const [loading, setLoading] = useState(false);
  const { isLoading, error, data } = useGetTenderList();

  const [open, setOpen] = useState(false);
  const [code, setCode] = useState<string>("");

  const {
    isLoading: loadingTender,
    error: tenderError,
    refetch,
    data: tenderData,
  } = useGetTenderByCode(code);

  useEffect(() => {
    if (isLoading === false && data && data.Listado) {
      const result = data.Listado;
      setTenderList(result || []);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (querySearch !== "") {
      try {
        const filteringResults = data?.Listado.filter(
          (tender) =>
            tender.Nombre !== null &&
            tender.CodigoExterno !== null &&
            tender.FechaCierre !== null &&
            (tender.Nombre.toString()
              .toLowerCase()
              .indexOf(querySearch.toLowerCase()) > 0 ||
              tender.CodigoExterno.toString()
                .toLowerCase()
                .indexOf(querySearch.toLowerCase()) > 0 ||
              tender.FechaCierre.toString()
                .toLowerCase()
                .indexOf(querySearch.toLowerCase()) > 0)
        );
        setTenderList(filteringResults || []);
      } catch (error) {
        console.log({ error });
      }
    } else {
      const result = data?.Listado;
      setTenderList(result || []);
    }
  }, [querySearch, data]);

  useEffect(() => {
    if (tenderData && tenderData.Listado) {
      setTender(tenderData.Listado[0]);
    }
  }, [tenderData]);
  const onSearch = (value: string) => setQuerySearch(value);

  const openDrawer = async (code: string) => {
    setOpen(true);
    setCode(code);
  };

  useEffect(() => {
    setLoading(Boolean(isLoading || loadingTender));
  }, [isLoading, loadingTender]);

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (code && code !== "") {
      setTender(undefined);
      refetch();
    }
  }, [code, refetch]);

  return (
    <div className="main">
      <Spin spinning={loading} tip="Cargando" size="large">
        <>
          {data && tenderList.length > 0 && (
            <p className="page-header-text">
              <b>{tenderList.length}</b> oportunidades encontradas en todo Chile
            </p>
          )}
        </>
        <div className="search-bar">
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </div>
        <>{data && tenderList.length === 0 && <Empty />}</>
        <div className="cards">
          {tenderList &&
            tenderList.length > 0 &&
            tenderList.map((tender) => {
              return (
                <Card
                  title={RECORD_STATES_LABEL[tender.CodigoEstado]}
                  bordered={false}
                  className="card"
                  actions={[
                    <StarOutlined key="favorite" />,
                    <ZoomInOutlined
                      key="search"
                      onClick={() => {
                        openDrawer(tender.CodigoExterno);
                      }}
                    />,
                    <EllipsisOutlined key="ellipsis" />,
                  ]}
                  key={tender.CodigoExterno}
                >
                  <p className="text">{tender.Nombre.toLocaleLowerCase()}</p>
                  <p className="close-date">
                    {convertToCLTime(new Date(tender.FechaCierre))}
                  </p>
                </Card>
              );
            })}
        </div>
      </Spin>
      <>
        {error && (
          <Alert
            className="alert"
            message="Error"
            description="This is an error message about copywriting."
            type="error"
            showIcon
          />
        )}
      </>

      <>
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
              <Collapse defaultActiveKey={['1']}>
                <Panel header="Descripción" key="1">
                  <p className="tender-description-text">{tender.Descripcion}</p>
                  <ul className="tender-ul-description">
                    <li>
                      Periodos de evaluación:{" "}
                      {UNITS_TIME_LABEL[tender.UnidadTiempoEvaluacion]}
                    </li>
                    <li>
                      Duración de contrato:{" "}
                      {tender.TiempoDuracionContrato} {UNITS_TIME_LABEL[tender.UnidadTiempoDuracionContrato]}
                    </li>
                    <li>
                      Modalidad de pago: {PAYMENT_METHOD_LABEL[tender.Modalidad]}
                    </li>
                    <li>
                      Se permite Sub-Contratacion: {tender.SubContratacion ? 'Si' : 'No'}
                    </li>
                  </ul>
                  <p className="tender-amout-info">
                    {BUDGE_TYPE_LABEL[tender.Estimacion]}&nbsp; $
                    {transformToCurrency(tender.MontoEstimado || 0)} {tender.Moneda}
                  </p>
                </Panel>
                {tender && tender.Items.Cantidad > 0 && (
                  <Panel header={`Productos requeridos (${tender.Items.Cantidad})`} key="2">
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
      </>
    </div>
  );
};

export default Dashboard;
