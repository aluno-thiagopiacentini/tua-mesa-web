export interface Payload {
  name: string;
  email: string;
}
export interface Auth {
  payload: Payload;
  token: string;
}
