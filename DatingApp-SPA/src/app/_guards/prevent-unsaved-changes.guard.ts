import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<MemberEditComponent> {
    canDeactivate(component: MemberEditComponent) {
        if (component.form.dirty) {
            return confirm('Are you sures you ant to yo continue? Any unsaved changes will be lost');
        }
        return true;
    }
}
