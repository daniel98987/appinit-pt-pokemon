import { Damage } from "../interfaces/damage";
import { TypePokemonDetails } from "../interfaces/type_pokemon_details";

export function loadDamageRelationPokemon(pokemon: any,pokemonsTypes:TypePokemonDetails[]) {
    pokemon.damage_relation = formatObjectDamagerelation();
    for (let index = 0; index < pokemon.types.length; index++) {
      const element = pokemon.types[index];
      const searchTypePokemon = pokemonsTypes.find(
        (type: any) => element.type.name == type.name
      );

      if (searchTypePokemon) {
        pokemon.damage_relation[0].array = filterDamageUnique(
          pokemon.damage_relation[0].array,
          searchTypePokemon.damage_relations.double_damage_from
        );
        pokemon.damage_relation[1].array = filterDamageUnique(
          pokemon.damage_relation[1].array,
          searchTypePokemon.damage_relations.double_damage_to
        );
        pokemon.damage_relation[2].array = filterDamageUnique(
          pokemon.damage_relation[2].array,
          searchTypePokemon.damage_relations.half_damage_from
        );
        pokemon.damage_relation[3].array = filterDamageUnique(
          pokemon.damage_relation[3].array,
          searchTypePokemon.damage_relations.half_damage_to
        );
        pokemon.damage_relation[4].array = filterDamageUnique(
          pokemon.damage_relation[4].array,
          searchTypePokemon.damage_relations.no_damage_from
        );
        pokemon.damage_relation[5].array = filterDamageUnique(
          pokemon.damage_relation[5].array,
          searchTypePokemon.damage_relations.no_damage_to
        );
      }
    }
    return pokemon;
  }

  export function  formatObjectDamagerelation() {
      var objectDamage: Damage[] = [
        { name: 'double_damage_from', value: -70, array: [] },
        { name: 'double_damage_to', value: 70, array: [] },
        { name: 'half_damage_from', value: -30, array: [] },
        { name: 'half_damage_to', value: 30, array: [] },
        { name: 'no_damage_from', value: 0, array: [] },
        { name: 'no_damage_to', value: 0, array: [] },
      ];
      return objectDamage;
    }
    export  function filterDamageUnique(damage_relation: any[], damagaRelationOfType: any) {
        if (damage_relation.length == 0) {
          damage_relation = [];
          damage_relation = damagaRelationOfType;
        } else {
          for (let i = 0; i < damagaRelationOfType.length; i++) {
            const element = damagaRelationOfType[i];
            const existing = damage_relation.find(
              (d: any) => d.name === element.name
            );
            if (!existing) {
              damage_relation.push(element);
            }
          }
        }
        return damage_relation;
      }
    