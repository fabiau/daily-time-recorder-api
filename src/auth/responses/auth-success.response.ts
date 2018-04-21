export class AuthSuccessResponse {
  constructor(readonly expires_in: number, readonly access_token: string) {}
}