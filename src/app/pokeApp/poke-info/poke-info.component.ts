import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../interfaces/pokemon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { Msg } from '../msg';
import { CommonModule } from '@angular/common';
import { PokeCardComponent } from '../poke-card/poke-card.component';
import { loadDamageRelationPokemon } from '../factory/transversalFunctions';
import { TypePokemonDetails } from '../interfaces/type_pokemon_details';
@Component({
  selector: 'app-poke-info',
  imports: [ MatDialogModule,
      MatTableModule,
      MatCardModule,
      MatButtonModule,
      MatCommonModule,
      MatInputModule,
      MatChipsModule,
      MatIconModule,
      MatSortModule,
      MatDividerModule,
      MatListModule,
          CommonModule,
      MatPaginatorModule,PokeCardComponent],
  templateUrl: './poke-info.component.html',
  styleUrl: '../battle/battle-pokemon.component.css'
})
export class PokeInfoComponent {

  public displayedColumns: string[] = ['information', 'description'];
  public displayedResults: string[] = ['name', 'type', 'puntuation'];
    public pokemonsTypes!: TypePokemonDetails[];
  public pokemonInfo: Pokemon | any;
   public msgOnView: any = Msg;
  pokemon!: Pokemon;
  imageShow: any;
    public dataSourcePokemon = new MatTableDataSource<any>([]);
  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private pokemonCrud: PokemonService,
  ) {}

  public sortData(pokemon: any) {
    this.dataSourcePokemon.data = [];
    for (let index = 0; index < pokemon.stats.length; index++) {
      var element = pokemon.stats[index];
      element.color = this.getRandomColor();
      this.dataSourcePokemon.data.push(element);
    }
  }
    public getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  ngOnInit() {
    this.pokemonCrud.getPokemonsType().subscribe((resp) => {
      this.pokemonsTypes = resp;
      this.route.queryParams.subscribe((queryParams) => {
    
        if (queryParams['id']) {      
          this.pokemonService.getPokemonData(queryParams['id']).subscribe((resp) => {
            this.pokemon = resp;
            this.sortData(this.pokemon)
            this.pokemonInfo = loadDamageRelationPokemon(this.pokemon,this.pokemonsTypes);
            this.imageShow =
            this.pokemon.sprites && this.pokemon.sprites.front_default
              ? this.pokemon.sprites.front_default
              : this.msgOnView.URL_POKE_APP.nothing_pokemon;
          });
        }
      });
    });

  }
  
}
