// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { enableProdMode } from '@angular/core';

import * as express from 'express';
import { join, resolve } from 'path';
import { readFileSync } from 'fs';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as domParser from 'cheerio';
import { parseConfig } from './server/parse-config';
import { AppConfig } from './src/app/config/app-config';

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

// Our index.html we'll use as our template

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

// * NOTE :: leave this as require() since this file is  built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');

const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');


function getAmpConfig(): boolean {
  let config: AppConfig;
  try {
    config = parseConfig();
    console.log(`AMP CONFIG: ${config.isAmpVersion ? 'yes' : 'no'}`);
    return config.isAmpVersion;
  } catch (err) {
    console.error(`Server config error: ${err}`);
    return null;
  }
}

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'angular-amp'));

// Server static files from /angular-amp
app.get('*.*', express.static(join(DIST_FOLDER, 'angular-amp')));

// All regular routes use the Universal engine
app.get('*', (req: express.Request, res: express.Response) => {
  res.render(
    join(DIST_FOLDER, 'angular-amp', 'index.html'),
    {
      req: req,
      res: res,
      providers: [
        { provide: 'AMP_CONFIG', useFactory: getAmpConfig, deps: [] }
      ]
    },
    // (err: Error, html: string) => {
    //   // if (req.url.indexOf('.amp') >= 0) {
    //   // const ampURL = req.url.replace('.amp', '');
    //   // const renderedDom = domParser.load(html);
    //   // let combinedStyles = readFileSync(resolve('dist', 'angular-amp', 'styles.3bb2a9d4949b7dc120a9.css')).toString();
    //   // renderedDom('script').remove();
    //   // renderedDom('html').attr('amp', '');
    //   // renderedDom('html').attr('amp', '');
    //   // renderedDom('head style').each((index: number, element: CheerioElement) => {
    //   //   combinedStyles += renderedDom.html(element).toString();
    //   // });
    //   // console.log(combinedStyles);
    //   //
    //   // // renderedDom('head meta[property="viewport"]').each((index: number, element: CheerioElement) => {
    //   // //   if (element.attribs) {
    //   // //
    //   // //   }
    //   // // });
    //   // // renderedDom('head')
    //   // //   .append(`<link rel="canonical" href="${ampURL}">`);
    //   // // .append('<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>')
    //   // // .append('<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>')
    //   // // .append('<script async src="https://cdn.ampproject.org/v0.js"></script>');
    //   // html = renderedDom.html();
    //   // // }
    //   res.send(html);
    // }
  );
});

app.use((err, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  next();
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node server listening on http://127.0.0.1:${PORT}`);
});
