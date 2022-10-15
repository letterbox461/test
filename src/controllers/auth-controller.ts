class AuthController {
  public async googleAuth(request: any, res: any) {
    if (!request.auth.isAuthenticated) {
      return "Authentication failed due to: " + request.auth.error.message;
    }

    console.log(request.auth.credentials);

    return request.auth.credentials;
  }
}

export default new AuthController();
