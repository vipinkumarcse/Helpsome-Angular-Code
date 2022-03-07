import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatphonenew'
})
export class FormatphonenewPipe implements PipeTransform {

  transform(value: any): string {
    if (value) {
      // Gets the value as a string
      if (typeof value !== 'string') {
        value = value.toString();
      }
      // Delete existing spaces
      while ((value as string).indexOf(' ') !== -1) {
        value = (value as string).replace(' ', '');
      }

      // Manage decimal values
      let integerPart: string = value;
      console.log("integerpart"+integerPart);
      
      // if (value.indexOf('.') !== -1) {
      //   integerPart = value.slice(0, value.indexOf('.'));
      // }
      // if (value.indexOf(',') !== -1) {
      //   integerPart = value.slice(0, value.indexOf(','));
      // }

      // let firstSlice = true;
       const arrayResults: Array<string> = [];
       let finalResult = '';

      // const divisor = 3;
      const dividend: number = integerPart.length;
      // let remainder = dividend % divisor;
      // let quotient = (dividend + remainder) / divisor;

      if (dividend == 8) {
     
        //   if (firstSlice && remainder > 0) {
        //     // Manage numbers with remainders
        //     firstSlice = false;
        //     arrayResults.push(integerPart.slice(0, remainder));
        //   } else {
        //     // Slice each part of the number to an array
        //     firstSlice = false;
        //     arrayResults.push(integerPart.slice(remainder, remainder + divisor));
        //     remainder = remainder + divisor;
        //     quotient--;
        //   }
        //   // Continue dividing the number while there are values
        // } while (quotient >= 1);

        // // Concats the sliced parts to build the final number
        // arrayResults.forEach(part => {
        //   finalResult += `${part} `;
        // });
        // // Delete any trailing whitespace
        // finalResult = finalResult.trim();
        // return finalResult;

        var firstthreechar=integerPart.substr(0,3);
        console.log("firstchat"+firstthreechar);
        var secondtwochar=integerPart.substr(3,2);
        console.log("firstchat"+secondtwochar);
        var lastthreechar=integerPart.substr(5,3);
        console.log("lastthreechar"+lastthreechar);
        finalResult=firstthreechar+" "+secondtwochar+" "+lastthreechar;
return finalResult.trim();
      }
      
      else if (dividend == 4) {
     
        //   if (firstSlice && remainder > 0) {
        //     // Manage numbers with remainders
        //     firstSlice = false;
        //     arrayResults.push(integerPart.slice(0, remainder));
        //   } else {
        //     // Slice each part of the number to an array
        //     firstSlice = false;
        //     arrayResults.push(integerPart.slice(remainder, remainder + divisor));
        //     remainder = remainder + divisor;
        //     quotient--;
        //   }
        //   // Continue dividing the number while there are values
        // } while (quotient >= 1);

        // // Concats the sliced parts to build the final number
        // arrayResults.forEach(part => {
        //   finalResult += `${part} `;
        // });
        // // Delete any trailing whitespace
        // finalResult = finalResult.trim();
        // return finalResult;

        var firstthreechar=integerPart.substr(0,3);
        console.log("firstchat"+firstthreechar);
        var secondtwochar=integerPart.substr(3,1);
        console.log("firstchat"+secondtwochar);
      
        finalResult=firstthreechar+" "+secondtwochar
return finalResult.trim();
      }

      else if (dividend == 5) {
     
        //   if (firstSlice && remainder > 0) {
        //     // Manage numbers with remainders
        //     firstSlice = false;
        //     arrayResults.push(integerPart.slice(0, remainder));
        //   } else {
        //     // Slice each part of the number to an array
        //     firstSlice = false;
        //     arrayResults.push(integerPart.slice(remainder, remainder + divisor));
        //     remainder = remainder + divisor;
        //     quotient--;
        //   }
        //   // Continue dividing the number while there are values
        // } while (quotient >= 1);

        // // Concats the sliced parts to build the final number
        // arrayResults.forEach(part => {
        //   finalResult += `${part} `;
        // });
        // // Delete any trailing whitespace
        // finalResult = finalResult.trim();
        // return finalResult;

        var firstthreechar=integerPart.substr(0,3);
        console.log("firstchat"+firstthreechar);
        var secondtwochar=integerPart.substr(3,2);
        console.log("firstchat"+secondtwochar);
      
        finalResult=firstthreechar+" "+secondtwochar
return finalResult.trim();
      }

      else if (dividend == 6) {
     
        //   if (firstSlice && remainder > 0) {
        //     // Manage numbers with remainders
        //     firstSlice = false;
        //     arrayResults.push(integerPart.slice(0, remainder));
        //   } else {
        //     // Slice each part of the number to an array
        //     firstSlice = false;
        //     arrayResults.push(integerPart.slice(remainder, remainder + divisor));
        //     remainder = remainder + divisor;
        //     quotient--;
        //   }
        //   // Continue dividing the number while there are values
        // } while (quotient >= 1);

        // // Concats the sliced parts to build the final number
        // arrayResults.forEach(part => {
        //   finalResult += `${part} `;
        // });
        // // Delete any trailing whitespace
        // finalResult = finalResult.trim();
        // return finalResult;

        var firstthreechar=integerPart.substr(0,3);
        console.log("firstchat"+firstthreechar);
        var secondtwochar=integerPart.substr(3,2);
        console.log("firstchat"+secondtwochar);
        var lastthreechar=integerPart.substr(5,1);
        console.log("lastthreechar"+lastthreechar);
        finalResult=firstthreechar+" "+secondtwochar+" "+lastthreechar;
return finalResult.trim();
      }

      else if (dividend == 7) {
     
        //   if (firstSlice && remainder > 0) {
        //     // Manage numbers with remainders
        //     firstSlice = false;
        //     arrayResults.push(integerPart.slice(0, remainder));
        //   } else {
        //     // Slice each part of the number to an array
        //     firstSlice = false;
        //     arrayResults.push(integerPart.slice(remainder, remainder + divisor));
        //     remainder = remainder + divisor;
        //     quotient--;
        //   }
        //   // Continue dividing the number while there are values
        // } while (quotient >= 1);

        // // Concats the sliced parts to build the final number
        // arrayResults.forEach(part => {
        //   finalResult += `${part} `;
        // });
        // // Delete any trailing whitespace
        // finalResult = finalResult.trim();
        // return finalResult;

        var firstthreechar=integerPart.substr(0,3);
        console.log("firstchat"+firstthreechar);
        var secondtwochar=integerPart.substr(3,2);
        console.log("firstchat"+secondtwochar);
        var lastthreechar=integerPart.substr(5,2);
        console.log("lastthreechar"+lastthreechar);
        finalResult=firstthreechar+" "+secondtwochar+" "+lastthreechar;
return finalResult.trim();
      }

      else if(dividend == 9) {
     
        //   if (firstSlice && remainder > 0) {
        //     // Manage numbers with remainders
        //     firstSlice = false;
        //     arrayResults.push(integerPart.slice(0, remainder));
        //   } else {
        //     // Slice each part of the number to an array
        //     firstSlice = false;
        //     arrayResults.push(integerPart.slice(remainder, remainder + divisor));
        //     remainder = remainder + divisor;
        //     quotient--;
        //   }
        //   // Continue dividing the number while there are values
        // } while (quotient >= 1);

        // // Concats the sliced parts to build the final number
        // arrayResults.forEach(part => {
        //   finalResult += `${part} `;
        // });
        // // Delete any trailing whitespace
        // finalResult = finalResult.trim();
        // return finalResult;

        var firstthreechar=integerPart.substr(0,3);
        console.log("firstchat"+firstthreechar);
        var secondtwochar=integerPart.substr(3,2);
        console.log("firstchat"+secondtwochar);
        var lastthreechar=integerPart.substr(5,3);
        console.log("lastthreechar"+lastthreechar);
        var lastone=integerPart.substr(8,1);
        finalResult=firstthreechar+" "+secondtwochar+" "+lastthreechar+" "+lastone;
        
return finalResult.trim();
      }
      else if(dividend == 10) {
     
        //   if (firstSlice && remainder > 0) {
        //     // Manage numbers with remainders
        //     firstSlice = false;
        //     arrayResults.push(integerPart.slice(0, remainder));
        //   } else {
        //     // Slice each part of the number to an array
        //     firstSlice = false;
        //     arrayResults.push(integerPart.slice(remainder, remainder + divisor));
        //     remainder = remainder + divisor;
        //     quotient--;
        //   }
        //   // Continue dividing the number while there are values
        // } while (quotient >= 1);

        // // Concats the sliced parts to build the final number
        // arrayResults.forEach(part => {
        //   finalResult += `${part} `;
        // });
        // // Delete any trailing whitespace
        // finalResult = finalResult.trim();
        // return finalResult;

        var firstthreechar=integerPart.substr(0,3);
        console.log("firstchat"+firstthreechar);
        var secondtwochar=integerPart.substr(3,2);
        console.log("firstchat"+secondtwochar);
        var lastthreechar=integerPart.substr(5,3);
        console.log("lastthreechar"+lastthreechar);
        var lastone=integerPart.substr(8,2);
        finalResult=firstthreechar+" "+secondtwochar+" "+lastthreechar+" "+lastone;
        
return finalResult.trim();
      }
      
      else {
        return value;
      }
    }
    return value;
  }

}
