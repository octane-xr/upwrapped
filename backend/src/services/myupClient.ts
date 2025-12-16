import { request } from 'undici';
import { writeFileSync } from 'fs';
import type { LoginCredentials, HomePageData, CalificacionesPageData } from '../types';
import { parseHomePage } from './parsers/homeParser';
import { parseCalificacionesPage } from './parsers/calificacionesParser';

const BASE_URL = 'https://wwws.palermo.edu';
const TIMEOUT = parseInt(process.env.REQUEST_TIMEOUT_MS || '15000', 10);

export class MyUPClient {
  private cookieJar: Map<string, string>;
  
  constructor() {
    this.cookieJar = new Map();
  }

  private getCookieHeader(): string {
    return Array.from(this.cookieJar.entries())
      .map(([key, value]) => `${key}=${value}`)
      .join('; ');
  }

  private parseCookies(setCookieHeaders: string[]): void {
    for (const cookie of setCookieHeaders) {
      const [nameValue] = cookie.split(';');
      const [name, value] = nameValue.split('=');
      if (name && value) {
        this.cookieJar.set(name.trim(), value.trim());
      }
    }
  }

  async login(credentials: LoginCredentials): Promise<void> {
    try {
      console.log(' Intentando login a MyUP...');
      console.log('Usuario:', credentials.username);
      

      console.log(' PASO 1: Obteniendo cookie de sesión...');
      const loginPageResponse = await request(`${BASE_URL}/cgi-bin/myup/login.pl`, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
        bodyTimeout: TIMEOUT,
        headersTimeout: TIMEOUT,
      });


      const initialCookies = loginPageResponse.headers['set-cookie'];
      if (initialCookies) {
        const cookies = Array.isArray(initialCookies) ? initialCookies : [initialCookies];
        this.parseCookies(cookies);
        console.log(' Cookie de sesión inicial recibida:', Array.from(this.cookieJar.keys()));
      }


      await loginPageResponse.body.text();


      console.log(' PASO 2: Enviando credenciales...');
      

      const body = `action=ingresar&page=myup.pl&usuario=${encodeURIComponent(credentials.username)}&password=${encodeURIComponent(credentials.password)}`;

      console.log(' Body enviado:', body.replace(encodeURIComponent(credentials.password), '****'));

      const response = await request(`${BASE_URL}/cgi-bin/myup/login.pl`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Cookie': this.getCookieHeader(),
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'es-AR,es;q=0.9,en;q=0.8',
          'Referer': `${BASE_URL}/cgi-bin/myup/login.pl`,
          'Origin': BASE_URL,
        },
        body,
        bodyTimeout: TIMEOUT,
        headersTimeout: TIMEOUT,
        maxRedirections: 5,
      });

      console.log(' Status Code:', response.statusCode);


      const setCookieHeaders = response.headers['set-cookie'];
      if (setCookieHeaders) {
        const cookies = Array.isArray(setCookieHeaders) ? setCookieHeaders : [setCookieHeaders];
        this.parseCookies(cookies);
        console.log(' Cookies de login recibidas:', Array.from(this.cookieJar.keys()));
      } else {
        console.log('️ No se recibieron cookies del login');
        throw new Error('No se recibieron cookies de sesión');
      }

      const loginHtml = await response.body.text();
      

      if (loginHtml.includes('usuario o clave incorrectos') || 
          loginHtml.includes('Usuario o clave incorrectos') ||
          loginHtml.includes('error de autenticación')) {
        console.log(' Error: credenciales incorrectas');
        throw new Error('Credenciales incorrectas');
      }


      if (loginHtml.includes('URL=myup.pl') || loginHtml.includes('url=myup.pl')) {
        console.log(' Login exitoso - siguiendo redirect a myup.pl...');
        

        const myupResponse = await request(`${BASE_URL}/cgi-bin/myup/myup.pl`, {
          method: 'GET',
          headers: {
            'Cookie': this.getCookieHeader(),
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Referer': `${BASE_URL}/cgi-bin/myup/login.pl`,
          },
          bodyTimeout: TIMEOUT,
          headersTimeout: TIMEOUT,
        });

        const html = await myupResponse.body.text();
        

        try {
          writeFileSync('/tmp/myup_main_page.html', html);
          console.log(' Página principal guardada en /tmp/myup_main_page.html');
        } catch (err) {

        }


        if (html.includes('Avance de carrera') || html.includes('Alumno:')) {
          console.log(' ¡Login completamente exitoso! Acceso a myup.pl obtenido');
        } else {
          console.log('️ Login exitoso pero la página principal no se cargó correctamente');
          console.log('Longitud HTML:', html.length);
        }
      } else {
        console.log('️ No se detectó redirect esperado');
        throw new Error('Respuesta de login inesperada');
      }

    } catch (error: any) {
      if (error.message?.includes('credenciales') || error.message?.includes('Credenciales')) {
        throw error;
      }
      
      if (error.code === 'ETIMEDOUT' || error.code === 'ECONNABORTED') {
        throw new Error('MyUP no está disponible - timeout');
      }

      throw new Error('MyUP no está disponible en este momento');
    }
  }

  async fetchHomePage(): Promise<HomePageData> {
    try {
      const response = await request(`${BASE_URL}/cgi-bin/myup/myup.pl`, {
        method: 'GET',
        headers: {
          'Cookie': this.getCookieHeader(),
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
        bodyTimeout: TIMEOUT,
        headersTimeout: TIMEOUT,
      });

      const html = await response.body.text();

      if (response.statusCode !== 200) {
        throw new Error('Error al obtener datos de MyUP');
      }

      return parseHomePage(html);
    } catch (error: any) {
      if (error.code === 'ETIMEDOUT' || error.code === 'ECONNABORTED') {
        throw new Error('MyUP no está disponible - timeout');
      }
      throw new Error('Error al obtener datos del home de MyUP');
    }
  }

  async fetchCalificaciones(year?: number): Promise<CalificacionesPageData> {
    try {
      const url = year 
        ? `${BASE_URL}/cgi-bin/myup/myup_calificaciones.pl?anio=${year}`
        : `${BASE_URL}/cgi-bin/myup/myup_calificaciones.pl`;

      const response = await request(url, {
        method: 'GET',
        headers: {
          'Cookie': this.getCookieHeader(),
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
        bodyTimeout: TIMEOUT,
        headersTimeout: TIMEOUT,
      });

      const html = await response.body.text();

      if (response.statusCode !== 200) {
        throw new Error('Error al obtener calificaciones de MyUP');
      }

      return parseCalificacionesPage(html);
    } catch (error: any) {
      if (error.code === 'ETIMEDOUT' || error.code === 'ECONNABORTED') {
        throw new Error('MyUP no está disponible - timeout');
      }
      throw new Error('Error al obtener calificaciones de MyUP');
    }
  }
}

