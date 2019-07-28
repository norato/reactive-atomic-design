import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  template: `
    <input
      [placeholder]="placeholder"
      [value]="value"
      [disabled]="disabled"
      [readonly]="readonly"
    />
  `,
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent {
  @Input() placeholder = '';
  @Input() value = '';
  @Input() disabled = false;
  @Input() readonly = false;
}
