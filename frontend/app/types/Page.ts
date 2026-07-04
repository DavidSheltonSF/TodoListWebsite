export interface Page<T> {
  items: T[],
  currentPage: number,
  totalPages: number,
  nextPage: number
}