import {animate, animation, keyframes, style} from '@angular/animations';

export const harpAnimation = animation([
  style({boxShadow: '0 0 10px rgba(156 ,156 ,156 , 0.3)'}),
  animate('.8s cubic-bezier(.36,.07,.19,.97)', keyframes([
    style({width: '2px', borderRadius: '10%', transform: 'translate3d(-1px, 0, -2px)', offset: 0.05}),
    style({width: '1px', borderRadius: '20%', transform: 'translate3d(1px, 0, 2px)', offset: 0.1}),
    style({width: '2px', borderRadius: '35%', transform: 'translate3d(-2px, 0, -4px)', offset: 0.15}),
    style({width: '1px', borderRadius: '50%', transform: 'translate3d(2px, 0, 4px)', offset: 0.2}),
    style({width: '2px', borderRadius: '10%', transform: 'translate3d(-1px, 0, -2px)', offset: 0.25}),
    style({width: '1px', borderRadius: '20%', transform: 'translate3d(1px, 0, 2px)', offset: 0.3}),
    style({width: '2px', borderRadius: '35%', transform: 'translate3d(-2px, 0, -4px)', offset: 0.35}),
    style({width: '1px', borderRadius: '50%', transform: 'translate3d(2px, 0, 4px)', offset: 0.4}),
    style({width: '2px', borderRadius: '10%', transform: 'translate3d(-1px, 0, -2px)', offset: 0.45}),
    style({width: '1px', borderRadius: '20%', transform: 'translate3d(1px, 0, 2px)', offset: 0.5}),
    style({width: '2px', borderRadius: '35%', transform: 'translate3d(-2px, 0, -4px)', offset: 0.55}),
    style({width: '1px', borderRadius: '50%', transform: 'translate3d(2px, 0, 4px)', offset: 0.6}),
    style({width: '2px', borderRadius: '10%', transform: 'translate3d(-1px, 0, -2px)', offset: 0.65}),
    style({width: '1px', borderRadius: '20%', transform: 'translate3d(1px, 0, 2px)', offset: 0.7}),
    style({width: '2px', borderRadius: '35%', transform: 'translate3d(-2px, 0, -4px)', offset: 0.75}),
    style({width: '1px', borderRadius: '50%', transform: 'translate3d(2px, 0, 4px)', offset: 0.8}),
    style({width: '2px', borderRadius: '10%', transform: 'translate3d(-1px, 0, -2px)', offset: 0.85}),
    style({width: '1px', borderRadius: '20%', transform: 'translate3d(1px, 0, 2px)', offset: 0.9}),
    style({width: '2px', borderRadius: '35%', transform: 'translate3d(-2px, 0, -4px)', offset: 0.95}),
  ]))
]);
