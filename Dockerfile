FROM node

RUN mkdir  /GitFocusAngular_kube

RUN git clone https://github.com/Sesh2020/GitFocusAngular_kube.git

WORKDIR /GitFocusAngular_kube

RUN npm install -g @angular/cli

RUN npm install

RUN pwd

RUN ls -l

RUN mv index.d.ts /GitFocusAngular_kube/node_modules/@types/chart.js

RUN pwd

RUN ls -l

RUN ng build

EXPOSE 4200

CMD [ "node", "/GitFocusAngular_kube/app.js" ]

RUN rm -r src output  e2e

RUN rm -f browserslist tsconfig.app.json README.md package-lock.json  tsconfig.json angular.json  tsconfig.spec.json karma.conf.js  tslint.json index.d.ts package.json
