import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  TemplateRef,
} from '@angular/core';

import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Msg } from '../msg';
import { Pokemon } from '../interfaces/pokemon';
import { TypePokemonDetails } from '../interfaces/type_pokemon_details';
import { Damage } from '../interfaces/damage';
import { ObjectWin } from '../interfaces/objectWin';
import { PokemonService } from '../services/pokemon.service';
import { AlertService } from '../../shared/services/alert.service';
import { DamageObject } from '../interfaces/damageObject';
import { MatCommonModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PokeCardComponent } from '../poke-card/poke-card.component';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { formatObjectDamagerelation, loadDamageRelationPokemon } from '../factory/transversalFunctions';
@Component({
  selector: 'app-mapa-pokemon',
  templateUrl: './battle-pokemon.component.html',
  styleUrls: ['./battle-pokemon.component.css'],
  imports: [

    CommonModule,
    PokeCardComponent,
    FormsModule,
    MatDialogModule,
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
    MatPaginatorModule,
    RouterModule,
    TranslatePipe
  ],
})
export class BattlePokemonComponent implements OnInit {

  
  length = 1000;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [50,100, 200, 1000];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;

  handlePageEvent(e: PageEvent) {

    this.pageEvent = e;

    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getPokemons( e.pageSize,e.pageSize*this.pageIndex)
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }

  private maxPokemon: number = this.pageEvent?.pageSize || 50 ;
  public msgOnView: any = Msg;
  public lstPokemones!: Pokemon[] | null;
  public lstPokemones2!: Pokemon[] | null;
  public lstPokemonesFilter: Pokemon[] | null | undefined;
  public lstPokemonesFilter2: Pokemon[] | null | undefined;
  public pokemonsTypes!: TypePokemonDetails[];
  public selectFirstPokemon: Pokemon | any;
  public selectSecondPokemon: Pokemon | any;
  public pokemonMouseOver: Pokemon | any;
  public pokemonInfo: Pokemon | any;
  public searchTerm!: string;
  private infoPokemonRef!: MatDialogRef<any, any>;
  public imageShow!: string;
  public figth: boolean = false;
  public resultFigth: boolean = false;
  public resultsViewInformation: boolean = false;
  public dataSourcePokemon = new MatTableDataSource<any>([]);
  public displayedColumns: string[] = ['information', 'description'];
  public displayedResults: string[] = ['name', 'type', 'puntuation'];
  public audioInterval: any;
  public objectDamage!: Damage[] | null;
  public objectResultFigth!: ObjectWin | null;
  public audio = new Audio();
  @ViewChild('progressBar', { static: true }) progressBar!: ElementRef;
  @ViewChild('infoPokemon', { static: true }) infoPokemon!: TemplateRef<any>;

  constructor(
    private pokemonCrud: PokemonService,
    private alertService: AlertService,
    private nodeDialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.loadInitData();
  }
  public loadInitData() {
    this.getPokemons(this.maxPokemon,this.maxPokemon);

    this.pokemonCrud.getPokemonsType().subscribe((resp) => {
      this.pokemonsTypes = resp;
    });
  }
  getPokemons(length: number , offeset:number) {
    this.pokemonCrud.getPokemonList(length,offeset).subscribe((resp) => {
      this.lstPokemones = resp;
      this.lstPokemonesFilter = this.lstPokemones;
    });
  }

 

  public getDescriptionDamage(description: string): string {
    return this.msgOnView.INFORMATIO_POKEMON[description];
  }

