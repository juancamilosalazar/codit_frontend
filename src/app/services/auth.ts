import { Injectable } from '@angular/core';
import { SignJWT } from 'jose';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'jwt_token';

  async login(username: string, password: string): Promise<boolean> {
    if (username === 'admin' && password === 'password') {
      const secret = new TextEncoder().encode('admin');
      const alg = 'HS256';

      // Firmamos el JWT internamente inyectando un email quemado 
      // para que FastAPI no te arroje 401 al buscarlo en la DB
      const realToken = await new SignJWT({ sub: 'juan@codit.com' })
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime('30m')
        .sign(secret);

      localStorage.setItem(this.TOKEN_KEY, realToken);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
