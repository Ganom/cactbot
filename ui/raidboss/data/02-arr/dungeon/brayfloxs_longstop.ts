import NetRegexes from '../../../../../resources/netregexes';
import { Responses } from '../../../../../resources/responses';
import ZoneId from '../../../../../resources/zone_id';
import { RaidbossData } from '../../../../../types/data';
import { TriggerSet } from '../../../../../types/trigger';

export interface Data extends RaidbossData {
  pelicanPoisons: string[];
}

const triggerSet: TriggerSet<Data> = {
  zoneId: ZoneId.BrayfloxsLongstop,
  initData: () => {
    return {
      pelicanPoisons: [],
    };
  },
  triggers: [
    {
      id: 'Brayflox Normal Numbing Breath',
      type: 'StartsUsing',
      netRegex: NetRegexes.startsUsing({ id: '1FA', source: 'Great Yellow Pelican' }),
      netRegexDe: NetRegexes.startsUsing({ id: '1FA', source: 'Groß(?:e|er|es|en) Gelbpelikan' }),
      netRegexFr: NetRegexes.startsUsing({ id: '1FA', source: 'Grand Pélican Jaune' }),
      netRegexJa: NetRegexes.startsUsing({ id: '1FA', source: 'グレート・イエローペリカン' }),
      netRegexCn: NetRegexes.startsUsing({ id: '1FA', source: '大黄鹈鹕' }),
      netRegexKo: NetRegexes.startsUsing({ id: '1FA', source: '노란 왕사다새' }),
      condition: (data) => data.CanStun(),
      response: Responses.stun('info'),
    },
    {
      id: 'Brayflox Normal Pelican Poison Collect',
      type: 'GainsEffect',
      netRegex: NetRegexes.gainsEffect({ effectId: '12' }),
      condition: (data) => data.CanCleanse(),
      run: (data, matches) => data.pelicanPoisons.push(matches.target),
    },
    {
      id: 'Brayflox Normal Pelican Poison Healer',
      type: 'GainsEffect',
      netRegex: NetRegexes.gainsEffect({ effectId: '12', capture: false }),
      condition: (data) => data.CanCleanse(),
      delaySeconds: 1,
      suppressSeconds: 2,
      alertText: (data, _matches, output) => {
        if (!data.pelicanPoisons)
          return;

        const names = data.pelicanPoisons.sort();
        if (names.length === 1 && names[0] === data.me)
          return output.esunaYourPoison!();

        return output.esunaPoisonOn!({ players: names.map((x) => data.ShortName(x)).join(', ') });
      },
      run: (data) => data.pelicanPoisons = [],
      outputStrings: {
        esunaYourPoison: {
          en: 'Esuna Your Poison',
          de: 'Entferne dein Gift',
          fr: 'Purifiez-vous du poison',
          ja: '自分の毒をエスナ',
          cn: '康复自己的毒',
          ko: '독 에스나 하기',
        },
        esunaPoisonOn: {
          en: 'Esuna Poison on ${players}',
          de: 'Entferne Gift von ${players}',
          fr: 'Purifiez le poison sur ${players}',
          ja: '${players}の毒をエスナ',
          cn: '康复${players}',
          ko: '"${players}" 독 에스나',
        },
      },
    },
    {
      // Pelican Adds
      // Only parsing for Sable Back since there is at least 1 Sable Back in each spawn pack.
      // The pack with the boss is 3 Violet Backs, not parsing for them prevents the trigger
      // from activating early when you pick up the Headgate Key and the boss and adds spawn.
      id: 'Brayflox Normal Pelican Adds',
      type: 'AddedCombatant',
      netRegex: NetRegexes.addedCombatantFull({ npcNameId: '1283', capture: false }),
      suppressSeconds: 2,
      response: Responses.killAdds(),
    },
    {
      id: 'Brayflox Normal Ashdrake Burning Cyclone',
      type: 'StartsUsing',
      netRegex: NetRegexes.startsUsing({ id: '205', source: 'Ashdrake' }),
      netRegexDe: NetRegexes.startsUsing({ id: '205', source: 'Asch-Drakon' }),
      netRegexFr: NetRegexes.startsUsing({ id: '205', source: 'Draconide Des Cendres' }),
      netRegexJa: NetRegexes.startsUsing({ id: '205', source: 'アッシュドレイク' }),
      netRegexCn: NetRegexes.startsUsing({ id: '205', source: '白烬火蛟' }),
      netRegexKo: NetRegexes.startsUsing({ id: '205', source: '잿빛도마뱀' }),
      condition: (data) => data.CanStun(),
      response: Responses.stun('info'),
    },
    {
      // Tempest Biast Spawn
      id: 'Brayflox Normal Tempest Biast',
      type: 'AddedCombatant',
      netRegex: NetRegexes.addedCombatantFull({ npcNameId: '1285', capture: false }),
      response: Responses.killAdds(),
    },
    {
      id: 'Brayflox Normal Inferno Drake Burning Cyclone',
      type: 'StartsUsing',
      netRegex: NetRegexes.startsUsing({ id: '3D8', source: 'Inferno Drake' }),
      netRegexDe: NetRegexes.startsUsing({ id: '3D8', source: 'Sonnen-Drakon' }),
      netRegexFr: NetRegexes.startsUsing({ id: '3D8', source: 'Draconide Des Brasiers' }),
      netRegexJa: NetRegexes.startsUsing({ id: '3D8', source: 'インフェルノドレイク' }),
      netRegexCn: NetRegexes.startsUsing({ id: '3D8', source: '狱炎火蛟' }),
      netRegexKo: NetRegexes.startsUsing({ id: '3D8', source: '지옥불 도마뱀' }),
      condition: (data) => data.CanStun(),
      response: Responses.stun('info'),
    },
    {
      // Hellbender Bubble
      id: 'Brayflox Normal Hellbender Effluvium',
      type: 'Ability',
      netRegex: NetRegexes.ability({ id: '3D3', source: 'Hellbender' }),
      netRegexDe: NetRegexes.ability({ id: '3D3', source: 'Höllenkrümmer' }),
      netRegexFr: NetRegexes.ability({ id: '3D3', source: 'Ménopome' }),
      netRegexJa: NetRegexes.ability({ id: '3D3', source: 'ヘルベンダー' }),
      netRegexCn: NetRegexes.ability({ id: '3D3', source: '水栖蝾螈' }),
      netRegexKo: NetRegexes.ability({ id: '3D3', source: '장수도롱뇽' }),
      infoText: (data, matches, output) => {
        if (matches.target !== data.me)
          return output.breakBubbleOn!({ player: data.ShortName(matches.target) });

        if (matches.target === data.me)
          return output.breakYourBubble!();
      },
      outputStrings: {
        breakBubbleOn: {
          en: 'Break Bubble on ${player}',
          de: 'Besiege die Blase von ${player}',
          fr: 'Brisez la bulle de ${player}',
          ja: '${player}の泡を破れ',
          cn: '打${player}的泡泡',
          ko: '"${player}" 물구슬 깨기',
        },
        breakYourBubble: {
          en: 'Break Your Bubble',
          de: 'Besiege deine Blase',
          fr: 'Brisez votre bulle',
          ja: '自分の泡を破れ',
          cn: '打自己的泡泡',
          ko: '물구슬 깨기',
        },
      },
    },
    {
      // Stunnable Line Attack
      id: 'Brayflox Normal Aiatar Dragon Breath',
      type: 'StartsUsing',
      netRegex: NetRegexes.startsUsing({ id: '22F', source: 'Aiatar' }),
      netRegexDe: NetRegexes.startsUsing({ id: '22F', source: 'Aiatar' }),
      netRegexFr: NetRegexes.startsUsing({ id: '22F', source: 'Aiatar' }),
      netRegexJa: NetRegexes.startsUsing({ id: '22F', source: 'アイアタル' }),
      netRegexCn: NetRegexes.startsUsing({ id: '22F', source: '阿杰特' }),
      netRegexKo: NetRegexes.startsUsing({ id: '22F', source: '아이아타르' }),
      condition: (data) => data.CanStun(),
      response: Responses.stun('info'),
    },
    {
      // Move Aiatar out of Puddles
      id: 'Brayflox Normal Aiatar Toxic Vomit Tank',
      type: 'GainsEffect',
      netRegex: NetRegexes.gainsEffect({ effectId: '117', capture: false }),
      condition: (data) => data.role === 'tank',
      alertText: (_data, _matches, output) => output.text!(),
      outputStrings: {
        text: {
          en: 'Move Boss Out of Puddles',
          de: 'Bewege den Boss aus der Fläche',
          fr: 'Déplacez le boss hors des zones au sol',
          ja: 'ボスを円範囲の外に',
          cn: '把BOSS拉出圈圈',
          ko: '장판에 보스가 닿지 않게 하기',
        },
      },
    },
    {
      // Healer Esuna Poison.
      // This triggers on both Salivous Snap and Puddle Poison Application
      id: 'Brayflox Normal Aiatar Poison Healer',
      type: 'GainsEffect',
      netRegex: NetRegexes.gainsEffect({ effectId: '113' }),
      condition: (data) => data.CanCleanse(),
      alertText: (data, matches, output) => {
        if (matches.target !== data.me)
          return output.esunaPoisonOn!({ player: data.ShortName(matches.target) });

        return output.esunaYourPoison!();
      },
      outputStrings: {
        esunaPoisonOn: {
          en: 'Esuna Poison on ${player}',
          de: 'Entferne Gift von ${player}',
          fr: 'Purifiez le poison sur ${player}',
          ja: '${player}の毒をエスナ',
          cn: '康复${player}的毒',
          ko: '"${player}" 독 에스나',
        },
        esunaYourPoison: {
          en: 'Esuna Your Poison',
          de: 'Entferne dein Gift',
          fr: 'Purifiez-vous du poison',
          ja: '自分の毒をエスナ',
          cn: '康复自己的毒',
          ko: '독 에스나 하기',
        },
      },
    },
    {
      id: 'Brayflox Normal Aiatar Salivous Snap',
      type: 'StartsUsing',
      netRegex: NetRegexes.startsUsing({ id: '6FF3', source: 'Aiatar' }),
      netRegexDe: NetRegexes.startsUsing({ id: '6FF3', source: 'Aiatar' }),
      netRegexFr: NetRegexes.startsUsing({ id: '6FF3', source: 'Aiatar' }),
      netRegexJa: NetRegexes.startsUsing({ id: '6FF3', source: 'アイアタル' }),
      netRegexCn: NetRegexes.startsUsing({ id: '6FF3', source: '阿杰特' }),
      netRegexKo: NetRegexes.startsUsing({ id: '6FF3', source: '아이아타르' }),
      response: Responses.tankBuster(),
    },
  ],
  timelineReplace: [
    {
      'locale': 'de',
      'replaceSync': {
        'Aiatar': 'Aiatar',
        'Ashdrake': 'Asch-Drakon',
        'Great Yellow Pelican': 'groß(?:e|er|es|en) Gelbpelikan',
        'Hellbender': 'Höllenkrümmer',
        'Inferno Drake': 'Sonnen-Drakon',
      },
    },
    {
      'locale': 'fr',
      'replaceSync': {
        'Aiatar': 'Aiatar',
        'Ashdrake': 'draconide des cendres',
        'Great Yellow Pelican': 'grand pélican jaune',
        'Hellbender': 'ménopome',
        'Inferno Drake': 'draconide des brasiers',
      },
    },
    {
      'locale': 'ja',
      'replaceSync': {
        'Aiatar': 'アイアタル',
        'Ashdrake': 'アッシュドレイク',
        'Great Yellow Pelican': 'グレート・イエローペリカン',
        'Hellbender': 'ヘルベンダー',
        'Inferno Drake': 'インフェルノドレイク',
      },
    },
    {
      'locale': 'cn',
      'replaceSync': {
        'Aiatar': '阿杰特',
        'Ashdrake': '白烬火蛟',
        'Great Yellow Pelican': '大黄鹈鹕',
        'Hellbender': '水栖蝾螈',
        'Inferno Drake': '狱炎火蛟',
      },
    },
    {
      'locale': 'ko',
      'replaceSync': {
        'Aiatar': '아이아타르',
        'Ashdrake': '잿빛도마뱀',
        'Great Yellow Pelican': '노란 왕사다새',
        'Hellbender': '장수도롱뇽',
        'Inferno Drake': '지옥불 도마뱀',
      },
    },
  ],
};

export default triggerSet;
