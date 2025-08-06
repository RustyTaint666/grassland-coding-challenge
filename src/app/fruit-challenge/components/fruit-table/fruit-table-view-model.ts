import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable, of, tap} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {FruityViceService} from '../../services/fruity-vice-service';
import {Fruit} from '../../models/fruit';
import {FruitSortOption} from "../../enums/fruit-sort-option";

@Injectable()
export class FruitTableViewModel {
  public fruitData$: Observable<Fruit[]>;
  public loadingFruit$ = new BehaviorSubject<boolean>(false);

  private filterTextSubject = new BehaviorSubject<string>('');
  private sortOptionSubject = new BehaviorSubject<FruitSortOption>(FruitSortOption.NameAscending);

  constructor(private fruitService: FruityViceService) {
    this.loadingFruit$.next(true);

    const rawFruitData$ = this.fruitService.getAllFruits().pipe(
        catchError(error => {
          console.error('Error fetching fruits:', error);
          this.loadingFruit$.next(false);
          return of([]);
        }),
        tap(() => this.loadingFruit$.next(false))
    );

    this.fruitData$ = combineLatest([
      rawFruitData$,
      this.filterTextSubject.pipe(debounceTime(300), distinctUntilChanged()), // Debounce filter input
      this.sortOptionSubject
    ]).pipe(
        map(([fruits, filterText, sortOption]) => {
          let filteredFruits = this.applyFilter(fruits, filterText);
          return this.applySort(filteredFruits, sortOption);
        })
    );
  }

  /**
   * Updates the filter text, triggering a re-filter of the data.
   * @param text The text to filter by.
   */
  public updateFilterText(text: string): void {
    this.filterTextSubject.next(text.trim().toLowerCase());
  }

  /**
   * Updates the sort option, triggering a re-sort of the data.
   * @param option The selected sort option.
   */
  public updateSortOption(option: FruitSortOption): void {
    this.sortOptionSubject.next(option);
  }

  /**
   * Applies filtering logic to the fruit array.
   * Goal 2: Filters based on 'genus', 'name', 'family', 'order'.
   * @param fruits The array of fruits to filter.
   * @param filter The filter text.
   * @returns The filtered array of fruits.
   */
  private applyFilter(fruits: Fruit[], filter: string): Fruit[] {
    if (!filter) {
      return fruits;
    }
    return fruits.filter(fruit =>
        fruit.genus.toLowerCase().includes(filter) ||
        fruit.name.toLowerCase().includes(filter) ||
        fruit.family.toLowerCase().includes(filter) ||
        fruit.order.toLowerCase().includes(filter)
    );
  }

  /**
   * Applies sorting logic to the fruit array.
   * Goal 2: Sorts based on selected option.
   * @param fruits The array of fruits to sort.
   * @param sortOption The selected sort option string.
   * @returns The sorted array of fruits.
   */
  private applySort(fruits: Fruit[], sortOption: FruitSortOption): Fruit[] {
    let sortedData = [...fruits]; // Create a shallow copy to sort

    switch (sortOption) {
      case FruitSortOption.NameAscending:
        sortedData.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case FruitSortOption.NameDescending:
        sortedData.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case FruitSortOption.CarbohydratesAscending:
        sortedData.sort((a, b) => a.nutritions.carbohydrates - b.nutritions.carbohydrates);
        break;
      case FruitSortOption.CarbohydratesDescending:
        sortedData.sort((a, b) => b.nutritions.carbohydrates - a.nutritions.carbohydrates);
        break;
      default:
        // Default to Name Ascending if no valid option is selected
        sortedData.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    return sortedData;
  }
}
