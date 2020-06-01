import { trigger,state,transition,style,animate } from '@angular/animations';

export const fadeIn =   trigger('tableAnimation', [

    state('in', style({opacity: 1})),

    transition(':enter', [
      style({opacity: 0}),
      animate(1500)
    ]),

    transition(':leave',
      animate(600, style({opacity: 0})))
  ]);

export const slideIn =  trigger(
  'tableAnimation', [
    transition(':enter', [
      style({transform: 'translateX(100%)', opacity: 0}),
      animate('400ms', style({transform: 'translateX(0)', opacity: 1, 'overflow-x': 'hidden'}))
    ]),
    transition(':leave', [
      style({transform: 'translateX(0)', opacity: 1}),
      animate('400ms', style({transform: 'translateX(100%)', opacity: 0}))
    ])
  ]
);