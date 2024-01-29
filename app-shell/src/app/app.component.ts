import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import windowStore from '../../../share/store/store';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app-shell';
  counterValue: number | undefined;
  counterSubscription = new Subscription();

  constructor(private cdr: ChangeDetectorRef) {}

  increase() {
    windowStore.increaseCounter();
  }

  decrease() {
    windowStore.decreaseCounter();
  }

  ngOnInit(): void {
    this.counterSubscription.add(
      windowStore.counter$.subscribe((value) => {
        this.counterValue = value;
        this.cdr.detectChanges();
      })
    );
  }

  ngOnDestroy(): void {
    this.counterSubscription.unsubscribe();
  }
}
