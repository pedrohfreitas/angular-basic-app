import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'innerHTML' })
export class InnerHTML implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(html) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
