import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { OrderRequest } from 'src/app/models/order-request';
import { PaypalDataResponse } from 'src/app/models/paypal-data-response';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart.service';
import { ModalService } from 'src/app/services/modal.service';
import { OrderService } from 'src/app/services/order.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pay-pal',
  templateUrl: './pay-pal.component.html',
  styleUrls: ['./pay-pal.component.css']
})
export class PayPalComponent implements OnInit {

  @Input() user!: User;
  @Input() price: number = 0;
  @Input() orderRequest!: OrderRequest;
  public payPalConfig ? : IPayPalConfig;
  paypalData!: PaypalDataResponse;

  constructor(private orderSrv: OrderService, private cartSrv: CartService, private modalSrv: ModalService) { }

  ngOnInit(): void {
    this.initConfig();
  }

  private initConfig(): void {
    this.payPalConfig = {
        currency: 'EUR',
        clientId: environment.paypalClientId,
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'EUR',
                    value: this.price.toString(),
                    breakdown: {
                        item_total: {
                            currency_code: 'EUR',
                            value: this.price.toString()
                        }
                    }
                },
                items: [{
                    name: 'Enterprise Subscription',
                    quantity: '1',
                    category: 'DIGITAL_GOODS',
                    unit_amount: {
                        currency_code: 'EUR',
                        value: this.price.toString(),
                    },
                }]
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details: any) => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });
            this.modalSrv.showNotification("Ordine ricevuto con successo a breve ti arrivera una email dal team di How Got Em")
        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            // this.showSuccess = true;
            this.orderSrv.saveOrder(this.orderRequest).subscribe({
              next: (order) => this.orderSrv.sendEmail(this.user.id, order.orderId),
              error: (error) => console.log(error),
              complete: () => {
                console.log(data);
                console.log(typeof data.id);
                if (!this.paypalData) {
                  this.paypalData = {
                    idTransaction: '',
                    user: this.user,
                    time: '',
                    totalPrice: this.price
                  }; // inizializza paypalData se è undefined
              }
                this.paypalData.idTransaction = data.id;
                this.paypalData.time = data.create_time;
                this.orderSrv.savePaypalData(this.paypalData).subscribe({
                  next: (data) => console.log(data),
                  error: (error) => console.log(error),
                  complete: () => console.log('dati Paypal salvati' + data)
                })
              }
            });
            this.cartSrv.clearCart();
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            // this.showCancel = true;

        },
        onError: err => {
            console.log('OnError', err);
            // this.showError = true;
            this.modalSrv.openErrorPaymentModal();
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
            // this.resetStatus();
        }
    };
  }

}
