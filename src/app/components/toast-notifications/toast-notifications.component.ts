// TODO
// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { NotificationService } from '../../services/notification.service';

// @Component({
//   selector: 'app-toast-notifications',
//   standalone: true,
//   imports: [CommonModule],
//   template: `
//     <div class="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none">
//       <div class="flex flex-col items-center gap-2">
//         @for (notification of notifications$ | async; track notification.id) {
//           <div class="bg-white shadow-lg rounded-lg px-4 py-3 pointer-events-auto 
//                       transform transition-all duration-300 ease-out
//                       translate-y-0 opacity-100 max-w-sm w-full
//                       border-l-4"
//                [class.border-green-500]="notification.type === 'success'"
//                [class.border-red-500]="notification.type === 'error'"
//                [class.border-blue-500]="notification.type === 'info'"
//                (click)="removeNotification(notification.id)">
//             <div class="flex items-center">
//               @if (notification.type === 'success') {
//                 <svg class="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
//                 </svg>
//               }
//               <p class="text-gray-800">{{ notification.message }}</p>
//             </div>
//           </div>
//         }
//       </div>
//     </div>
//   `
// })
// export class ToastNotificationsComponent {
//   notifications$ = this.notificationService.notifications$;

//   constructor(private notificationService: NotificationService) {}

//   removeNotification(id: number) {
//     this.notificationService.remove(id);
//   }
// } 