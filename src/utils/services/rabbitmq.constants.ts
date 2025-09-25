export enum ExchangeType {
  TOPIC = 'topic',
}

export const CTM_EXCHANGE = 'CTM'
export const CTMCORE_EXCHANGE = 'CTMCore'
export const TPAY_EXCHANGE = 'TraxionPay'

export const MQ_TTL = 300_000; // 5 mins
export const MQ_EXPIRES = 1_800_000; // 30 mins

export const X_CTM_Q1_NONTRANSACTION = "CTMNonTransaction";
export const X_CTM_Q2_LOGS = "CTMLogs";
export const X_CTM_Q3_CONTROL = "CTMcontrol";
export const X_CTM_Q4_HBHEALTH = "CTMHBHealth";
export const X_CTM_Q5_CASHINTRANSACTION = "CTMCashinTransaction";
export const X_CTM_Q6_CASHOUTTRANSACTION = "CTMCashoutTransaction";
export const X_CTM_Q7_SENDMONEYTRANSACTION = "CTMSendMoneyTransaction";
export const X_CTM_Q8_PAYBILLTRANSACTION = "CTMPaybillTransaction";
export const X_CTM_Q9_INQUIRYTRANSACTION = "CTMInquiryTransaction";

export const C_CTMCORE = "CTM_CORE";
export const X_CTMCORE = "CTMCore";
export const X_CTMCORE_Q1_NONTRANSACTION = "CTMCoreNonTransaction";
export const X_CTMCORE_Q2_LOGS = "CTMCoreLogs";
export const X_CTMCORE_Q3_CONTROL = "CTMCoreControl";
export const X_CTMCORE_Q4_HBHEALTH = "CTMCoreHBHealth";
export const X_CTMCORE_Q5_CASHINTRANSACTION = "CTMCoreCashinTransaction";
export const X_CTMCORE_Q6_CASHOUTTRANSACTION = "CTMCoreCashoutTransaction";
export const X_CTMCORE_Q7_SENDMONEYTRANSACTION = "CTMCoreSendMoneyTransaction";
export const X_CTMCORE_Q8_PAYBILLTRANSACTION = "CTMCorePaybillTransaction";
export const X_CTMCORE_Q9_INQUIRYTRANSACTION = "CTMCoreInquiryTransaction";

export const C_TPAY = "TPAY_APP";
export const X_TPAY = "TraxionPay";
export const X_TPAY_Q1_NONTRANSACTION = "TPayNonTransaction";
export const X_TPAY_Q2_LOGS = "TPayLogs";
export const X_TPAY_Q3_CONTROL = "TPayControl";
export const X_TPAY_Q4_HBHEALTH = "TPayHBHealth";
export const X_TPAY_Q5_CASHINTRANSACTION = "TPayCashinTransaction";
export const X_TPAY_Q6_CASHOUTTRANSACTION = "TPayCashoutTransaction";
export const X_TPAY_Q7_SENDMONEYTRANSACTION = "TPaySendMoneyTransaction";
export const X_TPAY_Q8_PAYBILLTRANSACTION = "TPayPaybillTransaction";
export const X_TPAY_Q9_INQUIRYTRANSACTION = "TPayInquiryTransaction";

export const C_CTMCTRLHUB = "CTM_CTRLHUB";
export const X_CTMCTRLHUB = "CTMcontrolHub";
export const X_CTMCTRLHUB_Q1_NONTRANSACTION = "CTMcontrolHubNonTransaction";
export const X_CTMCTRLHUB_Q2_LOGS = "CTMcontrolHubLogs";
export const X_CTMCTRLHUB_Q3_CONTROL = "CTMcontrolHubControl";
export const X_CTMCTRLHUB_Q4_HBHEALTH = "CTMcontrolHubHBHealth";
export const X_CTMCTRLHUB_Q5_CASHINTRANSACTION = "CTMcontrolHubCashinTransaction";
export const X_CTMCTRLHUB_Q6_CASHOUTTRANSACTION = "CTMcontrolHubCashoutTransaction";
export const X_CTMCTRLHUB_Q7_SENDMONEYTRANSACTION = "CTMcontrolHubSendMoneyTransaction";
export const X_CTMCTRLHUB_Q8_PAYBILLTRANSACTION = "CTMcontrolHubPaybillTransaction";
export const X_CTMCTRLHUB_Q9_INQUIRYTRANSACTION = "CTMcontrolHubInquiryTransaction";