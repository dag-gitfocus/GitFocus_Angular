import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAppConfig } from './i-app-config';

@Injectable()
export class AppConfigService {

    ENVIRONMENTS = {
        QA: {ENV_NAME:'QA', URL:'d9143859-gitfocusns-gitfoc-3d5c-2102416299.ap-south-1.elb.amazonaws.com/', REG:/^d9143859-gitfocusns-gitfoc-3d5c-2102416299.ap-south-1.elb.amazonaws.com/},
        PROD: {ENV_NAME:'PROD', URL:'d9143859-gitfocusangularns-66c5-438830651.ap-south-1.elb.amazonaws.com/', REG:/^d9143859-gitfocusangularns-66c5-438830651.ap-south-1.elb.amazonaws.com/}
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
        if (this.ENVIRONMENTS.QA.REG.test(hostname)) {
            ENV = this.ENVIRONMENTS.QA.ENV_NAME;
        } else if (this.ENVIRONMENTS.PROD.REG.test(hostname)) {
            ENV = this.ENVIRONMENTS.PROD.ENV_NAME;
        }

        return ENV;
      } 
} 
