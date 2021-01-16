const type = [
  { name: "normal" },
  { name: "fighting" },
  { name: "flying" },
  { name: "poison" },
  { name: "ground" },
  { name: "rock" },
  { name: "bug" },
  { name: "ghost" },
  { name: "steel" },
  { name: "fire" },
  { name: "water" },
  { name: "grass" },
  { name: "electric" },
  { name: "psychic" },
  { name: "ice" },
  { name: "dragon" },
  { name: "dark" },
  { name: "fairy" },
];

const sprite_url =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dex_id}.png";

const allPokes = [
  {
    dex_id: 1,
    name: "bulbasaur",
    type: [12, 4],
    description:
      "A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON.",
    height: 7,
    weight: 69,
    price: 96.66,
  },
  {
    dex_id: 4,
    name: "charmander",
    type: [10],
    description:
      "Obviously prefers hot places. When it rains, steam is said to spout from the tip of its tail.",
    height: 6,
    weight: 85,
    price: 27.93,
  },
  {
    dex_id: 7,
    name: "squirtle",
    type: [11],
    description:
      "Shoots water at prey while in the water. Withdraws into its shell when in danger.",
    height: 5,
    weight: 90,
    price: 48.43,
  },
  {
    dex_id: 10,
    name: "caterpie",
    type: [7],
    description:
      "It releases a stench from its red antenna to repel enemies. It grows by molting repeatedly.",
    height: 3,
    weight: 29,
    price: 23.83,
  },
  {
    dex_id: 13,
    name: "weedle",
    type: [7, 4],
    description:
      "Often found in forests, eating leaves. It has a sharp venomous stinger on its head.",
    height: 3,
    weight: 32,
    price: 53.92,
  },
  {
    dex_id: 16,
    name: "pidgey",
    type: [1, 3],
    description:
      "A common sight in forests and woods. It flaps its wings at ground level to kick up blinding sand.",
    height: 3,
    weight: 18,
    price: 12.82,
  },
  {
    dex_id: 19,
    name: "rattata",
    type: [1],
    description:
      "Bites anything when it attacks. Small and very quick, it is a common sight in many places.",
    height: 3,
    weight: 35,
    price: 42.11,
  },
  {
    dex_id: 21,
    name: "spearow",
    type: [1, 3],
    description:
      "Eats bugs in grassy areas. It has to flap its short wings at high speed to stay airborne.",
    height: 3,
    weight: 20,
    price: 51.18,
  },
  {
    dex_id: 23,
    name: "ekans",
    type: [4],
    description:
      "Moves silently and stealthily. Eats the eggs of birds, such as PIDGEY and SPEAROW, whole.",
    height: 20,
    weight: 69,
    price: 56.3,
  },
  {
    dex_id: 25,
    name: "pikachu",
    type: [13],
    description:
      "When several of these POKéMON gather, their electricity could build and cause lightning storms.",
    height: 4,
    weight: 60,
    price: 54.35,
  },
  {
    dex_id: 27,
    name: "sandshrew",
    type: [5],
    description:
      "Burrows deep underground in arid locations far from water. It only emerges to hunt for food.",
    height: 6,
    weight: 120,
    price: 62.42,
  },
  {
    dex_id: 29,
    name: "nidoran-f",
    type: [4],
    description:
      "Although small, its venomous barbs render this POKéMON dangerous. The female has smaller horns.",
    height: 4,
    weight: 70,
    price: 81.66,
  },
  {
    dex_id: 32,
    name: "nidoran-m",
    type: [4],
    description:
      "Stiffens its ears to sense danger. The larger its horns, the more powerful its secreted venom.",
    height: 5,
    weight: 90,
    price: 49.17,
  },
  {
    dex_id: 35,
    name: "clefairy",
    type: [18],
    description:
      "Its magical and cute appeal has many admirers. It is rare and found only in certain areas.",
    height: 6,
    weight: 75,
    price: 14.54,
  },
  {
    dex_id: 37,
    name: "vulpix",
    type: [10],
    description:
      "At the time of birth, it has just one tail. The tail splits from its tip as it grows older.",
    height: 6,
    weight: 99,
    price: 72.09,
  },
  {
    dex_id: 39,
    name: "jigglypuff",
    type: [1, 18],
    description:
      "When its huge eyes light up, it sings a mysteriously soothing melody that lulls its enemies to sleep.",
    height: 5,
    weight: 55,
    price: 16.29,
  },
  {
    dex_id: 41,
    name: "zubat",
    type: [4, 3],
    description:
      "Forms colonies in perpetually dark places. Uses ultrasonic waves to identify and approach targets.",
    height: 8,
    weight: 75,
    price: 47.06,
  },
  {
    dex_id: 43,
    name: "oddish",
    type: [12, 4],
    description:
      "During the day, it keeps its face buried in the ground. At night, it wanders around sowing its seeds.",
    height: 5,
    weight: 54,
    price: 85.9,
  },
  {
    dex_id: 46,
    name: "paras",
    type: [7, 12],
    description:
      "Burrows to suck tree roots. The mushrooms on its back grow by draw­ing nutrients from the bug host.",
    height: 3,
    weight: 54,
    price: 63.95,
  },
  {
    dex_id: 48,
    name: "venonat",
    type: [7, 4],
    description:
      "Lives in the shadows of tall trees where it eats insects. It is attracted by light at night.",
    height: 10,
    weight: 300,
    price: 41.97,
  },
  {
    dex_id: 50,
    name: "diglett",
    type: [5],
    description:
      "Lives about one yard underground where it feeds on plant roots. It sometimes appears above ground.",
    height: 2,
    weight: 8,
    price: 44.92,
  },
  {
    dex_id: 52,
    name: "meowth",
    type: [1],
    description:
      "Adores circular objects. Wanders the streets on a nightly basis to look for dropped loose change.",
    height: 4,
    weight: 42,
    price: 81.66,
  },
  {
    dex_id: 54,
    name: "psyduck",
    type: [11],
    description:
      "While lulling its enemies with its vacant look, this wily POKéMON will use psychokinetic powers.",
    height: 8,
    weight: 196,
    price: 54.72,
  },
  {
    dex_id: 56,
    name: "mankey",
    type: [2],
    description:
      "Extremely quick to anger. It could be docile one moment then thrashing away the next instant.",
    height: 5,
    weight: 280,
    price: 86.24,
  },
  {
    dex_id: 58,
    name: "growlithe",
    type: [10],
    description:
      "Very protective of its territory. It will bark and bite to repel intruders from its space.",
    height: 7,
    weight: 190,
    price: 91.39,
  },
  {
    dex_id: 60,
    name: "poliwag",
    type: [11],
    description:
      "Its newly grown legs prevent it from running. It appears to prefer swimming than trying to stand.",
    height: 6,
    weight: 124,
    price: 48.02,
  },
  {
    dex_id: 63,
    name: "abra",
    type: [14],
    description:
      "Using its ability to read minds, it will identify impending danger and TELEPORT to safety.",
    height: 9,
    weight: 195,
    price: 97.37,
  },
  {
    dex_id: 66,
    name: "machop",
    type: [2],
    description:
      "Loves to build its muscles. It trains in all styles of martial arts to become even stronger.",
    height: 8,
    weight: 195,
    price: 40.25,
  },
  {
    dex_id: 69,
    name: "bellsprout",
    type: [12, 4],
    description:
      "Even though its body is extremely skinny, it is blindingly fast when catching its prey.",
    height: 7,
    weight: 40,
    price: 86.6,
  },
  {
    dex_id: 72,
    name: "tentacool",
    type: [11, 4],
    description:
      "Drifts in shallow seas. Anglers who hook them by accident are often punished by its stinging acid.",
    height: 9,
    weight: 455,
    price: 72.53,
  },
  {
    dex_id: 74,
    name: "geodude",
    type: [6, 5],
    description:
      "Found in fields and mountains. Mistaking them for boulders, people often step or trip on them.",
    height: 4,
    weight: 200,
    price: 43.7,
  },
  {
    dex_id: 77,
    name: "ponyta",
    type: [10],
    description:
      "Its hooves are 10 times harder than diamonds. It can trample anything completely flat in little time.",
    height: 10,
    weight: 300,
    price: 65.35,
  },
  {
    dex_id: 79,
    name: "slowpoke",
    type: [11, 14],
    description:
      "Incredibly slow and dopey. It takes 5 seconds for it to feel pain when under attack.",
    height: 12,
    weight: 360,
    price: 93.78,
  },
  {
    dex_id: 81,
    name: "magnemite",
    type: [13, 9],
    description:
      "Uses anti-gravity to stay suspended. Appears without warning and uses THUNDER WAVE and similar moves.",
    height: 3,
    weight: 60,
    price: 13.96,
  },
  {
    dex_id: 83,
    name: "farfetchd",
    type: [1, 3],
    description:
      "The sprig of green onions it holds is its weapon. It is used much like a metal sword.",
    height: 8,
    weight: 150,
    price: 95.7,
  },
  {
    dex_id: 84,
    name: "doduo",
    type: [1, 3],
    description:
      "A bird that makes up for its poor flying with its fast foot speed. Leaves giant footprints.",
    height: 14,
    weight: 392,
    price: 40.25,
  },
  {
    dex_id: 86,
    name: "seel",
    type: [11],
    description:
      "The protruding horn on its head is very hard. It is used for bashing through thick ice.",
    height: 11,
    weight: 900,
    price: 86.6,
  },
  {
    dex_id: 88,
    name: "grimer",
    type: [4],
    description:
      "Appears in filthy areas. Thrives by sucking up polluted sludge that is pumped out of factories.",
    height: 9,
    weight: 300,
    price: 53.76,
  },
  {
    dex_id: 90,
    name: "shellder",
    type: [11],
    description:
      "Its hard shell repels any kind of attack. It is vulnerable only when its shell is open.",
    height: 3,
    weight: 40,
    price: 13.96,
  },
  {
    dex_id: 92,
    name: "ghastly",
    type: [8, 4],
    description:
      "Almost invisible, this gaseous POKéMON cloaks the target and puts it to sleep without notice.",
    height: 13,
    weight: 1,
    price: 20.79,
  },
  {
    dex_id: 96,
    name: "drowzee",
    type: [14],
    description:
      "Puts enemies to sleep then eats their dreams. Occasionally gets sick from eating bad dreams.",
    height: 10,
    weight: 324,
    price: 83.53,
  },
  {
    dex_id: 98,
    name: "krabby",
    type: [11],
    description:
      "Its pincers are not only powerful weapons, they are used for balance when walking sideways.",
    height: 4,
    weight: 65,
    price: 12.71,
  },
  {
    dex_id: 100,
    name: "voltorb",
    type: [13],
    description:
      "Usually found in power plants. Easily mistaken for a POKé BALL, they have zapped many people.",
    height: 5,
    weight: 104,
    price: 32.38,
  },
  {
    dex_id: 102,
    name: "exeggcute",
    type: [12, 14],
    description:
      "Often mistaken for eggs. When disturbed, they quickly gather and attack in swarms.",
    height: 4,
    weight: 25,
    price: 21.82,
  },
  {
    dex_id: 104,
    name: "cubone",
    type: [5],
    description:
      "Because it never removes its skull helmet, no one has ever seen this POKéMON's real face.",
    height: 4,
    weight: 65,
    price: 98.85,
  },
  {
    dex_id: 109,
    name: "koffing",
    type: [4],
    description:
      "Because it stores several kinds of toxic gases in its body, it is prone to exploding without warning.",
    height: 6,
    weight: 10,
    price: 48.6,
  },
  {
    dex_id: 111,
    name: "rhyhorn",
    type: [5, 6],
    description:
      "Its massive bones are 1000 times harder than human bones. It can easily knock a trailer flying.",
    height: 10,
    weight: 1150,
    price: 44.22,
  },
  {
    dex_id: 114,
    name: "tangela",
    type: [12],
    description:
      "The whole body is swathed with wide vines that are similar to sea­weed. Its vines shake as it walks.",
    height: 10,
    weight: 350,
    price: 23.87,
  },
  {
    dex_id: 116,
    name: "horsea",
    type: [11],
    description:
      "Known to shoot down flying bugs with precision blasts of ink from the surface of the water.",
    height: 4,
    weight: 80,
    price: 42.88,
  },
  {
    dex_id: 118,
    name: "goldeen",
    type: [11],
    description:
      "Its tail fin billows like an elegant ballroom dress, giving it the nickname of the Water Queen.",
    height: 6,
    weight: 150,
    price: 7.02,
  },
  {
    dex_id: 129,
    name: "magikarp",
    type: [11],
    description:
      "In the distant past, it was somewhat stronger than the horribly weak descendants that exist today.",
    height: 9,
    weight: 100,
    price: 0.99,
  },
  {
    dex_id: 133,
    name: "eevee",
    type: [1],
    description:
      "Its genetic code is irregular. It may mutate if it is exposed to radiation from element STONEs.",
    height: 3,
    weight: 65,
    price: 99.99,
  },
];

module.exports = { type, allPokes };
