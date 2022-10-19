import { Injectable } from "@angular/core";
import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

@Injectable({
    providedIn: "root"
})
export class AgeValidatorService {

    ageValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            let birthdate = control.value;
            let parts = birthdate?.split("/");
            if (parts == undefined) { return null; }
            let dtDOB = new Date(parts[1] + "/" + parts[0] + "/" + parts[2]);
            let curDate = new Date();
            if (curDate.getFullYear() - dtDOB.getFullYear() < 18) {
                console.log('age less than 18');
                return { 'ageLt': true };
            } else if (curDate.getFullYear() - dtDOB.getFullYear() >= 70) {
                console.log('Users with age below 70 are allowed')
                return { 'ageGt': true };
            }
            return null;
        }
        // for age validation 
    }
}