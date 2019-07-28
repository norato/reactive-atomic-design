import { InputComponent } from './input.component';
import { storiesOf, moduleMetadata } from '@storybook/angular';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup
} from '@angular/forms';

const metadata = moduleMetadata({
  declarations: [InputComponent],
  imports: [FormsModule, ReactiveFormsModule]
});

storiesOf('Atoms | Input', module)
  .addDecorator(metadata)
  .add('Simple input', () => ({
    template: `
      <div class="story-container">
        <h3>Initial State: no options</h3>
        <app-input></app-input>
        <h3>Initial State: with placeholder</h3>
        <app-input placeholder="Some placeholder"></app-input>
        <h3>Initial State: with Value</h3>
        <app-input value="Some value" placeholder="Some placeholder"></app-input>
        <h3>Initial State: disabled</h3>
        <app-input value="Disabled input" placeholder="Some placeholder" [disabled]="true"></app-input>
        <h3>Initial State: readonly</h3>
        <app-input value="Readonly input" placeholder="Some placeholder" [readonly]="true"></app-input>
      </div>
    `,
    styles: [
      `
      .story-container {
        padding-left: 3rem;
        padding-top: 1rem;
      }
    `
    ]
  }))
  .add('Integrate with form', () => ({
    template: `
      <div class="story-container">
        <h3>Form Control</h3>
        <app-input [control]="control"></app-input>
        <span> {{ control.value | json }}</span>
        <h3>Form Group</h3>
        <app-input [form]="form" [controlName]="controlName"></app-input>
        <span> {{ form.value | json }}</span>
      </div>
    `,
    props: {
      control: new FormControl('Form control value'),
      form: new FormGroup({
        example: new FormControl('From controlName'),
        other: new FormControl('From controlName')
      }),
      controlName: 'example'
    },
    styles: [
      `
        .story-container {
          padding-left: 3rem;
          padding-top: 1rem;
        }
      `
    ]
  }));
