export function generateUniqueId(): string {
  const now = Date.now(); // current time in ms
  const timePart = now.toString(36); // convert to base36 (alphanumeric)
  const randomPart = Math.random().toString(36).substring(2, 6); // random chars
  return (timePart + randomPart).substring(0, 12).toUpperCase(); // 12 chars
}

export function capitalizeString(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function formatMQResponse(
  msgType: string, 
  data:Record<string, any>
){
  return { msgType, data }
}

// export function getMachineQue(terminalId: string){ 
//   return `${CTM_QUE}.${terminalId}`
// }