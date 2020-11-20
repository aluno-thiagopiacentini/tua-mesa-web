import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'transformBoolean'})
export class TransformBoolean implements PipeTransform {
  transform(value: string): string {
    return value ? 'Sim' : 'Não';
  }
}