  public arrayPuntuation(arrayFirst: any, arraySecond: any) {
    var damage_relationObjectFirst = arrayFirst.damage_relationObject;
    var damage_relationObjectSecond = arraySecond.damage_relationObject;
    var arrayCointain: any = [];
    var giveDamage = true;
    var reciveDamage = false;
    var pokemonTypesFirstArray = arrayFirst.types.map((obj: any) => {
      delete obj.slot;
      return obj.type;
    });

    var pokemonTypesSecondArray = arraySecond.types.map((obj: any) => {
      delete obj.slot;
      return obj.type;
    });

    if (
      damage_relationObjectFirst.no_damage_to &&
      damage_relationObjectFirst.no_damage_to.array.length > 0
    ) {
      damage_relationObjectFirst.no_damage_to.array.forEach((element: any) => {
        var found = pokemonTypesSecondArray.includes((p: any) => p == element);
        if (!found) {
          giveDamage = false;
        }
      });
    }

    if (
      giveDamage &&
      damage_relationObjectFirst.no_damage_to.array.length > 0
    ) {
      if (
        damage_relationObjectFirst.no_damage_to &&
        damage_relationObjectFirst.no_damage_to.array.length > 0
      ) {
        arrayCointain.push(damage_relationObjectFirst.no_damage_to);
      }
    } else {
      if (
        damage_relationObjectFirst.double_damage_to &&
        damage_relationObjectFirst.double_damage_to.array.length > 0
      ) {
        const halfDamageTo =
          damage_relationObjectFirst.double_damage_to.array.find((elem: any) =>
            pokemonTypesSecondArray.some((type: any) => type.name == elem.name)
          );
        if (halfDamageTo) {
          arrayCointain.push(damage_relationObjectFirst.double_damage_to);
        }
      }
      if (
        damage_relationObjectFirst.half_damage_to &&
        damage_relationObjectFirst.half_damage_to.array.length > 0
      ) {
        const halfDamageTo =
          damage_relationObjectFirst.half_damage_to.array.find((elem: any) =>
            pokemonTypesSecondArray.some((type: any) => type.name == elem.name)
          );
        if (halfDamageTo) {
          arrayCointain.push(damage_relationObjectFirst.half_damage_to);
        }
      }
    }

    ///Recibir daño
    if (
      pokemonTypesFirstArray.no_damage_from &&
      pokemonTypesFirstArray.no_damage_from.array.length > 0
    ) {
      pokemonTypesSecondArray.forEach((type: any) => {
        damage_relationObjectSecond.no_damage_from.array.forEach(
          (typeFirst: any) => {
            if (typeFirst.name !== type.name) {
              reciveDamage = true;
              return;
            }
          }
        );
      });
    }

    if (
      reciveDamage &&
      pokemonTypesFirstArray.no_damage_from.array.length > 0
    ) {
      if (damage_relationObjectSecond.half_damage_from.length > 0) {
        arrayCointain.push(damage_relationObjectSecond.half_damage_from);
      }
    } else {
      if (damage_relationObjectFirst.double_damage_from.array.length > 0) {
        const halfDamageTo =
          damage_relationObjectFirst.double_damage_from.array.find(
            (elem: any) =>
              pokemonTypesSecondArray.some(
                (type: any) => type.name == elem.name
              )
          );
        if (halfDamageTo) {
          arrayCointain.push(damage_relationObjectFirst.double_damage_from);
        }
      }
      if (damage_relationObjectFirst.half_damage_from.array.length > 0) {
        const halfDamageTo =
          damage_relationObjectFirst.half_damage_from.array.find((elem: any) =>
            pokemonTypesSecondArray.some((type: any) => type.name == elem.name)
          );
        if (halfDamageTo) {
          arrayCointain.push(damage_relationObjectFirst.half_damage_from);
        }
      }
    }

    return arrayCointain;
  }

  public getObjectWinnerPokemon(arrayDamageFirst: any, arrayDamageSecond: any) {
    var accumulate: ObjectWin = {
      accumulateFirstPokemon: 0,
      accumulateSecond: 0,
      ganador: -1,
    };
    if (arrayDamageFirst.length > 0) {
      arrayDamageFirst.forEach((element: any) => {
        accumulate.accumulateFirstPokemon += element.value;
      });
    }
    if (arrayDamageSecond.length > 0) {
      arrayDamageSecond.forEach((element: any) => {
        accumulate.accumulateSecond += element.value;
      });
    }
    if (accumulate.accumulateFirstPokemon > accumulate.accumulateSecond) {
      accumulate.ganador = 0;
    } else if (
      accumulate.accumulateSecond > accumulate.accumulateFirstPokemon
    ) {
      accumulate.ganador = 1;
    } else {
      accumulate.ganador = 2;
    }

    return accumulate;
  }
  public cleanGame() {
    this.selectFirstPokemon = null;
    this.selectSecondPokemon = null;
    this.objectResultFigth = null;
    this.objectDamage = null;
    this.figth = false;
    this.resultFigth = false;
    this.pokemonMouseOver = null;
    this.pokemonInfo = null;
    this.resultsViewInformation = false;
    this.audioInterval = null;
  }
  public figthValidation() {
    this.selectFirstPokemon.damage_relationObject = this.formatTypeArrayDamage(
      this.selectFirstPokemon.damage_relation
    );
    this.selectSecondPokemon.damage_relationObject = this.formatTypeArrayDamage(
      this.selectSecondPokemon.damage_relation
    );
    this.selectFirstPokemon.damage_relationOverPokemonEnemy =
      this.arrayPuntuation(this.selectFirstPokemon, this.selectSecondPokemon);
    this.selectSecondPokemon.damage_relationOverPokemonEnemy =
      this.arrayPuntuation(this.selectSecondPokemon, this.selectFirstPokemon);

    this.objectResultFigth = this.getObjectWinnerPokemon(
      this.selectFirstPokemon.damage_relationOverPokemonEnemy,
      this.selectSecondPokemon.damage_relationOverPokemonEnemy
    );
    this.figth = false;
    this.resultFigth = true;
    this.playAudio();
    this.playAudio(this.msgOnView.SONG.endFigth);
  }

