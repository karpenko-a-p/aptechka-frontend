// Poor model =)

export interface IProduct {
  id: number;
  name: string;
  description: string;
  image: string;
}

export abstract class Product {
  // Статичные поля и методы относящиеся к продукту...

  static new(id = 0, name = '', description = '', image = ''): IProduct {
    return { id, name, description, image };
  }
}
