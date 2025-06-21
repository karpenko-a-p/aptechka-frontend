import { CATEGORY_REPOSITORY, ICategoryRepository } from 'application/abstractions/repositories';
import { Category } from 'application/models/Category';
import { Service } from 'typedi';
import { cache } from 'react';
import 'server-only';

@Service(CATEGORY_REPOSITORY)
export class CategoryRepository implements ICategoryRepository {
  private readonly categories: Category[] = [
    {
      id: 'cat-1',
      name: 'Category one',
      description: 'Category one long description, very very long description about this category...',
      banner:
        'https://images.unsplash.com/photo-1603398938378-e54eab446dde?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      keysWords: ['some', 'keys', 'words'],
    },
    {
      id: 'cat-2',
      name: 'Category two',
      description: 'Category two long description',
      banner:
        'https://images.unsplash.com/photo-1655174041849-49ed985e9ffb?q=80&w=3136&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      keysWords: ['some', 'other', 'keys', 'words'],
    },
    {
      id: 'cat-3',
      name: 'Category three',
      description: 'Category three long description',
      banner:
        'https://images.unsplash.com/photo-1544829894-eb023ba95a38?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      keysWords: ['pills', 'steroids', 'paracetamol'],
    },
    {
      id: 'cat-4',
      name: 'Category four',
      description: 'Category four long description',
      banner:
        'https://images.unsplash.com/photo-1610542443439-279b81fba808?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      keysWords: ['pharma', 'testo'],
    },
  ];

  constructor() {
    this.getCategories = cache(this.getCategories.bind(this));
    this.getCategoryById = cache(this.getCategoryById.bind(this));
  }

  async getCategories(): Promise<Category[]> {
    return this.categories;
  }

  async getCategoryById(id: Category['id']): Promise<Category | null> {
    return this.categories.find((category) => category.id === id) ?? null;
  }
}
