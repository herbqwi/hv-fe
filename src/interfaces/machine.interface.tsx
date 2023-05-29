export interface IMachine {
  id?: number,
  name?: string,
  location?: string | null,
  status?: boolean,
  stock?: number,
  temperature?: number,
  max_rows?: number,
  max_stock?: number,
  owner?: number | null,
  token?: string,
  available?: boolean,
  reason?: string | null,
}