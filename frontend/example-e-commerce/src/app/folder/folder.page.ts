import { Component, inject, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ProductInterface } from '../interfaces/product.interface';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  standalone: true,
  imports: [IonicModule, NgFor],
})
export class FolderPage implements OnInit {
  protected folder!: string;
  private activatedRoute = inject(ActivatedRoute);

  protected records: ProductInterface[] = [];

  constructor() {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;

    this.productList();
  }

  productList() {

    for (let i = 0; i < 10; i++) {
      const product: ProductInterface = {
        id: i + 1,
        name: `${this.folder} ${i}`,
        createdAt: new Date,
        updatedAt: new Date,
        price: i * 10 * (Math.random() * 10),
        isActive: true,
        categories: []
      };
      
      this.records.push(product);
    }
  }
}
