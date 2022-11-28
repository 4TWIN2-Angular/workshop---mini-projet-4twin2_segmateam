import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DateFormatter {
  static DateFromObject(year: any, month: any, day: any) {
    var datefinal = year + "-" + month + "-" + day;
    console.log(datefinal);
    return datefinal;
  }
}
