import "./dashboard.css";
import {
  Collapse,
  Empty,
  Input,
  Spin,
} from "antd";
import { useState } from "react";
import { Tender } from "../../interfaces/tender";
import { apiResponse } from "../../shared/mocks/tender-response";
import { MarkedTenderComponent } from "../../components/markedTenderComponent";
import { SimpleTenderComponent } from "../../components/simpleTenderComponent";
import { TenderDetailsComponent } from "../../components/tenderDetailsComponent";

const { Search } = Input;

const Dashboard = () => {
  const [bookmarkedTenders, setBookmarkedTenders] = useState<Tender[]>();
  const [tender, setTender] = useState<Tender>();
  const [tenderList, setTenderList] = useState<Partial<Tender>[]>(apiResponse);
  const [querySearch, setQuerySearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [code, setCode] = useState<string>("");

  const onSearch = (value: string) => setQuerySearch(value);

  const openDrawer = async (code: string) => {
    setOpen(true);
    setCode(code);
  };

  const onClose = () => {
    setOpen(false);
  };

  const markTender = (tender: Tender) => {
    const aux = bookmarkedTenders || [];
    const auxMap = new Map();
    aux.map((a) => auxMap.set(a.CodigoExterno, a));
    if (!auxMap.has(tender.CodigoExterno)) {
      aux.push(tender);
      setBookmarkedTenders(aux);
    }
  };

  const unmarkTender = (index: number) => {
    const aux = bookmarkedTenders?.slice(index);
    setBookmarkedTenders(aux);
  };

  return (
    <div className="main">
      <Spin spinning={loading} tip="Cargando" size="large">
        <>
          {tenderList.length > 0 && (
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
        <>{tenderList.length === 0 && <Empty />}</>
        <div className="cards">
          {bookmarkedTenders &&
            bookmarkedTenders.length > 0 &&
            bookmarkedTenders.map((tender, index) => {
              return (
                <MarkedTenderComponent
                  openDrawer={openDrawer}
                  unmarkTender={unmarkTender}
                  setTender={setTender}
                  tender={tender}
                  index={index}
                  key={tender.CodigoExterno}
                />
              );
            })}
        </div>
        <div className="cards">
          {tenderList &&
            tenderList.length > 0 &&
            tenderList.map((tender: Partial<Tender>) => {
              return (
                <SimpleTenderComponent
                  openDrawer={openDrawer}
                  markTender={markTender}
                  setTender={setTender}
                  tender={tender as Tender}
                  key={tender.CodigoExterno}
                />
              );
            })}
        </div>
      </Spin>
      <TenderDetailsComponent code={code} onClose={onClose} open={open} />
    </div>
  );
};
export default Dashboard;
