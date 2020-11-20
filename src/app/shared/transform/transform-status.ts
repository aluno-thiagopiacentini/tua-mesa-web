import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'transformStatusFila'})
export class TransformStatusFila implements PipeTransform {
  transform(value: number): string {
    let result = '';
    switch (value) {
      case 0:
        result = 'Na fila';
        break;
      case 1:
        result = 'Primeira Chamada';
        break;
      case 2:
        result = 'Segunda Chamada';
        break;
      case 3:
        result = 'Concluído';
        break;
      case 4:
        result = 'Cancelado';
        break;
      default:
        result = value.toString();
        break;
    }

    return result;
  }
}