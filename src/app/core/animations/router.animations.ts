 import { trigger, animate, transition, style, group, query, state } from '@angular/animations';

// export const routerAnimation = trigger('routeSlide', [
//     transition('primaria => secundaria', [
//         query(':enter, :leave', style({ position: 'fixed', width: '{{widthPage}}px' })
//             , { optional: true }),
//         group([
//             query(':enter', [
//                 style({ transform: 'translateX(100%)' }),
//                 animate('0.7s ease-in-out', style({ transform: 'translateX(0%)' }))
//             ], { optional: true }),
//             query(':leave', [
//                 style({ transform: 'translateX(0%)' }),
//                 animate('0.7s ease-in-out', style({ transform: 'translateX(-100%)' }))
//             ], { optional: true }),
//         ])
//     ]),
//     transition('secundaria => primaria', [
//         query(':enter, :leave', style({ position: 'fixed', width: '{{widthPage}}px' })
//             , { optional: true }),
//         group([
//             query(':enter', [
//                 style({ transform: 'translateX(-100%)' }),
//                 animate('0.7s ease-in-out', style({ transform: 'translateX(0%)' }))
//             ], { optional: true }),
//             query(':leave', [
//                 style({ transform: 'translateX(0%)' }),
//                 animate('0.7s ease-in-out', style({ transform: 'translateX(100%)' }))
//             ], { optional: true }),
//         ])
//     ])
// ]);
 
export const routerAnimation = 
    trigger('routeSlide', [
        state('primaria', style({ opacity: 1})),
        state('secundaria', style({ opacity: 1})),
        transition('void => primaria', [ //void é um momento onde o compoenente não existe ainda na arvore de componentes
            style({opacity: 0, transform: 'translateY(20px)'}),//o translate com o -30px ele começa em -30px e vai até zero, o mesmo acontece com o -10px
            animate('500ms 0s ease-in')//entra acelerando a aniamção e termina desacelerando
        ]),
        transition('primaria => secundaria', [ //void é um momento onde o compoenente não existe ainda na arvore de componentes
            style({opacity: 0, transform: 'translateY(20px)'}),//o translate com o -30px ele começa em -30px e vai até zero, o mesmo acontece com o -10px
            animate('500ms 0s ease-in')//entra acelerando a aniamção e termina desacelerando
        ]),
        transition('secundaria => primaria', [ //void é um momento onde o compoenente não existe ainda na arvore de componentes
            style({opacity: 0, transform: 'translateY(20px)'}),//o translate com o -30px ele começa em -30px e vai até zero, o mesmo acontece com o -10px
            animate('500ms 0s ease-in')//entra acelerando a aniamção e termina desacelerando
        ])
    ])
