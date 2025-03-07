import { Component, Input, input } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon';
import { Msg } from '../msg';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-poke-card',
  imports: [
        MatCardModule,
            MatChipsModule,
                CommonModule
  ],
  templateUrl: './poke-card.component.html',
  styleUrl: '../battle/battle-pokemon.component.css'
})
export class PokeCardComponent {

  @Input() pokemon!: Pokemon | any;
  @Input() first!: boolean;

    public msgOnView: any = Msg;
}
