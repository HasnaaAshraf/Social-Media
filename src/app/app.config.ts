import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, RouterModule, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { headerInterceptor } from './shared/interceptors/header.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [ provideHttpClient(  withFetch(),withInterceptors([headerInterceptor]) ) , provideAnimations(), provideRouter(routes , withInMemoryScrolling({scrollPositionRestoration:'top'})), provideClientHydration() , importProvidersFrom(HttpClientModule , RouterModule , BrowserAnimationsModule  )
  ]
  };
