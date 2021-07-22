import { NgxUiLoaderConfig } from 'ngx-ui-loader';

export const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsType: 'ball-scale-multiple',
  fgsColor: '#000000',
  pbThickness: 3,
  overlayColor: 'rgba(255, 255, 255, 0.95)',
  pbColor: '#000000',
  fgsSize: 200,
};

export const loaderExclude = [
  '/api/archive-manager/current',
]
