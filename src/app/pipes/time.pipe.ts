import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'racetime'
})
export class TimePipe implements PipeTransform {

  transform(value: number): string {
    const h = Math.floor(value / (60 * 60 * 1000)) % 24;
    const hh = h < 10 ? '0' + h : h;
    const m = Math.floor(value / (60 * 1000)) % 60;
    const mm = m < 10 ? '0' + m : m;
    const s = Math.floor(value / 1000) % 60;
    const ss = s < 10 ? '0' + s : s;
    return `${hh}:${mm}:${ss}`;
  }

}
