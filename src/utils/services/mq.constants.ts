export enum ExchangeTypeEnum {
  DEAFULT = 'default',
  FANOUT = 'fanout',
  TOPIC = 'topic',
  DIRECT = 'direct',
}


export const MQ_TTL = 300_000; // 5 mins
export const MQ_EXPIRES = 1_800_000; // 30 mins

// for exchange
export const CTM_EXCHANGE = 'ctm'
export const CTMCORE_EXCHANGE = 'ctmcore'
export const CTMCONTROLLHUB_EXCHANGE = 'ctmcontrolhub'
export const TPAY_EXCHANGE = 'tpay'

export const CTM_NONTRANSAC_EXCHANGE = 'ctm.nontransac'
export const CTM_LOG_EXCHANGE = 'ctm.log'
export const CTM_HBHEALTH_EXCHANGE = 'ctm.hbhealth'
export const CTM_TRANSAC_EXCHANGE = 'ctm.transac'


// for que names
export const CTMCORE_LOG_QUE = `${CTMCORE_EXCHANGE}.log`
export const CTMCORE_CONTROL_QUE = `${CTMCORE_EXCHANGE}.control`
export const CTMCORE_HBHEALTH_QUE = `${CTMCORE_EXCHANGE}.hbhealth`
export const CTMCORE_NONTRANSAC_QUE = `${CTMCORE_EXCHANGE}.nontransac`
export const CTMCORE_TRANSACT_CASHIN_QUE = `${CTMCORE_EXCHANGE}.transac.cashin`
export const CTMCORE_TRANSACT_CASHOUT_QUE = `${CTMCORE_EXCHANGE}.transac.cashout`
export const CTMCORE_TRANSACT_SENDMONEY_QUE = `${CTMCORE_EXCHANGE}.transac.sendmoney`
export const CTMCORE_TRANSACT_PAYBILLS_QUE = `${CTMCORE_EXCHANGE}.transac.paybills`

export const TPAY_LOG_QUE = `${TPAY_EXCHANGE}.log`
export const TPAY_CONTROL_QUE = `${TPAY_EXCHANGE}.control`
export const TPAY_HBHEALTH_QUE = `${TPAY_EXCHANGE}.hbhealth`
export const TPAY_NONTRANSAC_QUE = `${TPAY_EXCHANGE}.nontransac`
export const TPAY_TRANSACT_CASHIN_QUE = `${TPAY_EXCHANGE}.transac.cashin`
export const TPAY_TRANSACT_CASHOUT_QUE = `${TPAY_EXCHANGE}.transac.cashout`
export const TPAY_TRANSACT_SENDMONEY_QUE = `${TPAY_EXCHANGE}.transac.sendmoney`
export const TPAY_TRANSACT_PAYBILLS_QUE = `${TPAY_EXCHANGE}.transac.paybills`

export const CTMCONTROLLHUB_LOG_QUE = 'tpay.log'
export const CTMCONTROLLHUB_CONTROL_QUE = 'tpay.control'
export const CTMCONTROLLHUB_HBHEALTH_QUE = 'tpay.hbhealth'
export const CTMCONTROLLHUB_NONTRANSAC_QUE = 'tpay.nontransac'

// for bindings
const TRANSACTION_TYPES = [
  'cashin',
  'cashout',
  'sendmoney',
  'paybills',
  'inquiry',
];

export const CTMCORE_TRANSACTION_REQUEST_KEYS = TRANSACTION_TYPES.map( (t) => `ctmcore.transac.request.${t}` );
export const CTMCORE_TRANSACTION_RESPONSE_KEYS = TRANSACTION_TYPES.map( (t) => `ctmcore.transac.response.${t}` );

export const TPAY_TRANSACTION_REQUEST_KEYS = TRANSACTION_TYPES.map( (t) => `transac.${t}` );

export const CTMCORE_BINDINGS = [ 
  { queue: 'traxionpay', exchangeType: ExchangeTypeEnum.DEAFULT },
  // { queue: 'ctm.R11-OPME271MP20004LC', exchangeType: ExchangeTypeEnum.DEAFULT }
]