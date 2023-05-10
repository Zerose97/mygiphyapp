import { Component, OnInit } from '@angular/core';
import { GiphyService } from '../@core/services/giphy.service';
import { Store } from '@ngrx/store';
import { selectAllTrendingGiphy, selectPagination } from '../@core/states/gifphy/giphy.selectors';
import { loadTrendingGif } from '../@core/states/gifphy/giphy.actions';
import { Observable, Subject, debounceTime, distinctUntilChanged, firstValueFrom, lastValueFrom } from 'rxjs';
import { GifItem, Pagination } from '../@core/models/gifphy.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-trending-giphy',
  templateUrl: './trending-giphy.component.html',
  styleUrls: ['./trending-giphy.component.scss']
})
export class TrendingGiphyComponent implements OnInit{
  public allTrendingGiphy$: Observable<GifItem[]> = this.store.select(selectAllTrendingGiphy);
  public pagination$: Observable<Pagination | null> = this.store.select(selectPagination);
  public searchInput$: Subject<string> = new Subject<string>();
  public searchKey = '';
  public isShowLoadMore = false;
  public isShowLoading = false;
  public totalRecords = 0;
  public skipRecords = 0;
  public takeRecords = 20;
  public selectedItem: GifItem | null = null;
  public copied: boolean = false;
  
  constructor(
    private store: Store,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getRecord();
    this.setObserveInput();
    this.pagination$.subscribe({
      next: (res) => {
        this.totalRecords = res?.total_count || 0;
      }
    })
  }

  public onTyping(event: any) {
    this.searchInput$.next(event.target.value)
  }

  public setObserveInput() {
    this.searchInput$.pipe(
      debounceTime(700),
      distinctUntilChanged(),
    ).subscribe({
      next: (res) => {
        this.searchKey = res;
        this.getRecord();
      }
    })
  }

  public getRecord(isLoadMore = false) {
    if (isLoadMore) {
      this.isShowLoading = false;
      this.isShowLoadMore = true;
      this.skipRecords = +this.skipRecords + +this.takeRecords;
    } else {
      this.skipRecords = 0;
      this.totalRecords = 0;
    }
    const params = {
      skipRecords: this.skipRecords,
      takeRecords: this.takeRecords,
      searchKey: this.searchKey
    }
    this.store.dispatch(loadTrendingGif(params));
    this.isShowLoading = false;
    this.isShowLoadMore = false;
  }

  loadMoreList(event: any) {
    const allTrendingGiphy = firstValueFrom(this.allTrendingGiphy$);
    allTrendingGiphy.then(res => {
      const checkConditions = res.length < this.totalRecords;
      if (!this.isShowLoading && checkConditions && (event && event.visible)) {
        this.getRecord(true);
      }
    })
  }

  openModal(item: GifItem, content: any) {
    this.selectedItem = item;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' }).result.then(
			(result) => {this.copied = false},
			(reason) => {this.copied = false},
		);
  }

  copyLink() {
    // Get the text field
    const copyText: string = this.selectedItem?.properties.ogGif || '';
    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText);
    this.copied = true;
  }

  goTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }
}
