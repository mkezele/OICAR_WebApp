import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  constructor() { }

  fieldInvalid(form: FormGroup, field: string): boolean{
    let formField = form.get(field);
    return (formField?.invalid && (formField?.dirty || formField?.touched)) ?? false;
  }

  fieldHasError(form: FormGroup, field: string, error: string): boolean{
      return form.get(field)?.hasError(error) ?? false;
  }

  fieldInvalidAndHasError(form: FormGroup, field: string, error: string): boolean{
    return this.fieldInvalid(form, field) && this.fieldHasError(form, field, error);
  }

  fieldEmpty(form: FormGroup, field: string): boolean{
    return form.get(field)?.value == "" ?? false;
  }
}
