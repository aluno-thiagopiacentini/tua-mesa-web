import axios from 'axios';
import { AxiosInstance } from 'axios';
import { ErrorHandler } from '@angular/core';
import { Injectable } from '@angular/core';

export interface Params {
  [key: string]: any;
}

export interface PostOptions {
  url: string;
  params?: Params;
  headers?: Params;
  data?: any;
  auth?: {
    username: string;
    password: string;
  };
}

export interface ErrorResponse {
  id: string;
  code: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiClient {
  private axiosClient: AxiosInstance;
  private errorHandler: ErrorHandler;

  constructor(errorHandler: ErrorHandler) {
    this.errorHandler = errorHandler;

    // 	// The ApiClient wraps calls to the underlying Axios client.
    this.axiosClient = axios.create({
      baseURL: `http://www.tuamesa.com.br:8080`,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-Initialized-At': Date.now().toString(),
      },
      timeout: 30000,
      withCredentials: true,
    });
  }

  // ---
  // PUBLIC METHODS.
  // ---

  // I perform a GET request with the given options.
  // public async get<T>( options: GetOptions ) : Promise<T> {

  // 	try {

  // 		var axiosResponse = await this.axiosClient.request<T>({
  // 			method: "get",
  // 			url: options.url,
  // 			params: options.params
  // 		});

  // 		return( axiosResponse.data );

  // 	} catch ( error ) {

  // 		return( Promise.reject( error ) );

  // 	}

  // }

  public async post(options: PostOptions): Promise<void> {
    try {
      const res = await this.axiosClient.request({
        method: 'post',
        url: options.url,
        params: options.params,
        data: options.data,
        headers: options.headers,
        auth: options.auth,
      });
    } catch (error) {
      return Promise.reject(this.normalizeError(error));
    }
  }
  // ---
  // PRIVATE METHODS.
  // ---

  // Errors can occur for a variety of reasons. I normalize the error response so that
  // the calling context can assume a standard error structure.
  private normalizeError(error: any): ErrorResponse {
    this.errorHandler.handleError(error);

    // NOTE: Since I'm not really dealing with a production API, this doesn't really
    // normalize anything (ie, this is not the focus of this demo).
    return {
      id: '-1',
      code: 'UnknownError',
      message: 'An unexpected error occurred.',
    };
  }
}
