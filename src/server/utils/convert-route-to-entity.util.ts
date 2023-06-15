const mapping: Record<string, string> = {
  'customer-requests': 'customer_request',
  'operation-plans': 'operation_plan',
  'satellite-data': 'satellite_data',
  'satellite-operators': 'satellite_operator',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
