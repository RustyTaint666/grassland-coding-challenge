import { Component, OnInit } from '@angular/core';
import { FruitTableViewModel } from './fruit-table-view-model';
import { FruitSortOption } from "../../enums/fruit-sort-option";
import {Fruit} from "../../models/fruit";

interface SortOptionDisplay {
  label: string;
  value: FruitSortOption;
}

@Component({
  selector: 'app-fruit-table',
  templateUrl: './fruit-table.component.html',
  styleUrls: ['./fruit-table.component.scss'],
  providers: [FruitTableViewModel]
})
export class FruitTableComponent implements OnInit {
  columnsToDisplay = ['id', 'name', 'genus', 'family', 'order', 'calories', 'carbohydrates', 'sugar'];

  // Goal 2: Property for the filter text input
  filterText: string = '';

  // Goal 2: Array of sort options for the dropdown, using the enum for values
  sortOptions: SortOptionDisplay[] = [
    { label: 'Name Ascending', value: FruitSortOption.NameAscending },
    { label: 'Name Descending', value: FruitSortOption.NameDescending },
    { label: 'Carbohydrates Ascending', value: FruitSortOption.CarbohydratesAscending },
    { label: 'Carbohydrates Descending', value: FruitSortOption.CarbohydratesDescending }
  ];

  // Goal 2: Property to hold the currently selected sort option from the dropdown
  sortOption: FruitSortOption = FruitSortOption.NameAscending;

  constructor(
      public viewModel: FruitTableViewModel,
  ) {}

  ngOnInit(): void {
    this.viewModel.updateFilterText(this.filterText);
    this.viewModel.updateSortOption(this.sortOption);
  }

  /**
   * Goal 2: Calls the ViewModel to apply filtering based on the current filterText.
   * Triggered by 'keyup' event on the filter input.
   */
  applyFilter(): void {
    this.viewModel.updateFilterText(this.filterText);
  }

  /**
   * Goal 2: Calls the ViewModel to apply sorting based on the selected sortOption.
   * Triggered by 'selectionChange' event on the sort dropdown.
   */
  applySort(): void {
    this.viewModel.updateSortOption(this.sortOption);
  }

  /**
   * Goal 3: Checks if 'calories' column value is less than or equal to 50.
   * Used in HTML to apply the 'bold-calories' class.
   * @param calories The calorie value of a fruit.
   * @returns True if calories are 50 or less, false otherwise.
   */
  isLowCalorie(calories: number): boolean {
    return calories <= 50;
  }

  /**
   * Goal 3: Checks if the entire row should have the special background color.
   * Criteria: 'calories' column value is less than or equal to 50 AND
   * 'sugar' column value is greater than or equal to 8.
   * Used in HTML to apply the 'special-row' class.
   * @param fruit The Fruit object for the current row.
   * @returns True if the fruit meets the special row criteria, false otherwise.
   */
  isSpecialRow(fruit: Fruit): boolean {
    return fruit.nutritions.calories <= 50 && fruit.nutritions.sugar >= 8;
  }
}