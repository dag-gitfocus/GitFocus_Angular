FROM node

RUN mkdir  /GitFocus_Angular

RUN git clone https://github.com/dag-gitfocus/GitFocus_Angular.git

WORKDIR /GitFocus_Angular

RUN npm install -g @angular/cli

RUN npm install

RUN pwd

RUN ls -l

RUN mv index.d.ts /GitFocus_Angular/node_modules/@types/chart.js

RUN pwd

RUN ls -l

RUN ng build

EXPOSE 4200

CMD [ "node", "/GitFocus_Angular/app.js" ]

RUN rm -r src output  e2e

RUN rm -f browserslist tsconfig.app.json README.md package-lock.json  tsconfig.json angular.json  tsconfig.spec.json karma.conf.js  tslint.json index.d.ts package.json
