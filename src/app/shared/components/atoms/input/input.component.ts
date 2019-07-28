import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OnChange } from 'property-watch-decorator';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-input',
  template: `
    <input
      [placeholder]="placeholder"
      [readonly]="readonly"
      [formControl]="control"
    />
  `,
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements OnInit, OnDestroy {
  /**
   * Placeholder will bind to input element the native placeholder property
   */
  @Input() placeholder = '';

  /**
   * Readonly will bind to input element the native readonly property
   */
  @Input() readonly = false;

  /**
   * Disabled will set the input disabled using Angular FormControl
   */
  @OnChange(function(value: boolean) {
    if (this.control) {
      if (value) {
        this.control.disable();
      } else {
        this.control.enable();
      }
    }
  })
  @Input()
  disabled = false;

  /**
   * Value will set the input value in Angular FormControl, but will not emit events.
   */
  @OnChange(function(value: string) {
    if (this.control) {
      this.control.setValue(value, { emitEvent: false });
    }
  })
  @Input()
  value = '';

  /**
   * Control will manage all input's behaviors values and disabled
   */
  @Input()
  control: FormControl = new FormControl('');

  /**
   * Form integrate to a parent form
   */
  @Input() form: FormGroup;

  /**
   * ControlName is the string name from a formControlName of the parent form
   */
  @OnChange(function() {
    if (this.form) {
      this.control = this.form.get(String(this.controlName)) as FormControl;
      this.listenToInput();
    }
  })
  @Input()
  controlName: string;

  /**
   *
   * InputValue will emit control value when it changes
   *
   */
  @Output() inputValue = new EventEmitter<string | boolean>();

  private readonly destroy$ = new Subject();

  /**
   *
   * Control typing debounce time
   *
   */
  private debounce = 300;

  ngOnInit() {
    this.listenToInput();
  }

  /**
   *
   * Emits control value when it changes
   *
   */
  private listenToInput(): void {
    if (!this.control) {
      return;
    }
    this.control.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(this.debounce),
        distinctUntilChanged()
      )
      .subscribe(value => this.inputValue.emit(value));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
