export enum ExchangeType {
  TOPIC = 'topic',
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
export const CTMCORE_LOG_QUE = 'ctmcore.log'
export const CTMCORE_CONTROL_QUE = 'ctmcore.control'
export const CTMCORE_HBHEALTH_QUE = 'ctmcore.hbhealth'
export const CTMCORE_NONTRANSAC_QUE = 'ctmcore.nontransac'
export const CTMCORE_TRANSACT_CASHIN_QUE = 'ctmcore.transac.cashin'
export const CTMCORE_TRANSACT_CASHOUT_QUE = 'ctmcore.transac.cashout'
export const CTMCORE_TRANSACT_SENDMONEY_QUE = 'ctmcore.transac.sendmoney'
export const CTMCORE_TRANSACT_PAYBILLS_QUE = 'ctmcore.transac.paybills'

export const TPAY_LOG_QUE = 'tpay.log'
export const TPAY_CONTROL_QUE = 'tpay.control'
export const TPAY_HBHEALTH_QUE = 'tpay.hbhealth'
export const TPAY_NONTRANSAC_QUE = 'tpay.nontransac'
export const TPAY_TRANSACT_CASHIN_QUE = 'tpay.transac.cashin'
export const TPAY_TRANSACT_CASHOUT_QUE = 'tpay.transac.cashout'
export const TPAY_TRANSACT_SENDMONEY_QUE = 'tpay.transac.sendmoney'
export const TPAY_TRANSACT_PAYBILLS_QUE = 'tpay.transac.paybills'

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

export const TPAY_TRANSACTION_REQUEST_KEYS = TRANSACTION_TYPES.map( (t) => `tpay.transac.request.${t}` );
export const TPAY_TRANSACTION_RESPONSE_KEYS = TRANSACTION_TYPES.map( (t) => `tpay.transac.response.${t}` );

export const CTMCORE_BINDINGS = [
  { exchange: TPAY_LOG_QUE, queue: TPAY_LOG_QUE, routingKey: '#' },
  { exchange: TPAY_CONTROL_QUE, queue: TPAY_CONTROL_QUE, routingKey: '#' },
  { exchange: TPAY_HBHEALTH_QUE, queue: TPAY_HBHEALTH_QUE, routingKey: '#' },
  { exchange: TPAY_NONTRANSAC_QUE, queue: TPAY_NONTRANSAC_QUE, routingKey: '#' },
  { exchange: TPAY_TRANSACT_CASHIN_QUE, queue: TPAY_TRANSACT_CASHIN_QUE, routingKey: '#' },
  { exchange: TPAY_TRANSACT_CASHOUT_QUE, queue: TPAY_TRANSACT_CASHOUT_QUE, routingKey: '#' },
  { exchange: TPAY_TRANSACT_SENDMONEY_QUE, queue: TPAY_TRANSACT_SENDMONEY_QUE, routingKey: '#' },
  { exchange: TPAY_TRANSACT_PAYBILLS_QUE, queue: TPAY_TRANSACT_PAYBILLS_QUE, routingKey: '#' },
  { exchange: CTM_NONTRANSAC_EXCHANGE, queue: `R11-OPMD5KFCO10009LC.nontransac`, routingKey: 'R11-OPMD5KFCO10009LC.#' },
  { exchange: CTM_NONTRANSAC_EXCHANGE, queue: `R11-OPME271MP20004LC.nontransac`, routingKey: 'R11-OPME271MP20004LC.#' },
  { exchange: CTM_EXCHANGE, queue: `R11-OPMD5KFCO10009LC.transac`, routingKey: 'R11-OPMD5KFCO10009LC.#' },
  { exchange: CTM_EXCHANGE, queue: `R11-OPME271MP20004LC.transac`, routingKey: 'R11-OPME271MP20004LC.#' },
]