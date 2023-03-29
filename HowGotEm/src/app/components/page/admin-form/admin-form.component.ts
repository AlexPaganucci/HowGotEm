import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Shoe } from 'src/app/models/shoe';
import { ShoeDto } from 'src/app/models/shoe-dto';
import { ModalService } from 'src/app/services/modal.service';
import { ShoeService } from 'src/app/services/shoe.service';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css']
})
export class AdminFormComponent implements OnInit {

  shoeId!: number;
  adminForm!: FormGroup;
  isModifica: boolean = false;
  shoe!: Shoe;
  bestSellerChecked: boolean = false;

  constructor(private shoeSrv: ShoeService, private route: ActivatedRoute, private modalSrv: ModalService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.shoeId = +this.route.snapshot.params['id'];
    if (this.shoeId) {
      this.isModifica = true;
      this.loadShoe();
    }
    this.createAdminForm();
  }

  toggleBestSeller(event: MatCheckboxChange) {
    this.bestSellerChecked = event.checked;
    this.adminForm.get('bestSeller')?.setValue(this.bestSellerChecked);
  }

  createAdminForm(){
    this.adminForm = this.fb.group({
      model: ['', Validators.required],
      skuCode: ['', Validators.required],
      brand: ['', Validators.required],
      color: ['', Validators.required],
      size: ['', Validators.required],
      quantityAvailable: ['', Validators.required],
      price: ['', Validators.required],
      urlImg: ['', Validators.required],
      urlImg2: ['', Validators.required],
      urlImg3: ['', Validators.required],
      bestSeller: false
    })
  }

  async loadShoe() {
    try {
      this.shoe = await lastValueFrom(this.shoeSrv.getShoeById(this.shoeId));
      this.adminForm.patchValue({
        model: this.shoe.model,
        skuCode: this.shoe.skuCode,
        brand: this.shoe.brand,
        color: this.shoe.color,
        size: this.shoe.sizes[0].size,
        quantityAvailable: this.shoe.sizes[0].quantityAvailable,
        price: this.shoe.sizes[0].price,
        urlImg: this.shoe.urlImg,
        urlImg2: this.shoe.urlImg2,
        urlImg3: this.shoe.urlImg3,
        bestSeller: this.shoe.bestSeller ? true : false
      });
    } catch (error) {
      console.error('Errore nella chiamata HTTP', error);
    }
  }

  async onSubmitAdmin(){
    console.log(this.adminForm);
    const modelValue = this.adminForm.get('model')?.value;
    const skuCodeValue = this.adminForm.get('skuCode')?.value;
    const brandValue = this.adminForm.get('brand')?.value;
    const colorValue = this.adminForm.get('color')?.value;
    const sizeValue = this.adminForm.get('size')?.value;
    const quantityAvailableValue = this.adminForm.get('quantityAvailable')?.value;
    const priceValue = this.adminForm.get('price')?.value;
    const urlImgValue = this.adminForm.get('urlImg')?.value;
    const urlImg2Value = this.adminForm.get('urlImg2')?.value;
    const urlImg3Value = this.adminForm.get('urlImg3')?.value;
    const bestSellerValue = this.adminForm.get('bestSeller')?.value;

    const adminRequest: ShoeDto = {
      model: modelValue,
      skuCode: skuCodeValue,
      brand: brandValue,
      color: colorValue,
      sizes: [
        {
          size: sizeValue,
          quantityAvailable: quantityAvailableValue,
          price: priceValue
        }
      ],
      urlImg: urlImgValue,
      urlImg2: urlImg2Value,
      urlImg3: urlImg3Value,
      bestSeller: bestSellerValue,
    };

    if(!this.isModifica){
      try {
        let response = await lastValueFrom(this.shoeSrv.addShoe(adminRequest));
        this.adminForm.reset();
        this.modalSrv.showNotification("Scarpa aggiunta con successo");
      } catch (error) {
        console.error('Errore nella chiamata HTTP', error);
      }
    } else {
      try {
        let response = await lastValueFrom(this.shoeSrv.updateShoe(this.shoeId, adminRequest));
        this.adminForm.reset();
        this.modalSrv.showNotification("Scarpa modificata con successo");
      } catch (error) {
        console.error('Errore nella chiamata HTTP', error);
      }
    }
  }
}
