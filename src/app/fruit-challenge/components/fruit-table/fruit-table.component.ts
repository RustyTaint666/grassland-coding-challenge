import { Component, OnInit } from '@angular/core';
import { FruitTableViewModel } from './fruit-table-view-model';
import { FruitSortOption } from "../../enums/fruit-sort-option";

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
}