import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-marca-carros',
  templateUrl: './marca-carros.component.html',
  styleUrls: ['./marca-carros.component.scss']
})
export class MarcaCarrosComponent implements OnInit {
  brandName = '';
  brandSlug = '';
  carsCount = 0;
  cars: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.brandSlug = params['slug'];
      this.loadBrandData();
    });
  }

  loadBrandData() {
    // Dados mockados para exemplo
    const brandData: { [key: string]: any } = {
      'toyota': { name: 'Toyota', count: 45 },
      'volkswagen': { name: 'Volkswagen', count: 38 },
      'chevrolet': { name: 'Chevrolet', count: 52 },
      'ford': { name: 'Ford', count: 41 },
      'fiat': { name: 'Fiat', count: 35 },
      'honda': { name: 'Honda', count: 29 },
      'hyundai': { name: 'Hyundai', count: 33 },
      'nissan': { name: 'Nissan', count: 27 },
      'renault': { name: 'Renault', count: 31 },
      'jeep': { name: 'Jeep', count: 22 }
    };

    const brand = brandData[this.brandSlug] || { name: 'Marca', count: 0 };
    this.brandName = brand.name;
    this.carsCount = brand.count;

    // Carros mockados
    this.cars = this.generateMockCars(this.brandName, brand.count);
  }

  generateMockCars(brandName: string, count: number) {
    const models = ['Sedan', 'SUV', 'Hatch', 'Pick-up', 'Crossover'];
    const transmissions = ['Manual', 'Automático', 'CVT'];
    const images = [
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1494905998402-395d579af36f?w=400&h=300&fit=crop'
    ];

    const cars = [];
    for (let i = 0; i < Math.min(count, 12); i++) {
      cars.push({
        name: `${brandName} ${models[i % models.length]} ${2018 + (i % 5)}`,
        year: 2018 + (i % 5),
        price: 45000 + (i * 5000) + Math.random() * 10000,
        km: 20000 + (i * 5000) + Math.random() * 30000,
        transmission: transmissions[i % transmissions.length],
        image: images[i % images.length]
      });
    }
    return cars;
  }

  goBack() {
    this.location.back();
  }
}
