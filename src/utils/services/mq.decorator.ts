import { SetMetadata } from "@nestjs/common";

export const ROUTE_KEY_METADATA = "ROUTE_KEY_METADATA";

export const RouteKey = (routingKeys: string | string[]) =>
  SetMetadata(ROUTE_KEY_METADATA, Array.isArray(routingKeys) ? routingKeys : [routingKeys]);
