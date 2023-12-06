export interface ResponderInterface {
  respond: (request: Request) => Promise<Response | void>;
}
