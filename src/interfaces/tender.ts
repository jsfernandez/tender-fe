export interface GenericObject { [key: string]: any }

export interface Producto {
  Correlativo: number;
  CodigoProducto: number;
  CodigoCategoria: string;
  Categoria: string;
  NombreProducto: string;
  Descripcion: string;
  UnidadMedida: string;
  Cantidad: number;
  Adjudicacion: number | string;
}

export interface Items {
  Cantidad: number;
  Listado: Producto[];
}

export interface Comprador {
    CodigoOrganismo: string,
    NombreOrganismo: string,
    RutUnidad: string,
    CodigoUnidad: string,
    NombreUnidad: string,
    DireccionUnidad: string,
    ComunaUnidad:string,
    RegionUnidad: string,
    RutUsuario: string,
    CodigoUsuario: string,
    NombreUsuario: string,
    CargoUsuario:string
}

export interface Tender {
    CodigoExterno: string,
    Nombre: string,
    CodigoEstado: number,
    Descripcion: string,
    FechaCierre: string,
    Estado: string,
    Comprador: Comprador,
    DiasCierreLicitacion: string,
    Informada: number,
    CodigoTipo: number,
    Tipo: string,
    TipoConvocatoria: string,
    Moneda: string,
    Etapas: number,
    EstadoEtapas: string,
    TomaRazon: string,
    EstadoPublicidadOfertas: number,
    JustificacionPublicidad: string,
    Contrato: string,
    Obras: string,
    CantidadReclamos: number,
    Fechas: GenericObject,
    UnidadTiempoEvaluacion: number,
    DireccionVisita: string,
    DireccionEntrega: string,
    Estimacion: number,
    FuenteFinanciamiento: string,
    VisibilidadMonto: number,
    MontoEstimado: number,
    Tiempo: null,
    UnidadTiempo: string,
    Modalidad: number,
    TipoPago: string,
    NombreResponsablePago: string,
    EmailResponsablePago: string,
    NombreResponsableContrato: string,
    EmailResponsableContrato: string,
    FonoResponsableContrato: string,
    ProhibicionContratacion: string,
    SubContratacion: string,
    UnidadTiempoDuracionContrato: number,
    TiempoDuracionContrato: number,
    TipoDuracionContrato: string,
    JustificacionMontoEstimado: string,
    ObservacionContract: string,
    ExtensionPlazo: number,
    EsBaseTipo: number,
    UnidadTiempoContratoLicitacion: string,
    ValorTiempoRenovacion: string,
    PeriodoTiempoRenovacion: string,
    EsRenovable: number,
    Adjudicacion: string,
    Items: Items,
}