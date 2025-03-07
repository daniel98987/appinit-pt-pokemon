// booking/flight-booking.routes.ts

import { Routes } from "@angular/router";
import { BattlePokemonComponent } from "./battle/battle-pokemon.component";
import { PokeInfoComponent } from "./poke-info/poke-info.component";

export const POKEMON_ROUTES: Routes = [{
    path: '',
    children: [
        { path: 'battle', component: BattlePokemonComponent }, // Lista de Pokémon
        { path: '', component: PokeInfoComponent }, // Detalles de un Pokémon
      
      ]
  

}

];