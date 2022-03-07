import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appPhoneFormat]'
})
export class PhoneFormatDirective {

  @HostListener('input', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    console.log("inside event");
    const input = event.target as HTMLInputElement;

    let trimmed = input.value.replace(/\s+/g, '');
    console.log("value trimmed"+trimmed)
    // if (trimmed.length > 16) {
    //   trimmed = trimmed.substr(0, 16);
    // }

    let numbers = [];
    for (let i = 0; i < trimmed.length; i += 4) {
      numbers.push(trimmed.substr(i, 3));
    }
console.log(numbers.join(' '));

    input.value = numbers.join(' ');

  }

}
