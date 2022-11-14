import { trigger, transition, style, query, animateChild, group, animate, keyframes } from "@angular/animations";

export const slideInAnimation =
    trigger('routeAnimate', [

        transition('*=>dashboardPage, *=>profilePage', [
            style({
                opacity: 0,
                //transform: 'translateY(-100%)'
                transform: 'scale(0.95)'
            }),
            animate('0.8s')
        ])
    ])
    ;
export const addBook = trigger('addBook', [

    transition(':enter', [
        style({
            backgroundColor: '#82CD47',
            opacity: 0,
            transform: 'translateX(-100px)'
        }),
        animate('0.8s')
    ])
])
