interface PageConstructor<T> {
  page: number;
  size: number;
  totalCount: number;
  items: T[];
}

export class Page<T> {
  page: number;
  size: number;
  totalCount: number;
  totalPage: number;
  items: T[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;

  constructor({ totalCount, page, size, items }: PageConstructor<T>) {
    this.page = Number(page);
    this.size = Number(size);
    this.totalCount = totalCount;
    this.totalPage = Math.ceil(totalCount / size);
    this.hasNextPage = Math.ceil(totalCount / size) > page;
    this.hasPreviousPage = page > 1;
    this.items = items;
  }
}
