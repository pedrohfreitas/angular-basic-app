import { LoadingService } from './loading.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'basic-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  @Input() bdColor = 'rgba(51,51,51,0.8)';

  @Input() color = '#fff';

  @Input() type: string;

  loadingClass: string;

  showLoading: boolean;
  constructor(private loadingService: LoadingService) {
  }

  ngOnInit() {
    this.loadingService.notifier.subscribe(
      (show) => {
        this.showLoading = show;
        console.log('show', show)
        //ação com a div
      }
    )
  }

}
