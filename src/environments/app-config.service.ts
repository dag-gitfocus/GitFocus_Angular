import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAppConfig } from './i-app-config';

@Injectable()
export class AppConfigService {

    ENVIRONMENTS = {
        DEV: {ENV_NAME:'DEV', URL:'localhost', REG:/^.*localhost.*/},
        PROD: {ENV_NAME:'PROD', URL:'a93b599817d0b4596afc88c60263caf0-1052088620.ap-south-1.elb.amazonaws.com', REG:/^a93b599817d0b4596afc88c60263caf0-1052088620.ap-south-1.elb.amazonaws.com/}
    }

    static setting : IAppConfig;
    
    envConfigFilePrefix = "/assets/config/app-config-";
    envConfigFileExtn = ".json";

    constructor(private http: HttpClient) {}
 
    load() {
        return new Promise<void>((resolve, reject) => {
            let configEnvFileName = this.envConfigFilePrefix + this.getENV() + this.envConfigFileExtn;
            this.http.get(configEnvFileName).toPromise().then((response : IAppConfig) => {
               AppConfigService.setting = <IAppConfig>response;
               resolve();
            }).catch((response: any) => {
               reject(`Could not load the config file`);
            });
        });
    }

    private getENV(): string {
        const hostname = window && window.location && window.location.hostname;
        let ENV = "";
        if (this.ENVIRONMENTS.DEV.REG.test(hostname)) {
            ENV = this.ENVIRONMENTS.DEV.ENV_NAME;
        } else if (this.ENVIRONMENTS.PROD.REG.test(hostname)) {
            ENV = this.ENVIRONMENTS.PROD.ENV_NAME;
        }

        return ENV;
      } 
} 