  public selectPokemon(pokemon: any) {
    var okSounds = this.validationOverSounds(pokemon);
    if (okSounds) {
      this.playAudio(this.msgOnView.SONG.select);
    }
    if (!this.selectFirstPokemon) {
      this.selectFirstPokemon = loadDamageRelationPokemon(pokemon,this.pokemonsTypes);
    }
    if (
      !this.selectSecondPokemon &&
      this.selectFirstPokemon &&
      this.selectFirstPokemon.id !== pokemon.id
    ) {
      this.selectSecondPokemon = loadDamageRelationPokemon(pokemon,this.pokemonsTypes);
      this.playAudio(this.msgOnView.SONG.figth);
      this.figth = true;
    }
  }

  public onSelectPokemon(event: any) {
    this.pokemonCrud
      .getFirstPokemonsByType(this.maxPokemon, event.value)
      .subscribe((resp) => {
        if (resp && resp.length > 0) {
          this.cleanPokemons();
        } else {
          this.alertService.alert(
            'WARNING',
            `No existen pokemones de tipo ${event.value}`,
            'warning'
          );
        }
      });
  }

  public cleanPokemons() {
    this.lstPokemones = null; // Primera mitad

    this.selectFirstPokemon = null;
    this.selectSecondPokemon = null;
  }

  public validationOverSounds(pokemon: any) {
    return (this.selectFirstPokemon &&
      this.selectFirstPokemon.id == pokemon.id) ||
      (this.selectSecondPokemon && this.selectSecondPokemon.id == pokemon.id) ||
      (this.selectSecondPokemon && this.selectSecondPokemon)
      ? false
      : true;
  }
  public validateMouseenter(pokemon: any) {
    this.pokemonMouseOver = pokemon;
    var okSounds = this.validationOverSounds(pokemon);
    if (okSounds) {
      this.playAudio(this.msgOnView.SONG.moveSelect);
    }
  }

  public playAudio(nombreArchivo?: string) {
    if (nombreArchivo) {
      this.audio.volume = 1;
      if (nombreArchivo == this.msgOnView.SONG.select) {
        this.audio.volume = 0.2;
      }

      this.audio.src = `assets/audios/${nombreArchivo}`;
      this.audio.load();
      this.audio.play().catch((error) => {
        console.error('No se pudo reproducir el audio:', error);
      });
    } else {
      this.audio.pause();
    }
  }
  public getStyle(pokemon: any) {
    if (this.selectFirstPokemon && this.selectFirstPokemon.id == pokemon.id) {
      return ['style-select-first-pokemon', 'image-border'];
    } else if (
      this.selectSecondPokemon &&
      this.selectSecondPokemon.id == pokemon.id
    ) {
      return ['style-select-seconds-pokemon', 'image-border'];
    } else if (
      this.selectFirstPokemon &&
      this.selectSecondPokemon &&
      this.selectFirstPokemon.id !== pokemon.id &&
      this.selectSecondPokemon.id !== pokemon.id
    ) {
      return ['image-both-pokemons-select'];
    } else if (
      this.pokemonMouseOver &&
      this.pokemonMouseOver.id == pokemon.id
    ) {
      return ['effect-without-select', 'image-border'];
    } else {
      return ['image-border'];
    }
  }


  public pokemonSound(pokemon: any){
    if (pokemon.sound) {
      var audio = new Audio(`${pokemon.sound}`);
      audio.load();
      audio.play();
    }
  }
  public openDialogPokemon(pokemon?: any, view?: number) {
    this.resultsViewInformation = true;
    this.objectDamage = formatObjectDamagerelation();

    this.infoPokemonRef = this.nodeDialog.open(this.infoPokemon, {
      disableClose: true,
      maxWidth:'100%',
      maxHeight:'100%',

      panelClass: 'col-12',
    });
    
    this.infoPokemonRef.addPanelClass(['col-sm-12', 'col-md-8']);
  }
  public cerrarInfoPokemon() {
    this.infoPokemonRef.close();
  }
  public onSearch(searchTerm: any) {
    const regex = /[^a-zA-Z]+/g; // solo permite letras del alfabeto
    this.searchTerm = searchTerm.replace(regex, '');
    this.lstPokemonesFilter = this.lstPokemones?.filter((pokemon) =>
      pokemon.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    this.lstPokemonesFilter2 = this.lstPokemones2?.filter((pokemon) =>
      pokemon.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
  }
  public formatTypeArrayDamage(array: any) {
    var objectDamage: DamageObject = {
      double_damage_from: array[0],
      double_damage_to: array[1],
      half_damage_from: array[2],
      half_damage_to: array[3],
      no_damage_from: array[4],
      no_damage_to: array[5],
    };
    return objectDamage;
  }

}
