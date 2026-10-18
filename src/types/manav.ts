export interface Product {
  id: string;
  name: string;
  price: number;
  emoji: string;
  unit: string;
  category: 'meyve' | 'sebze';
  accentColor: string;
  bgLight: string;
  description: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'armut',
    name: 'Armut',
    price: 2.14,
    emoji: '🍐',
    unit: 'kg',
    category: 'meyve',
    accentColor: '#16a34a',
    bgLight: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    description: 'Deveci ve Ankara armudu, sulu ve tatlı'
  },
  {
    id: 'elma',
    name: 'Elma',
    price: 3.67,
    emoji: '🍎',
    unit: 'kg',
    category: 'meyve',
    accentColor: '#dc2626',
    bgLight: 'bg-rose-50 text-rose-800 border-rose-200',
    description: 'Amasya ve Starking kırmızı kütür elma'
  },
  {
    id: 'domates',
    name: 'Domates',
    price: 1.11,
    emoji: '🍅',
    unit: 'kg',
    category: 'sebze',
    accentColor: '#ea580c',
    bgLight: 'bg-orange-50 text-orange-800 border-orange-200',
    description: 'Salkım tarla domatesi, taze ve etli'
  },
  {
    id: 'muz',
    name: 'Muz',
    price: 0.95,
    emoji: '🍌',
    unit: 'kg',
    category: 'meyve',
    accentColor: '#ca8a04',
    bgLight: 'bg-amber-50 text-amber-800 border-amber-200',
    description: 'Yerli Anamur muzu, aromatik ve tatlı'
  },
  {
    id: 'patlican',
    name: 'Patlıcan',
    price: 5.00,
    emoji: '🍆',
    unit: 'kg',
    category: 'sebze',
    accentColor: '#7c3aed',
    bgLight: 'bg-purple-50 text-purple-800 border-purple-200',
    description: 'Kemer patlıcan, taze parlak kabuklu'
  }
];

export interface BasketQuantities {
  armut: number;
  elma: number;
  domates: number;
  muz: number;
  patlican: number;
}

export const DEFAULT_EXAMPLE_QUANTITIES: BasketQuantities = {
  armut: 0,
  elma: 1,
  domates: 1,
  muz: 2,
  patlican: 3
};

export interface TestCase {
  id: string;
  title: string;
  description: string;
  quantities: BasketQuantities;
  expectedTotal: number;
}

export const TEST_CASES: TestCase[] = [
  {
    id: 'odev-ornek',
    title: 'Ödev Örnek Testi (Orijinal)',
    description: 'Armut: 0kg, Elma: 1kg, Domates: 1kg, Muz: 2kg, Patlıcan: 3kg',
    quantities: { armut: 0, elma: 1, domates: 1, muz: 2, patlican: 3 },
    expectedTotal: 21.68
  },
  {
    id: 'hepsinden-birer',
    title: 'Standart Sepet (1\'er KG)',
    description: 'Tüm meyve ve sebzelerden eşit olarak birer kilogram',
    quantities: { armut: 1, elma: 1, domates: 1, muz: 1, patlican: 1 },
    expectedTotal: 12.87
  },
  {
    id: 'yarim-kilo',
    title: 'Hassas Tartım (0.5\'er KG)',
    description: 'Ondalık tartım hassasiyeti kontrolü',
    quantities: { armut: 0.5, elma: 0.5, domates: 0.5, muz: 0.5, patlican: 0.5 },
    expectedTotal: 6.44
  },
  {
    id: 'sadece-meyve',
    title: 'Meyve Paketi',
    description: 'Yalnızca meyveler (Armut: 2kg, Elma: 2kg, Muz: 3kg)',
    quantities: { armut: 2, elma: 2, domates: 0, muz: 3, patlican: 0 },
    expectedTotal: 14.47
  },
  {
    id: 'sadece-sebze',
    title: 'Yemeklik Sebze',
    description: 'Yalnızca sebzeler (Domates: 3kg, Patlıcan: 2kg)',
    quantities: { armut: 0, elma: 0, domates: 3, muz: 0, patlican: 2 },
    expectedTotal: 13.33
  }
];

export function calculateTotal(quantities: BasketQuantities): number {
  const total =
    quantities.armut * 2.14 +
    quantities.elma * 3.67 +
    quantities.domates * 1.11 +
    quantities.muz * 0.95 +
    quantities.patlican * 5.00;
  return Number(total.toFixed(2));
}

export function calculateItemSubtotal(id: keyof BasketQuantities, qty: number): number {
  const priceMap: Record<keyof BasketQuantities, number> = {
    armut: 2.14,
    elma: 3.67,
    domates: 1.11,
    muz: 0.95,
    patlican: 5.00
  };
  return Number((priceMap[id] * qty).toFixed(2));
}

export const JAVA_SOURCE_CODE = `import java.util.Scanner;
import java.util.Locale;

/**
 * Manav Kasa Programı
 * Java ile kullanıcıların manavdan almış oldukları ürünlerin
 * kilogram değerlerine göre toplam tutarını ekrana yazdıran program.
 * 
 * Meyveler ve KG Fiyatları:
 * - Armut    : 2.14 TL
 * - Elma     : 3.67 TL
 * - Domates  : 1.11 TL
 * - Muz      : 0.95 TL
 * - Patlıcan : 5.00 TL
 * 
 * @author Enes Öztürk
 * İmza: Enes Öztürk
 */
public class Main {
    public static void main(String[] args) {
        // Konsoldan kullanıcı girişi almak için Scanner nesnesi oluşturulur.
        // Ondalık sayıların nokta (.) ile girilebilmesi için Locale.US ayarlanır.
        Scanner input = new Scanner(System.in).useLocale(Locale.US);

        // Sabit kilogram fiyatları (TL)
        double armutFiyat = 2.14;
        double elmaFiyat = 3.67;
        double domatesFiyat = 1.11;
        double muzFiyat = 0.95;
        double patlicanFiyat = 5.00;

        // Kullanıcıdan alınacak kilogram değişkenleri
        double armutKilo, elmaKilo, domatesKilo, muzKilo, patlicanKilo;

        // Kullanıcıdan her ürün için kilogram miktarını isteme
        System.out.print("Armut Kaç Kilo ? :");
        armutKilo = input.nextDouble();

        System.out.print("Elma Kaç Kilo ? :");
        elmaKilo = input.nextDouble();

        System.out.print("Domates Kaç Kilo ? :");
        domatesKilo = input.nextDouble();

        System.out.print("Muz Kaç Kilo ? :");
        muzKilo = input.nextDouble();

        System.out.print("Patlıcan Kaç Kilo ? :");
        patlicanKilo = input.nextDouble();

        // Toplam tutarın matematiksel formülü
        double toplamTutar = (armutKilo * armutFiyat) +
                             (elmaKilo * elmaFiyat) +
                             (domatesKilo * domatesFiyat) +
                             (muzKilo * muzFiyat) +
                             (patlicanKilo * patlicanFiyat);

        // Sonucun ekrana yazdırılması (2 ondalık basamak formatında)
        System.out.printf(Locale.US, "Toplam Tutar : %.2f TL%n", toplamTutar);

        // Ödev İmza Çıktısı
        System.out.println("Geliştirici & İmza: Enes Öztürk");

        // Kaynak sızıntısını önlemek için scanner kapatılır
        input.close();
    }
}
`;
